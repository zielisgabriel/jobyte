import { HomeInfoCarousel } from "@/components/HomeInfoCarousel";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col gap-4 justify-center items-center h-[94vh] max-w-3xl mx-auto px-2">
        <div className="flex w-full justify-between items-center">
          <div className="space-y-4">
            <h1 className="flex flex-col text-3xl font-semibold">
              Bem vindo ao
              <span className="text-5xl font-bold">
                Jobyte Enterprise!
              </span>
            </h1>
            <p className="max-w-[500px] text-xl opacity-70">
              Sua plataforma empresarial para gerenciar processos seletivos.
            </p>
            <div className="flex gap-4">
              <Link href={"/enterprise/register"}>
                <Button>
                  Começar agora
                </Button>
              </Link>
              <Link href={"/about"}>
                <Button variant={"outline"}>
                  Saiba mais
                </Button>
              </Link>
            </div>
          </div>

          <h1 className="text-6xl font-black">Jobyte.</h1>
        </div>

        <div className="mt-20">
          <HomeInfoCarousel />
        </div>
      </section>

      {/* <div>
          <h1 className="flex flex-col text-4xl font-semibold">
            Bem vindo ao
            <span className="font-black text-6xl">
              Jobyte Enterprise!
            </span>
          </h1>
          <div className="max-w-3xl text-center space-y-4">
            <p className="text-lg opacity-70">
              Sua plataforma empresarial para gerenciar vagas, candidatos e processos seletivos de ponta a ponta.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={"/enterprise/register"}
              >
                <Button>
                  Começar agora
                </Button>
              </Link>
              <Link
                href={"/"}
              >
                <Button variant={"outline"}>
                  Saiba mais
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span>+120 empresas</span>
              <span className="hidden sm:block">•</span>
              <span>+3k candidatos</span>
              <span className="hidden sm:block">•</span>
              <span>99,9% disponibilidade</span>
            </div>
          </div>
        </div> */}




      {/* <section>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-gray-200 p-5 bg-white/60 backdrop-blur">
              <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2H4V7zm0 4h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6z" />
            </svg>
          </span>
          <h3 className="font-semibold">Gestão de Vagas</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">
          Crie, publique e organize vagas com visibilidade e controles avançados.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 bg-white/60 backdrop-blur">
              <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 3a7 7 0 1 1-4.95 11.95l-2.6 2.6a1 1 0 0 1-1.41-1.42l2.6-2.6A7 7 0 0 1 10 3zm0 2a5 5 0 1 0 .001 10.001A5 5 0 0 0 10 5z" />
            </svg>
          </span>
          <h3 className="font-semibold">Triagem Inteligente</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">
          Filtros, tags e automações para encontrar os melhores talentos rapidamente.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 bg-white/60 backdrop-blur">
              <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h6v6H4V5zm0 8h6v6H4v-6zm10-8h6v10h-6V5z" />
            </svg>
          </span>
          <h3 className="font-semibold">Pipeline Colaborativo</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">
          Movimente candidatos por etapas, com comentários e avaliações do time.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 bg-white/60 backdrop-blur">
              <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 13h4v8H3v-8zm7-6h4v14h-4V7zm7-4h4v18h-4V3z" />
            </svg>
          </span>
          <h3 className="font-semibold">Relatórios & Insights</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">
          Métricas de contratação, SLA e funil para decisões orientadas por dados.
              </p>
            </div>
          </div>
      </section> */}
    </main>
  );
}
