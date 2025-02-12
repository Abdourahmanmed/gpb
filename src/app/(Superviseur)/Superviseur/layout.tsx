import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/Header"
export default function Layout({ children }: { children: React.ReactNode }) {
    const data = [
        {
            title: "Dashbord",
            url: "/Superviseur/Dashbord",
            icon: "LayoutDashboard",
            RoleName: {
                Prefix: "Superviseur",
                Suffix: "des agents Guichet"
            }
        },
        
        {
            title: "Depot de resiliation",
            url: "/Superviseur/Depot_de_resiliation",
            icon: "FolderCheck",
            RoleName: {
                Prefix: "Superviseur",
                Suffix: ""
            }
        },
        {
            title: "Les Abonnes",
            url: "/Superviseur/Les_Abonnes",
            icon: "Users",
            RoleName: {
                Prefix: "Superviseur",
                Suffix: ""
            }
        },
        {
            title: "Les Agents",
            url: "/Superviseur/Les_Agents",
            icon: "UserRoundCog",
            RoleName: {
                Prefix: "Superviseur",
                Suffix: ""
            }
        },
        {
            title: "Liste Boite Postal",
            url: "/Superviseur/Liste_Boite_Postal",
            icon: "ScrollText",
            RoleName: {
                Prefix: "Superviseur",
                Suffix: ""
            }
        },
        {
            title: "Notifications",
            url: "/Superviseur/Notifications",
            icon: "Bell",
            RoleName: {
                Prefix: "Superviseur",
                Suffix: ""
            }
        },
    ]
    return (
        <SidebarProvider style={
            {
                "--sidebar-width": "19rem",
            } as React.CSSProperties
        }>
            <AppSidebar menuData={data} />
            <SidebarInset className="overflow-hidden">
                <Header />
                <main className="w-[99%] bg-gris h-[88vh] rounded-lg overflow-hidden">
                    <ScrollArea className="h-full w-full p-4">
                        {children}
                    </ScrollArea>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
