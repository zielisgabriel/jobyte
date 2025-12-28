"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function CtaSection() {
  return(
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <CardContent className="p-10 sm:p-16 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Pronto para revolucionar suas contratações?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Junte-se a milhares de empresas que já transformaram seu processo de recrutamento com o Jobyte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base px-8"
                onClick={async () => await signIn("keycloak")}
              >
                Começar agora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}