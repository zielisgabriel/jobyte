import { getProfileDetailsService } from "@/services/getProfileDetailsService";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { 
  Building2Icon, 
  CalendarIcon, 
  Edit3Icon, 
  MapPinIcon, 
  PhoneIcon,
  HashIcon,
  ClockIcon
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import dayjs from "dayjs";
import { ProfileDetails } from "@/types/ProfileDetails";

export async function ProfileDetailsArea() {
  const profile: ProfileDetails = await getProfileDetailsService();

  console.log(profile);

  return (
    <section className="space-y-6">
      <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-card to-card/80">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <CardContent className="relative px-6 pb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="-mt-16 lg:-mt-12 flex flex-col items-center lg:items-start">
              <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
                <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                  {profile.companyName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 text-center lg:text-left lg:pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {profile.companyName}
                  </h1>
                  <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                    <Building2Icon className="h-3 w-3 mr-1" />
                    Empresa
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPinIcon className="h-4 w-4" />
                    {profile.address}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <PhoneIcon className="h-4 w-4" />
                    {profile.phone}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link href="/profile/edit">
                  <Button variant="default" size="sm" className="gap-2">
                    <Edit3Icon className="h-4 w-4" />
                    Editar Perfil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <HashIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  CNPJ
                </p>
                <p className="font-semibold truncate">
                  {profile.cnpj}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <CalendarIcon className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Membro desde
                </p>
                <p className="font-semibold">
                  {dayjs(profile.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <ClockIcon className="h-5 w-5 text-amber-500" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Última atualização
                </p>
                <p className="font-semibold">
                  {dayjs(profile.updatedAt).format("DD/MM/YYYY [às] HH:mm")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}