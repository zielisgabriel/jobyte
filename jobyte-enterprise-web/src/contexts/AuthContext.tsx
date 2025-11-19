"use client";

import { createContext, useEffect, useState } from "react";
import { Enterprise } from "@/types/Enterprise";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_PATHS } from "@/environments/AUTH_PATHS";

interface AuthContextType {
  profile: Enterprise | null;
  logout: () => Promise<void>;
  login: (email: string, password: string, setErrorMessage: (message: string) => void) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Enterprise | null>(null);
  const {push} = useRouter();
  const pathname = usePathname();

  async function login(email: string, password: string, setErrorMessage: (message: string) => void) {
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

      if (!response.ok) {
        setErrorMessage("Falha ao autenticar. Verifique suas credenciais.");
        return;
      }
      
      push("/dashboard");
    } catch (error: any) {
      setErrorMessage("Erro inesperado. Tente novamente.");
      return;
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      });
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
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

    console.log("AuthContext: fetchProfile response status:", response.status);

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