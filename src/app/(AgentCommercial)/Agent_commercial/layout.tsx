import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/Header"
export default function Layout({ children }: { children: React.ReactNode }) {
    const data = [
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
