"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Repport = {
  id: string; // ton backend renvoie 3982, donc number
  Facture: string;
  Nom: string;
  boite_postal_numero: string;
  derniere_annee_payee: string;
  sc: string;
  ldc: string;
  penaliter: string;
  Achatcle: string;
  changementNom: string;
};

export const RepportCoulmns: ColumnDef<Repport>[] = [
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
    accessorKey: "Facture",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        N°Reçue <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "Nom",
    header: "Client",
  },
  {
    accessorKey: "boite_postal_numero",
    header: "Numero boite postale",
  },
  {
    accessorKey: "derniere_annee_payee",
    header: "Redevance",
  },
  {
    accessorKey: "sc",
    header: "sous couvert",
  },
  {
    accessorKey: "ldc",
    header: "Livraison à domicile",
  },
  {
    accessorKey: "Achatcle",
    header: "Achat cle",
  },
  {
    accessorKey: "changementNom",
    header: "Changement Nom",
  },
];
