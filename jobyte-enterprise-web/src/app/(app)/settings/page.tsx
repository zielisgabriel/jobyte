import { BackNavButton } from "@/components/BackNavButton";
import { SettingsForm } from "@/components/SettingsForm";
import { SettingsSkeleton } from "@/components/SettingsSkeleton";
import { getProfileDetailsService } from "@/services/get-profile-details-service";
import { Suspense } from "react";

async function SettingsContent() {
  const profile = await getProfileDetailsService();
  
  return <SettingsForm profile={profile} />;
}

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="px-4 py-6 md:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <BackNavButton route="/dashboard" />
        <Suspense fallback={<SettingsSkeleton />}>
          <SettingsContent />
        </Suspense>
      </div>
    </main>
  );
}
