import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
export type AchatCle = {
    id: string,
    Nom: string,
    Email: string,
    Adresse: string,
    TypeClient: string,
    Telephone: string,
    Id_boite_postale: string,
    Date_abonnement: string,
    id_user: string,
    updated_by: string,
    abonnement_status: string,
    Agent: string,
    abonnement_penalite: string,
    annee_abonnement: string,
    Date: string
};

export const CleClientColumns: ColumnDef<AchatCle>[] = [
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
                Nom
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    { accessorKey: "Email", header: "Email" },
    { accessorKey: "Adresse", header: "Adresse" },
    { accessorKey: "TypeClient", header: "Type de Client" },
    { accessorKey: "Telephone", header: "Téléphone" },
    { accessorKey: "Id_boite_postale", header: "ID Boîte Postale" },
    { accessorKey: "Date_abonnement", header: "Date Abonnement" },
    { accessorKey: "abonnement_status", header: "Statut Abonnement" },
    { accessorKey: "abonnement_penalite", header: "Pénalité Abonnement" },
    { accessorKey: "annee_abonnement", header: "Année Abonnement" },
    { accessorKey: "Date", header: "Date" },
    {
        accessorKey: "Agent",
        header: "Creer par",
    },
];
