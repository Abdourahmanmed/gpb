import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Sous_couvert = {
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
    Nom_societe: string;
    Nom_personne: string;
    abonnement_status: string;
    Agent: string;
    abonnement_penalite: string;
    annee_abonnement: number;
};

export const SCouvertClientColumns: ColumnDef<Sous_couvert>[] = [
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
    { accessorKey: "id_user", header: "ID Utilisateur" },
    { accessorKey: "updated_by", header: "Mis à jour par" },
    { accessorKey: "Nom_societe", header: "Nom Société" },
    { accessorKey: "Nom_personne", header: "Nom Personne" },
    { accessorKey: "abonnement_status", header: "Statut Abonnement" },
    { accessorKey: "abonnement_penalite", header: "Pénalité Abonnement" },
    {
        accessorKey: "Agent",
        header: "Creer par",
    },
];
