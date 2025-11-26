import { getProfileDetailsService } from "@/services/getProfileDetailsService";
import { Enterprise } from "@/types/Enterprise";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { Edit3Icon } from "lucide-react";

async function getProfileDetails(): Promise<Enterprise> {
  const response = await getProfileDetailsService();
  const profile = await response.json();
  return profile;
}

export async function ProfileDetails() {
  const profile: Enterprise = await getProfileDetails();

  return (
    <section className="space-y-6">
      <h1 className="font-bold text-2xl">
        Meu perfil
      </h1>
      <div className="flex flex-row items-end gap-4 justify-between">
        <div className="flex flex-col gap-4 items-center">
          <Avatar className="w-50 h-50">
            <AvatarFallback className="text-5xl font-bold">
              {profile.companyName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-4xl font-bold">
            {profile.companyName}
          </h1>

          <p className="font-semibold text-foreground-muted">
            {profile.address} - {profile.phone}
          </p>

          <Link href={"/profile/edit"}>
            <Button variant={"outline"}>
              <Edit3Icon />
              Editar Perfil
            </Button>
          </Link>

          <div>
            <h3 className="font-semibold">
              Descrição
            </h3>
            <p className="text-sm leading-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus doloribus numquam inventore, accusantium eaque, esse animi eos ipsum perferendis magni aliquam? Quas autem quidem quae reprehenderit praesentium fugit nostrum ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam labore asperiores voluptatem. Est, itaque. Numquam dicta atque inventore eaque molestias accusamus vel enim quasi molestiae corporis reprehenderit, ipsa nostrum ex? Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, architecto. Fuga aperiam eligendi temporibus, cum maxime voluptatum. Magni, reprehenderit. Illum, atque mollitia? Blanditiis debitis alias atque. Laborum corporis corrupti et. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt aliquam sint, eius inventore, accusamus neque harum, delectus nostrum aspernatur cumque blanditiis id iste atque? Ab adipisci velit illum dolorum magnam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga id vero, nesciunt itaque dolore consectetur facilis architecto nulla, provident, nobis consequatur minus sint! Impedit tenetur deleniti, dolorum assumenda excepturi suscipit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint vitae, iusto optio, laboriosam quaerat fugiat, reiciendis mollitia totam quidem eos minima asperiores! Omnis natus excepturi, officiis porro laudantium saepe aperiam!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}