import { BackNavButton } from "@/components/BackNavButton";
import { ProfileDetails } from "@/components/ProfileDetails";
import { Separator } from "@/components/ui/separator";
import { VacancyList } from "@/components/VacancyList";

export default function ProfilePage() {
  return (
    <main className="px-2 py-4 md:px-4 max-w-6xl mx-auto">
      <BackNavButton />
      <ProfileDetails />
      <Separator className="my-4" />
      <VacancyList />
    </main>
  );
}