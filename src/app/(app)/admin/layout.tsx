import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};

export default Layout;
