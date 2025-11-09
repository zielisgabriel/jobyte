import { HomeInfoCarousel } from "@/components/HomeInfoCarousel";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col gap-4 justify-center items-center h-[92vh] max-w-4xl mx-auto px-4">
        <div className="flex w-full justify-between items-center">
          <div className="space-y-4">
            <h1 className="flex flex-col text-3xl font-semibold">
              Bem vindo ao
              <span className="text-5xl font-bold">
                Jobyte Enterprise!
              </span>
            </h1>
            <p className="max-w-[500px] text-md opacity-70">
              Sua plataforma empresarial para gerenciar processos seletivos.
            </p>
            <div className="flex sm:flex-row flex-col gap-2">
              <Link
                href={"/register"}
                className="flex"
              >
                <Button>
                  Começar agora
                </Button>
              </Link>
              <Link
                href={"/about"}
                className="flex"
              >
                <Button variant={"outline"}>
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>

          <h1 className="text-6xl font-black hidden md:block">
            Jobyte.
          </h1>
        </div>

        <div className="mt-16 w-full">
          <HomeInfoCarousel />
        </div>
      </section>
    </main>
  );
}
