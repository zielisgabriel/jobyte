import { BackNavButton } from "@/components/back-nav-button";
import { ProfileEditForm } from "@/components/profile-edit-form";
import { ProfileEditSkeleton } from "@/components/profile-edit-skeleton";
import { getProfileDetailsService } from "@/services/get-profile-details-service";
import { Suspense } from "react";

async function ProfileEditContent() {
  const profile = await getProfileDetailsService();

  return <ProfileEditForm profile={profile} />;
}

export default function ProfileEditPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="px-4 py-6 md:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <BackNavButton route="/profile" />
        <Suspense fallback={<ProfileEditSkeleton />}>
          <ProfileEditContent />
        </Suspense>
      </div>
    </main>
  );
}
