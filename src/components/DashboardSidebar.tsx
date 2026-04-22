import { LayoutDashboard, CalendarDays, UserCircle, LogOut, Clock, Bell } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  role: "patient" | "provider";
}

const patientLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Appointments", url: "/dashboard/appointments", icon: CalendarDays },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Profile", url: "/dashboard/profile", icon: UserCircle },
];

const providerLinks = [
  { title: "Dashboard", url: "/provider", icon: LayoutDashboard },
  { title: "Appointments", url: "/provider/appointments", icon: CalendarDays },
  { title: "Schedule", url: "/provider/schedule", icon: Clock },
  { title: "Profile", url: "/provider/profile", icon: UserCircle },
];

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const items = role === "patient" ? patientLinks : providerLinks;
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">M</span>
          </div>
          {!collapsed && <span className="text-sm font-bold">Mero Swasthya</span>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role === "patient" ? "Patient" : "Provider"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <NavLink to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Back to Home</span>}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
