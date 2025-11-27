import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PaymentForm } from "../components/PaiementForm";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Detail from "@/components/Detail";

// Définir le type de Le_Paiement
export type Le_Paiement = {
  id: number; // ton backend renvoie 3982, donc number
  Nom: string;
  Email: string;
  Adresse: string | null;
  TypeClient: string;
  Telephone: string;
  Id_boite_postale: number;
  Date_abonnement: string;
  etat_actuel: string;
  id_user: number;
  updated_by: number | null;
  abonnement_status: string;
  abonnement_penalite: string; // c'est une string "0.00"
  derniere_annee_payee: number;
  derniere_annee_abonnement: number;
  boite_postal_numero: string;
  boite_postal_type: string;
  nombre_sous_couverte: number;
  Adresse_Livraison: number;
  Adresse_Collection: number;
};

export const Le_PaiementColumns: ColumnDef<Le_Paiement>[] = [
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
  // {
  //   accessorKey: "Email",
  //   header: "Email",
  // },
  // {
  //   accessorKey: "Adresse",
  //   header: "Adresse",
  // },
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
    accessorKey: "boite_postal_type",
    header: "Type de boite",
  },
  {
    accessorKey: "derniere_annee_abonnement",
    header: "Année Abonnement",
  },
  {
    accessorKey: "abonnement_status",
    header: "État Abonnement",
    cell: ({ row }) => <p>{row.original.etat_actuel}</p>,
  },
  {
    accessorKey: "nombre_sous_couverte",
    header: "Sous Couvert",
  },
  {
    accessorKey: "Adresse_Livraison",
    header: "livraison",
  },
  {
    accessorKey: "Adresse_Collection",
    header: "Collect",
  },
  {
    accessorKey: "abonnement_penalite",
    header: "Pénalités",
  },
  {
    accessorKey: "Date_abonnement",
    header: "Date Abonnement",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const dataClient = {
        ClientId: row?.original?.id,
        TypeClient: row?.original?.TypeClient,
        NBP: row?.original?.boite_postal_numero,
        TypeBp: row?.original?.boite_postal_type,
        Redevance: row?.original?.derniere_annee_abonnement,
        Nom: row?.original?.Nom,
        Penaliter: row?.original?.abonnement_penalite,
      };
      const Status = row?.original?.etat_actuel;

      if (Status == "impayé") {
        return (
          <div>
            <Button
              className="bg-primary"
              onClick={() => setIsDialogOpen(true)}
            >
              Paiement
            </Button>
            <PaymentForm
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              dataClient={dataClient}
            />
          </div>
        );
      }
    },
  },
];
