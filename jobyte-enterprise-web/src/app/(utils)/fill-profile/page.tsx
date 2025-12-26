import { RocketIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignOutButton } from "@/components/sign-out-button";
import { FillProfileForm } from "@/components/fill-profile-form";

export default function FillProfilePage() {
  return (
    <main>
      <header className="flex justify-between items-center p-2 max-w-6xl mx-auto">
        <h1 className="text-2xl font-black">
          Jobyte.
        </h1>
        <SignOutButton />
      </header>

      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <RocketIcon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Complete seu perfil</CardTitle>
            <CardDescription>
              Precisamos de algumas informações sobre sua empresa para começar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FillProfileForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
