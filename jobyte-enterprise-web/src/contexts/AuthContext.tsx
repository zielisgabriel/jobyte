"use client";

import { createContext, useEffect, useState } from "react";
import { Enterprise } from "@/types/Enterprise";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/environments/AUTH_PATHS";
import { toast } from "sonner";

interface AuthContextType {
  profile: Enterprise | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Enterprise | null>(null);
  const {push} = useRouter();
  const pathname = usePathname();

  async function login(email: string, password: string) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.status >= 500) throw Error("Servidor está fora do ar!");

      if (!response.ok) throw Error("Houve um erro inesperado!");
      
      push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
    } catch (error: any) {
    } finally {
      setProfile(null);
      push("/login");
    }
  }

  async function fetchProfile() {
    const response = await fetch("/api/profile/me", {
      method: "GET"
    });

    if (response.status === 401) {
      await logout();
      return;
    }

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
      return;
    }
  }

  useEffect(() => {
    if (AUTH_PATHS.some(path => pathname.startsWith(path))) {
      return;
    }

    if (pathname === "/home") {
      return;
    }

    fetchProfile();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{
      profile,
      logout,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
}