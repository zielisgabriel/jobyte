import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ProfileEditSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full lg:w-80" />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1 border-none shadow-lg">
            <CardHeader className="text-center space-y-2">
              <Skeleton className="h-5 w-32 mx-auto" />
              <Skeleton className="h-4 w-40 mx-auto" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-none shadow-lg">
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
          <Skeleton className="h-10 w-full sm:w-24" />
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>
      </div>
    </div>
  );
}
