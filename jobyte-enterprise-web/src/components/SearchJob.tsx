"use client"

import { useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { FileSearchIcon, MapPinIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "radix-ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMobile } from "@/hooks/useMobile";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const searchJobSchema = z.object({
  vacancy: z.string().min(1).max(60),
  locality: z.string().min(1).max(60)
});

interface SearchJobType extends z.infer<typeof searchJobSchema> {}

export function SearchJob() {
  const { isMobile } = useMobile();
  const [isSearchCityInputFocus, setIsSearchCityInputFocus] = useState<boolean>(false);
  const [cities, setCities] = useState<[]>([]);
  const {
    formState,
    watch,
    handleSubmit,
    register,
    setValue
  } = useForm({
    resolver: zodResolver(searchJobSchema),
    defaultValues: {
      locality: "",
      vacancy: ""
    }
  });
  const {
    isValid
  } = formState;
  const localityInputWatch = watch("locality");

  async function onSubmit(data: SearchJobType) {
    console.log(data);
  }

  async function fetchCities(name: string): Promise<[]> {
    const params = new URLSearchParams();
    params.append("name", name);
    const response = await fetch("/city/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: params.toString()
    });
    return response.json();
  }

  async function loadCities() {
    const citiesData = await fetchCities(localityInputWatch);
    setCities(citiesData);
  }

  useEffect(() => {
    if (localityInputWatch.length > 0) {
      const timeoutId = setTimeout(() => loadCities(), 200);
      return () => clearTimeout(timeoutId);
    }

    setCities([]);
  }, [localityInputWatch]);

  return (
    <form
      className={twMerge(clsx("flex relative max-w-2xl mt-8 p-1 border-1 border-foreground", isMobile ? "flex-col rounded-2xl" : "flex-row rounded-full"))}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex">
        <div className="flex items-center">
          <FileSearchIcon className="h-6 w-6 ml-4" />
          <input
            type="text"
            placeholder="Pesquisar"
            {...register("vacancy")}
            className="w-full p-3 placeholder:text-foreground/80 text-foreground"
          />
        </div>
        <Separator.Root
          orientation="vertical"
          className="w-0.5 bg-foreground/60 my-2 rounded-full"
        />
        <div className="flex items-center">
          <MapPinIcon className="h-6 w-6 ml-4" />
          <input
            type="text"
            placeholder="Cidade"
            {...register("locality")}
            className="w-full p-3 placeholder:text-foreground/80 text-foreground"
            onFocus={() => setIsSearchCityInputFocus(true)}
            onBlur={() => setTimeout(() => setIsSearchCityInputFocus(false), 200)}
          />
          <div className="w-8 h-8">
            {localityInputWatch.length > 0 && (
              <Button
                className="p-2 w-full h-full"
                variant={"ghost"}
                onClick={() => setValue("locality", "")}
              >
                <XIcon size={16} />
              </Button>
            )}
          </div>
          {isSearchCityInputFocus && (
            <div className={twMerge(clsx("absolute w-full left-0 px-1 py-2 shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-xl min-h-30", isMobile ? "top-26" : "top-18"))}>
              <h1 className="text-xl font-semibold ml-4">Cidades</h1>
              <Separator.Root className="h-px bg-foreground/60 my-2 mx-4 rounded-full" />
              <div>
                
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        className={twMerge(clsx("right-0", isMobile ? "rounded-xl" : "rounded-full"))}
        type="submit"
        disabled={!isValid}
      >
        <SearchIcon size={18} />
        {isMobile && "Pesquisar"}
      </Button>
    </form>
  );
}