"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { ResilierForm } from "@/components/AgentGuiche/components/ResilierDialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ResilierClient = {
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

export const ResilierClientColumns: ColumnDef<ResilierClient>[] = [
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
                    Nom Du client
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false);

            return (
                <div>
                    <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                        Resilier
                    </Button>
                    <ResilierForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
                </div>
            );
        },
    }

]
