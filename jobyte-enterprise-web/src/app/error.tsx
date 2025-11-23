"use client"

import { BackNavButton } from "@/components/BackNavButton";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center items-center h-100 w-4xl mx-auto">
      <span className="text-4xl font-bold mb-6">
         :(
      </span>
      <h1 className="text-3xl font-bold">Algo aconteceu</h1>
      <p className="mt-4 text-lg">Ouver um erro inesperado, tente novamente mais tarde!</p>
      <p className="text-red-400 mt-2 font-bold text-md">Erro: {error.message}</p>
      <BackNavButton
        variant={"default"}
        className="mt-4"
      />
    </div>
  );
}