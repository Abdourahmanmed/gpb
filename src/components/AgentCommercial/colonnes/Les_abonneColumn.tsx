"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import Detail from "@/components/Detail"
import LVDCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/LivraiCellAction"
import ColectionCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/CollectionCelleAction"
import FactureCelleAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/FactureCellAction"
import ClientsCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/ClientsCellAction"

export type Les_abonnesCommerce = {
  id: number;
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
  abonnement_penalite: number;
  annee_abonnement: number;
  boite_postal_numero: string;
  nombre_sous_couverte: number;
  Adresse_Livraison: number;
  Adresse_Collection: number;
};

export const Les_abonneCommerceColumns: ColumnDef<Les_abonnesCommerce>[] = [
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
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Nom <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <p className="whitespace-normal break-words">
        <strong>{row.original.Nom}</strong>
      </p>
    ),
  },
  {
    accessorKey: "Email",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Email <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "Adresse",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Adresse <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "TypeClient",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Client <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "Telephone",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Telephone <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "boite_postal_numero",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        N° Boîte Postale <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <p className="whitespace-normal break-words">
        <strong>{row.original.boite_postal_numero}</strong>
      </p>
    ),
  },
  {
    accessorKey: "annee_abonnement",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Année Abonnement <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <p className="whitespace-normal break-words">
        <strong>{row.original.annee_abonnement}</strong>
      </p>
    ),
  },
  {
    accessorKey: "abonnement_status",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        État Abonnement <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <p className="whitespace-normal break-words">
        <strong>{row.original.abonnement_status}</strong>
      </p>
    ),
  },
  {
    accessorKey: "nombre_sous_couverte",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Nombre sous couverte <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <ClientsCellAction
        Nbr={row.original?.nombre_sous_couverte}
        Clients={row.original?.id}
        Nom={row.original?.Nom}
      />
    ),
  },
  {
    accessorKey: "Adresse_Livraison",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Nombre Adresse livraison <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <LVDCellAction
        Nbr={row.original?.Adresse_Livraison}
        Clients={row.original?.id}
        Nom={row.original?.Nom}
      />
    ),
  },
  {
    accessorKey: "Adresse_Collection",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Nombre Adresse Collections <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <ColectionCellAction
        Nbr={row.original?.Adresse_Collection}
        Clients={row.original?.id}
        Nom={row.original?.Nom}
      />
    ),
  },
  {
    accessorKey: "abonnement_penalite",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Pénalités <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "Date_abonnement",
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer select-none text-primary font-bold flex items-center gap-2 flex-wrap"
      >
        Date Abonnement <ArrowUpDown className="h-4 w-4" />
      </span>
    ),
  },
  {
    header: "Facture",
  },
  {
    header: "Reçue",
    cell: ({ row }) => (
      <FactureCelleAction
        Name="Reçue"
        Clients={row.original?.id}
        Nom={row.original?.Nom}
      />
    ),
  },
]
