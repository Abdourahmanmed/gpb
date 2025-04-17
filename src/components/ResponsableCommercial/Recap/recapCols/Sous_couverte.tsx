"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import FactureCelleAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/FactureCellAction";


export type RSousCouverte = {
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
    Annee_abonnement: number;
    boite_postal_numero: string;
    nombre_sous_couverte: number;
    Adresse_Livraison: number;
    Adresse_Collection: number;
};

export const RecapSccols: ColumnDef<RSousCouverte>[] = [
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
        accessorKey: "boite_postal_numero",
        header: "N° Boîte Postale",
    },
    {
        accessorKey: "annee_abonnement",
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
    // {
    //     accessorKey: "nombre_sous_couverte",
    //     header: "Nombre Sous Couvert",
    //     cell: ({ row }) => {

    //         return <ClientsCellAction Nbr={row.original?.nombre_sous_couverte} Clients={row.original?.id} Nom={row.original?.Nom} />
    //     },
    // },
    // {
    //     accessorKey: "Adresse_Livraison",
    //     header: "Nombre Adresse livraison",
    //     cell: ({ row }) => {
    //         return <LVDCellAction Nbr={row.original?.nombre_sous_couverte} Clients={row.original?.id} Nom={row.original?.Nom} />
    //     },
    // },
    // {
    //     accessorKey: "Adresse_Collection",
    //     header: "Nombre Adresse Collections",
    //     cell: ({ row }) => {
    //         return <ColectionCellAction Nbr={row.original?.nombre_sous_couverte} Clients={row.original?.id} Nom={row.original?.Nom} />
    //     },
    // },
    {
        accessorKey: "abonnement_penalite",
        header: "Pénalités",
    },
    {
        accessorKey: "Date_abonnement",
        header: "Date Abonnement",
    },
    {
        header: "Facture",
    },
    {
        header: "Reçue",
        cell: ({ row }) => {
            return <FactureCelleAction Name="Reçue" Clients={row.original?.id} Nom={row.original?.Nom} />
        },
    },

];
