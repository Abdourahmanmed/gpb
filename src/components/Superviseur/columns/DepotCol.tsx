"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import DepotColAction from "@/components/ActionCellColumns/depotColAction"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DepotType = {
    id: string;
    Nom: string;
    NBp: string;
    Etat: string;
    Telephone: string;
    Redevance: string;
    sous_couvert: string;
    Domocile: string;
    Date_abonnement: string;
    Adresse: string;
    TypeClient: string;
    Type_boite_postale: string;
};

export const DepotColumns: ColumnDef<DepotType>[] = [
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "NBp",
        header: "N°Boite Postal",
    },
    {
        accessorKey: "Etat",
        header: "Etat",
    },
    {
        accessorKey: "Telephone",
        header: "Telephone",
    },
    {
        accessorKey: "Redevance",
        header: "Redevance",
    },
    {
        accessorKey: "sous_couvert",
        header: "sous couvert",
    },
    {
        accessorKey: "Domocile",
        header: "Livraison à Domocile",
    },
    {
        accessorKey: "Date_abonnement",
        header: "Date abonnement",
    },
    {
        accessorKey: "Type_boite_postale",
        header: "Type boite postale",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const userId = row?.original?.id;
            return <DepotColAction userId={userId} />
        },
    }

]
