"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import AchatCleColAction from "@/components/ActionCellColumns/AchatCleColAction";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Achat_Cle = {
  id: string;
  Nom: string;
  Email: string;
  Adresse: string;
  TypeClient: string;
  Telephone: string;
  Id_boite_postale: number;
  Date_abonnement: string;
  id_user: number;
  updated_by: number;
  abonnement_status: string;
  abonnement_penalite: string;
  Annee_abonnement: number;
  boite_postal_numero: string;
  nombre_sous_couverte: number;
  Adresse_Livraison: number;
  Adresse_Collection: number;
};



export const Achat_CleColumns: ColumnDef<Achat_Cle>[] = [
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
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "Adresse",
    header: "Adresse",
  },
  {
    accessorKey: "TypeClient",
    header: "Client",
  },
  {
    accessorKey: "Telephone",
    header: "Téléphone",
  },
  {
    accessorKey: "Id_boite_postale",
    header: "ID Boîte Postale",
  },
  {
    accessorKey: "boite_postal_numero",
    header: "N° Boîte Postale",
  },
  {
    accessorKey: "Annee_abonnement",
    header: "Année Abonnement",
  },
  {
    accessorKey: "abonnement_status",
    header: "État Abonnement",
    cell: ({ row }) => (
      <p>
        {row.original.abonnement_status}
      </p>
    ),
  },
  {
    accessorKey: "nombre_sous_couverte",
    header: "Nombre Sous Couvert",
  },
  {
    accessorKey: "Adresse_Livraison",
    header: "Nombre Adresse livraison",
  },
  {
    accessorKey: "Adresse_Collection",
    header: "Nombre Adresse Collections",
  },
  {
    accessorKey: "abonnement_penalite",
    header: "Pénalités",
  },
  {
    accessorKey: "Date_abonnement",
    header: "Date Abonnement",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const ClientId = row?.original?.id;
      const TypeClient = row?.original?.TypeClient;

      return <AchatCleColAction ClientId={ClientId} TypeClient={TypeClient} />;
    },
  },
];
