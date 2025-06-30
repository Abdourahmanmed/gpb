import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type ActiveClient = {
    id: number;
    Nom: string;
    Email: string;
    Adresse: string;
    TypeClient: "Particulier" | "Entreprise"; // Enum possible
    Telephone: string;
    Id_boite_postale: number;
    Date_abonnement: string; // ISO string, à parser si besoin
    id_user: number;
    updated_by: number | null;
    abonnement_status: "paye" | "impaye" | string; // adapte selon les cas possibles
    Agent: string | null;
    abonnement_penalite: string; // Si tu veux le manipuler en nombre => change en number
    annee_abonnement: number;
    boite_postal_numero: string;
    nombre_sous_couverte: number;
    Adresse_Livraison: number;
    Adresse_Collection: number;
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
    { accessorKey: "Date_abonnement", header: "Date d'Abonnement" },
    { accessorKey: "id_user", header: "ID Utilisateur" },
    { accessorKey: "updated_by", header: "Mis à jour par" },
    { accessorKey: "abonnement_status", header: "Statut de l'Abonnement" },
    { accessorKey: "abonnement_penalite", header: "Pénalité Abonnement" },
    { accessorKey: "annee_abonnement", header: "Année d'Abonnement" },
    { accessorKey: "boite_postal_numero", header: "Numéro Boîte Postale" },
    { accessorKey: "nombre_sous_couverte", header: "Nombre de Sous-Couvertes" },
    { accessorKey: "Adresse_Livraison", header: "Adresse de Livraison" },
    { accessorKey: "Adresse_Collection", header: "Adresse de Collection" },
    {
        accessorKey: "Agent",
        header: "Creer par",
    },
];
