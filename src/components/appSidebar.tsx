"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { navItems } from "@/constants/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

export default function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">PickBuy</span>
            </Link>
            {isMobile && (
              <X onClick={() => setOpenMobile(false)} className="ml-auto" />
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className="text-md flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      onClick={handleNavItemClick}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/api/auth/signout"
                className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                onClick={handleNavItemClick}
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                <span>ログアウト</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
