"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import logo from "@/app/images/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

// Items, labels and order come from the Figma "Sidebar" component
// (Role=Seeker / Role=Recruiter / Role=Admin). The URLs are suggestions:
// change them to match your routes.
const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: "jobs", name: "Jobs", url: "/jobs", icon: Briefcase },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],

  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: "my-company", name: "My Company", url: "/dashboard/recruiter/company", icon: Building2 },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],

  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  const role = (session?.user?.role as Role | undefined) ?? "seeker"
  const items = menuItemsByRole[role] ?? menuItemsByRole.seeker

  // "Dashboard" is the root of each role's section, so it only matches exactly;
  // every other item is active for its own page and anything below it.
  const rootUrl = items[0].url
  const isActive = (url: string) =>
    url === rootUrl ? pathname === url : pathname === url || pathname.startsWith(`${url}/`)

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" aria-label="Hireloop home" className="flex items-center px-2 py-1">
          <Image src={logo} alt="Hireloop" priority className="h-8 w-auto" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {!isPending &&
              items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive(item.url)}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

export default DashboardSidebar