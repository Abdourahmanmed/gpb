import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/Header"
import { FileProvider } from "@/components/FileContexe"
export default function Layout({ children }: { children: React.ReactNode }) {
    const data = [
        {
            title: "Rechercher",
            url: "/Agent_guiche/Rechercher",
            icon: "Home",
            RoleName: {
                Prefix: "Agent du",
                Suffix: "Guiche"
            }
        },
        {
            title: "Nouveau client",
            icon: "Inbox",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Guiche"
            },
            submenu: [
                { title: "Formulaire D'enregistrement", url: "/Agent_guiche/Nouveau_client/Multi-Form" },
                { title: "Modification Nom", url: "/Agent_guiche/Changer_nom" },
                { title: "acheter un cle ", url: "/Agent_guiche/Achat_cle" },
                { title: "Ajouter un sous couvert", url: "/Agent_guiche/Ajout_sous_couverte" },
                { title: "Ajouter une demande livraison", url: "/Agent_guiche/Ajout_livraison" },
                { title: "Ajouter une collection", url: "/Agent_guiche/Ajout_collection" },
            ],
        },
        {
            title: "paiement",
            url: "/Agent_guiche/Paiement",
            icon: "HandCoins",
            RoleName: {
                Prefix: "Agent",
                Suffix: "Guiche"
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
                        <FileProvider>
                            {children}
                        </FileProvider>
                    </ScrollArea>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
