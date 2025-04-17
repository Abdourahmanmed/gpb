"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Detail from "@/components/Detail"
import LVDCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/LivraiCellAction"
import ColectionCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/CollectionCelleAction"
import FactureCelleAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/FactureCellAction"
import ClientsCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/ClientsCellAction"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Recaputilation = {
    id: number;
    Nom: string;
    Email: string;
    Adresse: string;
    TypeClient: string;
    Telephone: string;
    Id_boite_postale: number;
    Numero: number;
    Date_abonnement: string;
    id_user: number;
    updated_by: number;
    abonnement_status: string;
    abonnement_penalite: number;
    Annee_abonnement: number;
    boite_postal_numero: string;
    nombre_sous_couverte: number;
    Adresse_Livraison: string;
    Adresse_Collection: string;
    Id_client: number;
    Lettre_recommandation: string;
    Date_resilier: string;
    Resilier_by: number;
};


export const RecapReslierCol: ColumnDef<Recaputilation>[] = [
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
        header: "Nom",
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
        accessorKey: "Numero",
        header: "Numero boite postale",
    },
    {
        accessorKey: "Date_abonnement",
        header: "Date Abonnement",
    },
    {
        accessorKey: "Lettre_recommandation",
        header: "Lettre de Recommandation",
    },
    {
        accessorKey: "Date_resilier",
        header: "Date de Résiliation",
    },

];

