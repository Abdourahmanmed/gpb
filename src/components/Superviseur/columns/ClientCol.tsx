"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import FactureCelleAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/FactureCellAction";
import ColectionCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/CollectionCelleAction";
import LVDCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/LivraiCellAction";
import ClientsCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/ClientsCellAction";
import UnpaidInvoice from "@/components/UnpaidInvoice";

export type ClientType = {
  id: number; // ton backend renvoie 3982, donc number
  Nom: string;
  Email: string;
  Adresse: string | null;
  TypeClient: string;
  Telephone: string;
  Id_boite_postale: number;
  Date_abonnement: string;
  boite_postal_type: string;
  etat_actuel: string;
  id_user: number;
  updated_by: number | null;
  abonnement_status: string;
  abonnement_penalite: string; // c'est une string "0.00"
  derniere_annee_payee: number;
  derniere_annee_abonnement: number;
  boite_postal_numero: string;
  nombre_sous_couverte: number;
  Adresse_Livraison: number;
  Adresse_Collection: number;
};

export const ClientColumns: ColumnDef<ClientType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Nom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nom <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  // {
  //     accessorKey: "Email",
  //     header: "Email",
  // },
  // {
  //     accessorKey: "Adresse",
  //     header: "Adresse",
  // },
  {
    accessorKey: "TypeClient",
    header: "Client",
  },
  {
    accessorKey: "Telephone",
    header: "Téléphone",
  },
  {
    accessorKey: "boite_postal_numero",
    header: "N° Boîte Postale",
  },
  {
    accessorKey: "derniere_annee_payee",
    header: "Abonnement",
  },
  {
    accessorKey: "abonnement_status",
    header: "Status de paiement",
    cell: ({ row }) => <p>{row.original.abonnement_status}</p>,
  },
  {
    accessorKey: "nombre_sous_couverte",
    header: "Sous Couvert",
    cell: ({ row }) => {
      return (
        <ClientsCellAction
          Nbr={row.original?.nombre_sous_couverte}
          Clients={row.original?.id}
          Nom={row.original?.Nom}
        />
      );
    },
  },
  {
    accessorKey: "Adresse_Livraison",
    header: "livraison",
    cell: ({ row }) => {
      return (
        <LVDCellAction
          Nbr={row.original?.Adresse_Livraison}
          Clients={row.original?.id}
          Nom={row.original?.Nom}
        />
      );
    },
  },
  {
    accessorKey: "Adresse_Collection",
    header: "Collect",
    cell: ({ row }) => {
      return (
        <ColectionCellAction
          Nbr={row.original?.Adresse_Collection}
          Clients={row.original?.id}
          Nom={row.original?.Nom}
        />
      );
    },
  },
  {
    accessorKey: "abonnement_penalite",
    header: "Pénalités",
  },
  {
    accessorKey: "Date_abonnement",
    header: "Date Abonnement",
  },
  // {
  //     header: "Facture",
  //     cell: ({ row }) => (
  //         <UnpaidInvoice
  //             Name="Facture"
  //             Clients={row.original?.id}
  //             Nom={row.original?.Nom}
  //         />
  //     ),
  // },
  {
    header: "Reçue",
    cell: ({ row }) => (
      <FactureCelleAction
        Name="Reçue"
        Clients={row.original?.id}
        Nom={row.original?.Nom}
        NBP={row.original?.boite_postal_numero}
        TypeBP={row.original?.boite_postal_type}
      />
    ),
  },
];
