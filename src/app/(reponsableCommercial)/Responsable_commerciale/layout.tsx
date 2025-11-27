import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  const data = [
    {
      title: "Tableau de bord",
      url: "/Responsable_commerciale/Dashbord",
      icon: "LayoutDashboard",
      RoleName: {
        Prefix: "",
        Suffix: "Responsable",
      },
    },

    {
      title: "Création des utilisateurs",
      url: "/Responsable_commerciale/Creation_des_utilisateur",
      icon: "UserRoundCog",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Les abonnés",
      url: "/Responsable_commerciale/Les_Abonnes",
      icon: "Users",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Enlever les pénalités",
      url: "/Responsable_commerciale/Enleve_les_penalites",
      icon: "ListX",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Exonérer un abonné",
      url: "/Responsable_commerciale/Exonorer",
      icon: "ListX",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Comptes résiliés",
      url: "/Responsable_commerciale/Compte_Resilier",
      icon: "Users",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Comptes exonérés",
      url: "/Responsable_commerciale/Compte_Exonorer",
      icon: "Users",
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Rapports",
      url: "/Responsable_commerciale/Rapport",
      icon: "UserRoundCog",
      // submenu: [
      //   {
      //     title: "Récapitulatif journalier",
      //     url: "/Responsable_commerciale/Recaputilations/Journalier",
      //   },
      //   {
      //     title: "Récapitulatif mensuel",
      //     url: "/Responsable_commerciale/Recaputilations/Mensuel",
      //   },
      //   {
      //     title: "Récapitulatif annuel",
      //     url: "/Responsable_commerciale/Recaputilations/Annuel",
      //   },
      //   // {
      //   //   title: "Récap sous couvert",
      //   //   url: "/Responsable_commerciale/Recaputilations/Sous_couverte",
      //   // },
      //   // {
      //   //   title: "Récap livraisons à domicile",
      //   //   url: "/Responsable_commerciale/Recaputilations/Livraison",
      //   // },
      //   // {
      //   //   title: "Récap collectes",
      //   //   url: "/Responsable_commerciale/Recaputilations/Collection",
      //   // },
      // ],
      RoleName: {
        Prefix: "",
        Suffix: "",
      },
    },
    {
      title: "Aide",
      url: "/Responsable_commerciale/help",
      icon: "HelpCircle",
      RoleName: {
        Prefix: "Agent",
        Suffix: "Commercial",
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
