"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackNavButton } from "@/components/back-nav-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircleIcon, MailIcon, HomeIcon, CopyIcon, RefreshCcwIcon } from "lucide-react";

export default function ErrorPage({ error }: { error: Error }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${error.message}\n\n${error.stack ?? ""}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
    }
  }

  function handleReport() {
    const subject = encodeURIComponent("[Jobyte] Relato de erro");
    const body = encodeURIComponent(`URL: ${typeof window !== "undefined" ? window.location.href : "n/a"}\n\nErro: ${error.message}\n\nStack:\n${error.stack ?? "-"}`);
    window.location.href = `mailto:suporte@jobyte.com?subject=${subject}&body=${body}`;
  }

  function handleRetry() {
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-3xl px-4">
        <Card className="border">
          <CardHeader className="flex items-center gap-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircleIcon className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-2xl">Algo deu errado</CardTitle>
              <p className="text-sm text-muted-foreground">Ocorreu um erro inesperado — não se preocupe, já estamos rastreando isso.</p>
            </div>
          </CardHeader>

          <CardContent className="mt-4">
            <div className="mb-4">
              <p className="text-base leading-relaxed text-foreground/90">Tente recarregar a página ou volte para a área anterior. Se o problema persistir, nos envie um relato.</p>
            </div>

            <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground break-words">
              <strong className="block mb-2">Resumo do erro</strong>
              <div className="font-mono text-xs text-foreground/90">{error.message}</div>
              {error.stack && (
                <details className="mt-2 text-xs text-muted-foreground">
                  <summary className="cursor-pointer">Mostrar stack trace</summary>
                  <pre className="whitespace-pre-wrap mt-2 text-xs">{error.stack}</pre>
                </details>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <BackNavButton
                className="mb-0"
                variant="ghost"
              />
              <Link href="/home">
                <Button variant="outline" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  Ir para a home
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleRetry} className="flex items-center gap-2">
                <RefreshCcwIcon className="h-4 w-4" />
                Tentar novamente
              </Button>

              <Button variant="outline" onClick={handleCopy} className="flex items-center gap-2">
                <CopyIcon className="h-4 w-4" />
                {copied ? "Copiado" : "Copiar erro"}
              </Button>

              <Button variant="default" onClick={handleReport} className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                Reportar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}