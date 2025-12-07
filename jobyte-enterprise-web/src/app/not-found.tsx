import Link from "next/link";
import { BackNavButton } from "@/components/BackNavButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchXIcon, HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <SearchXIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-5xl font-black mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-2">Página não encontrada</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm">
              A página que você está procurando não existe ou foi movida. Verifique o endereço ou volte para o início.
            </p>
            <div className="flex items-center gap-3">
              <BackNavButton
                className="mb-0"
                variant="outline"
              />
              <Link href="/home">
                <Button>
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Ir para a home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}