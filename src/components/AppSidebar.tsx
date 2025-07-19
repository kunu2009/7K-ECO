
"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Home, Timer, User, Bookmark, Search, Gamepad } from "lucide-react";
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
  useSidebar,
  SidebarInput
} from "@/components/ui/sidebar";
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
    <Sidebar className="border-r" side="left" collapsible="icon">
      <SidebarHeader className="p-4 justify-center">
         <Link href="/" className="font-bold text-2xl text-primary font-headline" onClick={handleLinkClick}>E</Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="p-2">
          <form onSubmit={handleSearch}>
            <SidebarInput name="search" placeholder="Search..." icon={<Search />} />
          </form>
        </div>
        <SidebarMenu>
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
              isActive={pathname === "/mock-test"}
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
