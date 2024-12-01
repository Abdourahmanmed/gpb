import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarSeparator, SidebarInset } from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/Header"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider style={
            {
                "--sidebar-width": "19rem",
            } as React.CSSProperties
        }>
            <AppSidebar />
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
