"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { Home, Inbox,Cuboid } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

// Typage correct des icônes pour s'assurer qu'elles acceptent className
const iconMapper: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Home,
    Inbox,
    Cuboid,
};

interface SidebarMenuItemProps {
    title: string;
    url: string;
    icon: keyof typeof iconMapper; // Clé valide pour les icônes
    RoleName: {
        Prefix: string;
        Suffix: string;
    }; // Nouveau champ pour RoleName
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    menuData: SidebarMenuItemProps[]; // Liste des données du menu
}

export function AppSidebar({ menuData, ...props }: AppSidebarProps) {
    const pathname = usePathname();

    return (
        <Sidebar variant="floating" {...props} className="text-white">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Image src="/logoposte.png" alt="photo lateral" width={50} height={50} />
                                </div>
                                <div className="flex  gap-2 leading-none">
                                    <span className="font-semibold text-xl">{menuData[0].RoleName.Prefix}</span>
                                    <span className="font-semibold text-xl">{menuData[0].RoleName.Suffix}</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <ScrollArea className="h-max w-full">
                    <SidebarGroup>
                        <SidebarMenu className="gap-2">
                            {menuData.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={pathname === item.url ? "bg-sidebar-accent text-primary" : "text-gray-300"}
                                    >
                                        <Link href={item.url}>
                                            {iconMapper[item.icon] &&
                                                React.createElement(iconMapper[item.icon]!, {
                                                    className: "mr-2",
                                                })}
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
    );
}
