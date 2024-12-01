"use client";
import * as React from "react"
import { usePathname } from "next/navigation" // Import du hook usePathname
import { Home, Inbox } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"
import Image from "next/image"
import Link from "next/link"

// Données du menu
const data = [
    {
        title: "Les abonnes",
        url: "/Agent_guiche/Les_abonnes",
        icon: Home,
    },
    {
        title: "Nouveau client",
        url: "/Agent_guiche/Nouveau_client",
        icon: Inbox,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname() // Récupération du chemin actuel

    return (
        <Sidebar variant="floating" {...props} className="text-white">
            <SidebarHeader className="text-white">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Image
                                        src="/logoposte.png"
                                        alt="photo lateral"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Agent</span>
                                    <span className="">du guiche</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="text-white">
                <ScrollArea className="h-max w-full">
                    <SidebarGroup>
                        <SidebarMenu className="gap-2 text-white">
                            {data.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`${pathname === item.url
                                                ? "bg-sidebar-accent text-primary" // Style actif
                                                : "text-gray-300" // Style inactif
                                            }`}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    )
}
