import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Source+Code+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
