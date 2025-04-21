import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  const data = [
    {
      title: "Dashbord",
      url: "/Responsable_commerciale/Dashbord",
      icon: "LayoutDashboard",
      RoleName: {
        Prefix: "Responsable",
        Suffix: "Commercial",
      },
    },

    {
      title: "Creation des utilisateur",
      url: "/Responsable_commerciale/Creation_des_utilisateur",
      icon: "UserRoundCog",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Les Abonnes",
      url: "/Responsable_commerciale/Les_Abonnes",
      icon: "Users",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Enlever le penalite",
      url: "/Responsable_commerciale/Enleve_les_penalites",
      icon: "ListX",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Exonorer un abonné",
      url: "/Responsable_commerciale/Exonorer",
      icon: "ListX",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Compte Resilier",
      url: "/Responsable_commerciale/Compte_Resilier",
      icon: "Users",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Compte Exonorer",
      url: "/Responsable_commerciale/Compte_Exonorer",
      icon: "Users",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Rapports",
      url: "/Responsable_commerciale/Tous_les_resiliations",
      icon: "UserRoundCog",
      submenu: [
        { title: "Recap redevance", url: "/Responsable_commerciale/Recaputilations/Redevance" },
        { title: "Recap Modification Nom", url: "/Responsable_commerciale/Recaputilations/Changer_nom" },
        { title: "Recap Acheter un cle ", url: "/Responsable_commerciale/Recaputilations/Achat_cle" },
        { title: "Recap Ajouter un sous couvert", url: "/Responsable_commerciale/Recaputilations/Sous_couverte" },
        { title: "Recap Ajouter une demande livraison", url: "/Responsable_commerciale/Recaputilations/Livraison" },
        { title: "Recap Ajouter une collection", url: "/Responsable_commerciale/Recaputilations/Collection" },
      ],
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },


  ];
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar menuData={data} />
      <SidebarInset className="overflow-hidden">
        <Header />
        <main className="w-[99%] bg-gris h-[88vh]  rounded-lg overflow-hidden ">
          <ScrollArea className="h-full w-full p-4">{children}</ScrollArea>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
