"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ChangedNameType = {
  id: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  client_adresse: string;
  montant_changement_nom: string;
  reference_changer_nom: string;
};

export const ChangedNameColumns: ColumnDef<ChangedNameType>[] = [
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
    accessorKey: "client_nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom abonner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "client_email",
    header: "Email",
  },
  {
    accessorKey: "client_telephone",
    header: "Telephone",
  },
  {
    accessorKey: "client_adresse",
    header: "Adresse",
  },
  {
    accessorKey: "montant_changement_nom",
    header: "Montant changement nom",
  },
  {
    accessorKey: "reference_changer_nom",
    header: "Numero facture",
  },
];
