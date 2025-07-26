
"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Home, Timer, User, Bookmark, Search, Gamepad, Puzzle, Share2, Camera, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { chapters } from "@/data/chapters";

export default function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const router = useRouter();

  const handleLinkClick = () => {
    setOpenMobile(false);
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      handleLinkClick();
    }
  }

  return (
    <Sidebar className="border-l" side="right" collapsible="icon">
       <SidebarHeader className="p-4 flex items-center justify-between">
         <Link href="/" className="font-bold text-2xl text-primary font-headline" onClick={handleLinkClick}><GraduationCap /></Link>
         <div className="hidden md:block">
            <SidebarTrigger />
         </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <form onSubmit={handleSearch} className="relative">
              <SidebarMenuButton asChild className="p-0 h-8 [&>svg]:hidden [&>span]:hidden" tooltip={{ children: "Search" }}>
                  <label htmlFor="search-input">
                      <Search />
                      <span className="sr-only">Search</span>
                  </label>
              </SidebarMenuButton>
              <Input
                id="search-input"
                name="search"
                placeholder="Search..."
                className="absolute inset-0 h-full w-full bg-sidebar-accent/50 group-data-[collapsible=icon]:hidden pl-8 placeholder:text-muted-foreground/80"
              />
            </form>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/"}
              tooltip={{ children: "Dashboard" }}
            >
              <Link href="/" onClick={handleLinkClick}>
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
                    <Link href={`/chapter/${chapter.id}`} onClick={handleLinkClick}>
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
              isActive={pathname === "/concept-web"}
              tooltip={{ children: "Concept Web" }}
            >
              <Link href="/concept-web" onClick={handleLinkClick}>
                <Share2 />
                <span>Concept Web</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/mock-test")}
              tooltip={{ children: "Mock Test" }}
            >
              <Link href="/mock-test" onClick={handleLinkClick}>
                <Timer />
                <span>Mock Test</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton
                asChild
                isActive={pathname === "/policy-game"}
                tooltip={{ children: "Policy Game" }}
                >
                <Link href="/policy-game" onClick={handleLinkClick}>
                    <Gamepad />
                    <span>Policy Game</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          
           <SidebarMenuItem>
                <SidebarMenuButton
                asChild
                isActive={pathname === "/trivia"}
                tooltip={{ children: "Trivia Challenge" }}
                >
                <Link href="/trivia" onClick={handleLinkClick}>
                    <Puzzle />
                    <span>Trivia Challenge</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/scan"}
              tooltip={{ children: "Scan Textbook" }}
            >
              <Link href="/scan" onClick={handleLinkClick}>
                <Camera />
                <span>Scan Page</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/personalize"}
              tooltip={{ children: "Personalize" }}
            >
              <Link href="/personalize" onClick={handleLinkClick}>
                <User />
                <span>Personalize</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/bookmarks"}
              tooltip={{ children: "Bookmarks" }}
            >
              <Link href="/bookmarks" onClick={handleLinkClick}>
                <Bookmark />
                <span>Bookmarks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
