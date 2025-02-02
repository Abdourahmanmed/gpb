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
      title: "Tous les resiliations",
      url: "/Responsable_commerciale/Tous_les_resiliations",
      icon: "UserRoundCog",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Tous les changement Nom",
      url: "/Responsable_commerciale/Tous_les_changement_Nom",
      icon: "ScrollText",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Tous les changement cle",
      url: "/Responsable_commerciale/Tous_les_changement_cle",
      icon: "ListCheck",
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
      title: "Tous les demandes livraison",
      url: "/Responsable_commerciale/Tous_les_demande_livraison",
      icon: "ListFilter",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Accepter paiemnet d'une année",
      url: "/Responsable_commerciale/Accepter_paiement_annee",
      icon: "ListX",
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
      <SidebarInset className="">
        <Header />
        <main className="w-[99%] bg-gris h-[88vh] rounded-lg overflow-hidden">
          <ScrollArea className="h-full w-full p-4">{children}</ScrollArea>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
