import { Separator } from "radix-ui";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { SearchIcon } from "lucide-react";

export function SearchVacancy() {
  return (
    <form className="mt-6">
        <div className="flex w-full border overflow-hidden rounded-xl">
          <div className="flex w-full">
            <Input
              className="w-full m-2"
              variant={"border_transparent"}
              placeholder="Digite a vaga"
            />
            <Separator.Root orientation="vertical" className="w-1 bg-foreground my-4 rounded-full" />
            <Input
              className="w-full m-2"
              variant={"border_transparent"}
              placeholder="Digite a cidade"
            />
          </div>

        <Button className="rounded-r-none">
          <SearchIcon />
          Buscar
        </Button>
      </div>
    </form>
  );
}