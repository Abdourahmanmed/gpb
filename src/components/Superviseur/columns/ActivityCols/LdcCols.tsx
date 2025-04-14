import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type Ldc = {
    id: string,
    Nom: string,
    Email: string,
    Adresse: string,
    Adresse_livraison: string,
    TypeClient: string,
    Telephone: string,
    Id_boite_postale: string,
    Date_abonnement: string,
    id_user: string,
    updated_by: string,
    abonnement_status: string,
    Agent: string,
    Date_creation: string,
    abonnement_penalite: string,
    annee_abonnement: string
};

export const LdcClientColumns: ColumnDef<Ldc>[] = [
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
                Nom du Client
                <ArrowUpDown className="ml-2 h-4 w-4" />
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
        header: "Type Client",
    },
    {
        accessorKey: "Telephone",
        header: "Telephone",
    },
    {
        accessorKey: "Date_abonnement",
        header: "Date abonnement",
    },
    {
        accessorKey: "abonnement_status",
        header: "Status",
    },
    {
        accessorKey: "abonnement_penalite",
        header: "penalite",
    },
    {
        accessorKey: "Adresse_livraison",
        header: "Adresse livraison",
    },
    {
        accessorKey: "annee_abonnement",
        header: "Abonnement",
    },
    {
        accessorKey: "Date_creation",
        header: "Date creation lvd",
    },
    {
        accessorKey: "Agent",
        header: "Creer par",
    },
];
