import type { Metadata } from "next";
import { PT_Sans, Source_Code_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "7K Eco",
  description: "Learn 12th grade economics with AI-powered tools.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable} ${sourceCodePro.variable}`}>
      <head>
        <meta name="theme-color" content="#FFC107" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="font-body antialiased bg-background">
        <SidebarProvider>
          <div className="flex">
            <main className="flex-1 md:h-screen md:overflow-y-auto">
              <div className="md:hidden p-4 border-b">
                 <SidebarTrigger />
              </div>
              {children}
            </main>
            <AppSidebar />
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
