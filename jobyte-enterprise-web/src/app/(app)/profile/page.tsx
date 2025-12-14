import { BackNavButton } from "@/components/back-nav-button";
import { ProfileDetailsArea } from "@/components/profile-details-area";
import { Separator } from "@/components/ui/separator";
import { VacancyList } from "@/components/vacancy-list";
import { BriefcaseIcon } from "lucide-react";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileDetailsSkeleton() {
  return (
    <section className="space-y-6">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        
        <CardContent className="relative px-6 pb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="-mt-16 lg:-mt-12 flex flex-col items-center lg:items-start">
              <Skeleton className="h-28 w-28 rounded-full" />
            </div>
            
            <div className="flex-1 text-center lg:text-left lg:pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <Skeleton className="h-9 w-64 mx-auto lg:mx-0" />
                  <Skeleton className="h-6 w-24 mx-auto lg:mx-0" />
                </div>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Skeleton className="h-9 w-32" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="px-4 py-6 md:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <BackNavButton route="/home" />
        
        <Suspense fallback={<ProfileDetailsSkeleton />}>
          <ProfileDetailsArea />
        </Suspense>
        
        <Separator className="my-8" />
        
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BriefcaseIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Minhas Vagas</h2>
              <p className="text-sm text-muted-foreground">
                Gerencie todas as suas vagas publicadas
              </p>
            </div>
          </div>
          
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            }
          >
            <VacancyList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}