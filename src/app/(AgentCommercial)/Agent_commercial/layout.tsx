import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/Header"
export default function Layout({ children }: { children: React.ReactNode }) {
    const data = [
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
            title: "Changement Nom",
            url: "/Agent_commercial/Changement_Nom",
            icon: "Inbox",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Commercial"
            }
        },
        {
            title: "Resiliation",
            url: "/Agent_commercial/Resiliation",
            icon: "Inbox",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Commercial"
            }
        },
        {
            title: "Les abonnes",
            url: "/Agent_commercial/Les_abonnes",
            icon: "Inbox",
            RoleName: {
                Prefix: "Agent",
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
            <SidebarInset className="">
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
