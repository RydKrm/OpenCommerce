import {
  BarChart3,
  Package,
  Plus,
  Star,
  Users,
  Warehouse,
  FolderTree,
  ImageIcon,
  Settings,
  Home,
  Shield,
  Truck,
  CreditCard,
  TrendingUp,
  Percent,
  MapPin,
  Mail,
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
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Create Product",
    url: "/dashboard/products/create",
    icon: Plus,
  },
  {
    title: "All Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Reviews",
    url: "/dashboard/reviews",
    icon: Star,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Warehouse,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: FolderTree,
  },
  {
    title: "Banner Management",
    url: "/dashboard/banners",
    icon: ImageIcon,
  },
  {
    title: "Role Management",
    url: "/dashboard/roles",
    icon: Shield,
  },
  {
    title: "Order Shipping",
    url: "/dashboard/shipping",
    icon: Truck,
  },
  {
    title: "Payment Status",
    url: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Product Performance",
    url: "/dashboard/analytics",
    icon: TrendingUp,
  },
  {
    title: "Coupons",
    url: "/dashboard/coupons",
    icon: Percent,
  },
  {
    title: "Address Management",
    url: "/dashboard/addresses",
    icon: MapPin,
  },
  {
    title: "Email Campaigns",
    url: "/dashboard/campaigns",
    icon: Mail,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="w-8 h-8 bg-foreground text-background rounded-md flex items-center justify-center">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-semibold text-lg">EcomAdmin</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
