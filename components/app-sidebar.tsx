"use client"

import { Home, Dumbbell, Apple, TrendingUp, BookOpen, Settings, Users, LogOut, Calendar } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Workouts",
    url: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Nutrition",
    url: "/nutrition",
    icon: Apple,
  },
  {
    title: "Diet Plans",
    url: "/diet-plans",
    icon: BookOpen,
  },
  {
    title: "Progress",
    url: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Workout Plans",
    url: "/plans",
    icon: Calendar,
  },
]

const adminItems = [
  {
    title: "Admin Panel",
    url: "/admin",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = () => {
    toast({
      title: "👋 Signed out successfully!",
      description: "You have been logged out. Redirecting to home page...",
      className: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-800 shadow-lg",
      duration: 3000,
    })
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-semibold">FitTracker Pro</h2>
            <p className="text-sm text-muted-foreground">Fitness Management</p>
          </div>
        </div>
        <div className="px-4 pb-4 group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Transform your fitness journey with our comprehensive tracking system. Log workouts, track nutrition, monitor progress, and achieve your goals with professional guidance.
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-full p-2 flex items-center justify-center">
              <span className="text-sm font-medium text-white">SKT</span>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">Santosh Kumar Thakur</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
          </div>
          
          {/* Sign Out Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0"
          >
            <LogOut className="h-4 w-4 group-data-[collapsible=icon]:h-3 group-data-[collapsible=icon]:w-3" />
            <span className="group-data-[collapsible=icon]:hidden ml-2">Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
