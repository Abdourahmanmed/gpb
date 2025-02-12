"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import AchatCleColAction from "@/components/ActionCellColumns/AchatCleColAction";
import { Badge } from "@/components/ui/badge";
import Detail from "@/components/Detail";
import ImprimerClientFacture from "@/components/ImprimerFacture";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DetailType = {
    id: number;
    categorie: string;
    montant: string;
    methode_payment: string;
    type_wallet: string | null;
    numero_wallet: string;
    numero_cheque?: string;
    nom_banque?: string;
    reference: string;
};



export const DetailsColumns: ColumnDef<DetailType>[] = [
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
        accessorKey: "categorie",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                categorie <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "montant",
        header: "Montant",
    },
    {
        accessorKey: "methode_payment",
        header: "Methode payment",
    },
    {
        accessorKey: "type_wallet",
        header: "Type wallet",
    },
    {
        accessorKey: "numero_wallet",
        header: "Numero Wallet",
    },
    {
        accessorKey: "numero_cheque",
        header: "Numero Cheque",
    },
    {
        accessorKey: "nom_banque",
        header: "Bank",
    },
    {
        accessorKey: "reference",
        header: "Reference",
        cell: ({ row }) => {
            const ClientFacture = row?.original
      
            return <ImprimerClientFacture ClientFacture={ClientFacture} />;
          },
    },
];
