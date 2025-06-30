"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Home,
    Inbox,
    Cuboid,
    Clipboard,
    UserX,
    FolderPen,
    HandCoins,
    ChevronDown,
    LayoutDashboard,
    FolderCheck,
    Users,
    UserRoundCog,
    ScrollText,
    Bell,
    ListCheck,
    ListFilter,
    ListX,
    Power,
    HelpCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOutButton } from "@/actions/route";

// Typage des icônes
const iconMapper: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    Home,
    Inbox,
    Cuboid,
    FolderPen,
    UserX,
    Clipboard,
    HandCoins,
    LayoutDashboard,
    FolderCheck,
    Users,
    UserRoundCog,
    ScrollText,
    Bell,
    ListX,
    ListFilter,
    ListCheck,
    HelpCircle,
};

interface SubmenuItem {
    title: string;
    url: string;
}

interface SidebarMenuItemProps {
    title: string;
    url?: string; // L'URL peut être facultative pour les menus avec des sous-menus
    icon: keyof typeof iconMapper;
    RoleName?: {
        Prefix: string;
        Suffix: string;
    };
    submenu?: SubmenuItem[]; // Sous-menu dynamique
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    menuData: SidebarMenuItemProps[]; // Liste des données du menu
}

export function AppSidebar({ menuData, ...props }: AppSidebarProps) {
    const pathname = usePathname();

    // Fonction pour vérifier si un sous-menu est actif
    const isSubmenuActive = (submenu?: SubmenuItem[]) => {
        if (!submenu) return false;
        return submenu.some((subItem) => pathname === subItem.url);
    };

    return (
        <Sidebar variant="floating" {...props} className="text-white" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="h-auto">
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Image
                                        src="/logoposte.png"
                                        alt="photo lateral"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 leading-none">
                                    <span className="font-semibold text-xl">
                                        {menuData[0]?.RoleName?.Prefix}
                                    </span>
                                    <span className="font-semibold text-xl">
                                        {menuData[0]?.RoleName?.Suffix}
                                    </span>
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
                                    {item.submenu && item.submenu.length > 0 ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuButton
                                                    className={`flex justify-between items-center ${isSubmenuActive(item.submenu)
                                                        ? "bg-sidebar-accent text-primary"
                                                        : "text-gray-300"
                                                        }`}
                                                >
                                                    {iconMapper[item.icon] &&
                                                        React.createElement(iconMapper[item.icon]!, {
                                                            className: "mr-2",
                                                        })}
                                                    <span>{item.title}</span>
                                                    <ChevronDown className="ml-auto" />
                                                </SidebarMenuButton>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-full">
                                                {item.submenu
                                                    .filter(
                                                        (subItem) =>
                                                            ![
                                                                "/Agent_guiche/Nouveau_client/StepTwoForm",
                                                                "/Agent_guiche/Nouveau_client/StepThreeForm",
                                                                "/Agent_guiche/Nouveau_client/StepFourForm",
                                                            ].includes(subItem.url)
                                                    )
                                                    .map((subItem) => (
                                                        <DropdownMenuItem
                                                            key={subItem.title}
                                                            asChild
                                                        >
                                                            <Link
                                                                href={subItem.url}
                                                                className={`${pathname === subItem.url
                                                                    ? "bg-sidebar-accent text-primary"
                                                                    : "text-gray-800"
                                                                    }`}
                                                            >
                                                                {subItem.title}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <SidebarMenuButton
                                            asChild
                                            className={`${pathname === item.url
                                                ? "bg-sidebar-accent text-primary"
                                                : "text-gray-300"
                                                }`}
                                        >
                                            <Link href={item.url || "#"}>
                                                {iconMapper[item.icon] &&
                                                    React.createElement(iconMapper[item.icon]!, {
                                                        className: "mr-2",
                                                    })}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </ScrollArea>
            </SidebarContent>

            <SidebarFooter>
                <form className="w-full" action={LogOutButton}>
                    <Button type="submit" className="bg-transparent hover:bg-white hover:text-blue-500 duration-500 w-full"><Power /> Deconnexion</Button>
                </form>
            </SidebarFooter>
        </Sidebar >
    );
}
