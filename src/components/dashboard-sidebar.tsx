import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { ChartArea, FileText, Package, User } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: ChartArea
    },
  {
    title: "Users",
    url: "/admin/users",
    icon: User
  },
  {
    title: "Blog Posts",
    url: "/admin/posts",
    icon: FileText
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package
  }
];

export const DashboardSidebar = () => {
  return (
    <Sidebar className="mt-16">
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
