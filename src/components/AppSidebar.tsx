"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Timer, BookCopy } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { chapters } from "@/data/chapters";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r" side="left" collapsible="icon">
      <SidebarHeader className="p-4 justify-center">
         <Link href="/" className="font-bold text-2xl text-primary font-headline">E</Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/"}
              tooltip={{ children: "Dashboard" }}
            >
              <Link href="/">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/chapter")}
              tooltip={{ children: "Chapters" }}
            >
              <Link href="#">
                <BookOpen />
                <span>Chapters</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {chapters.map((chapter) => (
                <SidebarMenuSubItem key={chapter.id}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === `/chapter/${chapter.id}`}
                  >
                    <Link href={`/chapter/${chapter.id}`}>
                      {chapter.id}. {chapter.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/mock-test"}
              tooltip={{ children: "Mock Test" }}
            >
              <Link href="/mock-test">
                <Timer />
                <span>Mock Test</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
