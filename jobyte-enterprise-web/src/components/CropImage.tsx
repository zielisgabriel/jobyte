"use client";

import { useCallback, useState, useTransition } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { CheckIcon, Loader2Icon, RotateCcwIcon, XIcon, ZoomInIcon } from "lucide-react";

interface CropImageProps {
  image: string | null;
  onCancel: () => void;
  onCropComplete: (croppedImage: string) => void;
}


export function CropImage({ image, onCancel, onCropComplete }: CropImageProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, startTransition] = useTransition();

  function handleCropAndZoomReset() {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }

  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);


  function handleCropConfirm() {
    if (!image || !croppedAreaPixels) return;

    startTransition(async () => {
      const croppedImage = await createCroppedImage(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    });
  }


async function createCroppedImage(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}

  function handleOpenChange(open: boolean) {
    if (!open) {
      onCancel();
    }
  }

  return (
    <Dialog open={!!image} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajustar Imagem</DialogTitle>
          <DialogDescription>
            Arraste para reposicionar e use o zoom para ajustar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-72 w-full overflow-hidden rounded-lg bg-muted">
            {image && (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ZoomInIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value: number[]) => setZoom(value[0])}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full gap-2"
              onClick={handleCropAndZoomReset}
            >
              <RotateCcwIcon className="h-4 w-4" />
              Resetar
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="gap-2"
          >
            <XIcon className="h-4 w-4" />
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleCropConfirm}
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <CheckIcon className="h-4 w-4" />
                Aplicar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}