import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Calculator,
  MessageCircle,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import affordifyIcon from "@/assets/affordify-icon.png";

const menuItems = [
  { title: "Chat", url: "/dashboard", icon: MessageCircle },
  { title: "Account Details", url: "/account", icon: User },
  { title: "Credit Cards", url: "/credit-cards", icon: CreditCard },
  { title: "Loan Details", url: "/loans", icon: PiggyBank },
  { title: "Investments", url: "/investments", icon: TrendingUp },
  { title: "Calculators", url: "/calculators", icon: Calculator },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    // Navigate to login page
    window.location.href = "/";
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img 
              src={affordifyIcon} 
              alt="Affordify" 
              className="w-8 h-8 rounded-lg"
            />
            {!collapsed && (
              <h1 className="font-bold text-xl text-primary">Affordify</h1>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t">
          <Button
            variant="outline"
            size={collapsed ? "icon" : "default"}
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>

        {/* Collapse Toggle */}
        <SidebarTrigger className="absolute top-4 right-4" />
      </SidebarContent>
    </Sidebar>
  );
}