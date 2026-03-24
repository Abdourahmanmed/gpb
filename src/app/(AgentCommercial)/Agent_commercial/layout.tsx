import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  const data = [
    {
      title: "Tableau de bord",
      url: "/Agent_commercial/Dashbord",
      icon: "LayoutDashboard",
      RoleName: {
        Prefix: "",
        Suffix: "Commercial",
      },
    },
    {
      title: "Les abonnés",
      url: "/Agent_commercial/Les_abonnes",
      icon: "Clipboard",
      RoleName: {
        Prefix: "Agent",
        Suffix: "Commercial",
      },
    },
    {
      title: "Liste des boîtes postales",
      url: "/Agent_commercial/Liste_Boite_postal",
      icon: "Cuboid",
      RoleName: {
        Prefix: "Agent",
        Suffix: "Commercial",
      },
    },
    {
      title: "Résiliations",
      url: "/Agent_commercial/Resiliation",
      icon: "UserX",
      RoleName: {
        Prefix: "Agent",
        Suffix: "Commercial",
      },
    },
    // {
    //   title: "Récapitulatif des boîtes",
    //   url: "/Agent_commercial/Recaputilation/Rapport/Redevance",
    //   icon: "FolderPen",
    //   RoleName: {
    //     Prefix: "Agent",
    //     Suffix: "Commercial",
    //   },
    // },
    {
      title: "Récapitulation",
      url: "/Agent_commercial/Recaputilation",
      icon: "FolderPen",
      submenu: [
        {
          title: "Récapitulatif resilier",
          url: "/Agent_commercial/Recaputilation/Rapport/Resilier",
        },
        {
          title: "Rapport",
          url: "/Agent_commercial/Recaputilation/Rapport/Journalier",
        },
        // {
        //   title: "Récapitulatif mensuel",
        //   url: "/Agent_commercial/Recaputilation/Rapport/Mensuel",
        // },
        // {
        //   title: "Récapitulatif annuel",
        //   url: "/Agent_commercial/Recaputilation/Rapport/Annuel",
        // },
        // { title: "Récap achats de clé", url: "/Agent_commercial/Recaputilation/Rapport/Achat_cle" },
        // { title: "Récap sous couvert", url: "/Agent_commercial/Recaputilation/Rapport/Sous_couverte" },
        // { title: "Récap livraisons à domicile", url: "/Agent_commercial/Recaputilation/Rapport/Livraison" },
        // { title: "Récap collectes", url: "/Agent_commercial/Recaputilation/Rapport/Collection" },
      ],
      RoleName: {
        Prefix: "Agent du ",
        Suffix: "Commercial",
      },
    },
    {
      title: "Aide",
      url: "/Agent_commercial/help",
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
        <main className="w-[99%] bg-gris min-h-[calc(100vh-4.6rem)] rounded-lg overflow-hidden">
          <ScrollArea className="h-full w-full p-4">{children}</ScrollArea>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
