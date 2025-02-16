import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type ActiveClient = {
    client_nom: string;
    utilisateur_nom: string;
    paiement_type: string;
    penalites: number;
    montant_redevence: number;
    methode_payment: string;
    reference_general: string;
    date_paiement: string;
    categorie: string;
    detail_montant: number;
    detail_methode: string;
    type_wallet: string | null;
    numero_wallet: string | null;
    numero_cheque: string | null;
    nom_banque: string | null;
    reference: string;
};

export const ActiveClientColumns: ColumnDef<ActiveClient>[] = [
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
        accessorKey: "utilisateur_nom",
        header: "creer par",
    },
    {
        accessorKey: "paiement_type",
        header: "Type de Paiement",
    },
    {
        accessorKey: "penalites",
        header: "Pénalités",
    },
    {
        accessorKey: "montant_redevence",
        header: "Montant Redevance",
    },
    {
        accessorKey: "methode_payment",
        header: "Méthode de Paiement",
    },
    {
        accessorKey: "reference_general",
        header: "Référence Générale",
    },
    {
        accessorKey: "date_paiement",
        header: "Date de Paiement",
    },
    {
        accessorKey: "categorie",
        header: "Catégorie",
    },
    {
        accessorKey: "detail_montant",
        header: "Montant Détail",
    },
    {
        accessorKey: "detail_methode",
        header: "Méthode Détail",
    },
    {
        accessorKey: "type_wallet",
        header: "Type Wallet",
    },
    {
        accessorKey: "numero_wallet",
        header: "Numéro Wallet",
    },
    {
        accessorKey: "numero_cheque",
        header: "Numéro Chèque",
    },
    {
        accessorKey: "nom_banque",
        header: "Nom Banque",
    },
    {
        accessorKey: "reference",
        header: "Référence",
    },
    
];
