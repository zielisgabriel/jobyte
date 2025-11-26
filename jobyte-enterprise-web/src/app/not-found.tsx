import { BackNavButton } from "@/components/BackNavButton";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center mt-40 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black">404</h1>
      <h2 className="text-xl font-bold">Não foi possível encontrar esta página</h2>
      <BackNavButton variant={"default"} />
    </div>
  );
}