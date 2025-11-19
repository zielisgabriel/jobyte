import { Poppins } from "next/font/google";
import "@/css/globals.css";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-BR">
        <body
          className={`${poppins.className} antialiased dark`}
        >
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
