import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ScrollArea, Separator } from "radix-ui";
import { selectionProcess } from "@/environments/selectionProcess";
import clsx from "clsx";
import { ArrowRightIcon, ChartAreaIcon, PlusIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="flex gap-1 items-end text-4xl font-bold mb-4 underline">
          <ChartAreaIcon size={32} />
          Dashboard
        </h1>
        <section className="space-y-2">
          <div className="flex justify-between">
            <h2 className="flex items-center gap-1 text-lg font-bold">
              <ArrowRightIcon />
              Processos seletivos
            </h2>
            <Button>
              <PlusIcon size={24} />
              Adicionar processo
            </Button>
          </div>
          <div>
            <ScrollArea.Root className="w-full h-75 overflow-hidden">
              <ScrollArea.Viewport className="size-full">
                {selectionProcess.map(process => (
                  <div key={process.id}>
                    <Link
                      href={`/dashboard/vacancy/${process.id}`}
                    >
                      <Button
                        className="rounded h-20 w-full justify-between"
                        variant={"ghost"}
                      >
                        <div className="flex flex-col text-left space-y-2">
                          <h1 className="text-md">
                            {process.title}
                          </h1>
                          <p className="text-[12px] opacity-70">
                            {process.createdAt && `Início: ${new Date(process.createdAt).toLocaleDateString()}`}{" "}
                            {process.finalDate && `| Fim: ${new Date(process.finalDate).toLocaleDateString()}`}
                          </p>
                        </div>
                        <span className="flex items-center text-sm gap-2">
                          {process.status === 'IN_PROGRESS' && 'Em andamento'}
                          {process.status === 'COMPLETED' && 'Concluído'}
                          {process.status === 'PENDING' && 'Pendente'}
                          <div className={clsx("w-4 h-2 block rounded-full", {
                            'bg-yellow-500': process.status === 'PENDING',
                            'bg-green-500': process.status === 'COMPLETED',
                            'bg-blue-500': process.status === 'IN_PROGRESS',
                          })}/>
                        </span>
                      </Button>
                    </Link>
                    <Separator.Root className="bg-foreground h-px opacity-10 mx-1" />
                  </div>
                ))}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical" className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2">
                <ScrollArea.Thumb className="flex-1 bg-foreground rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="bg-transparent" />
            </ScrollArea.Root>
          </div>
        </section>
      </div>
    </main>
  );
}