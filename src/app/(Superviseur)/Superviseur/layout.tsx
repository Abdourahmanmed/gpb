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
                Prefix: "Agent",
                Suffix: "Guiche"
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
