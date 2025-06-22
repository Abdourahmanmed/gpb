import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/Header"
export default function Layout({ children }: { children: React.ReactNode }) {
    const data = [
        {
            title: "Dashbord",
            url: "/Agent_commercial/Dashbord",
            icon: "LayoutDashboard",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Commercial"
            }
        },
        {
            title: "Les abonnes",
            url: "/Agent_commercial/Les_abonnes",
            icon: "Clipboard",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Commercial"
            }
        },
        {
            title: "List Boit postal",
            url: "/Agent_commercial/Liste_Boite_postal",
            icon: "Cuboid",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Commercial"
            }
        },
        {
            title: "Resiliation",
            url: "/Agent_commercial/Resiliation",
            icon: "UserX",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Commercial"
            }
        },
        {
            title: "Recaputilation",
            url: "/Agent_commercial/Recaputilation",
            icon: "FolderPen",
            submenu: [
                { title: "Recap resiliations", url: "/Agent_commercial/Recaputilation/Rapport/Resilier" },
                { title: "Recap redevance", url: "/Agent_commercial/Recaputilation/Rapport/Redevance" },
                { title: "Recap Modification Nom", url: "/Agent_commercial/Recaputilation/Rapport/Changer_nom" },
                { title: "Recap Achat  cle ", url: "/Agent_commercial/Recaputilation/Rapport/Achat_cle" },
                { title: "Recap sous couvert", url: "/Agent_commercial/Recaputilation/Rapport/Sous_couverte" },
                { title: "Recap livraison à domocile", url: "/Agent_commercial/Recaputilation/Rapport/Livraison" },
                { title: "Recap collect", url: "/Agent_commercial/Recaputilation/Rapport/Collection" },
            ],
            RoleName: {
                Prefix: "Agent du ",
                Suffix: "Commercial"
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
                <main className="w-[99%] bg-gris min-h-[calc(100vh-4.6rem)] rounded-lg overflow-hidden">
                    <ScrollArea className="h-full w-full p-4">
                        {children}
                    </ScrollArea>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
