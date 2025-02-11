"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Les_abonnes = {
  id: string;
  Nom: string;
  Adresse: string;
  TypeClient: string;
  NBp: string;
  Type_boite_postale: string;
  Telephone: string;
  annee_abonnement: string;
  Paiement_Type: string;
  Penalites: string;
  Montant_Redevance: string;
  Methode_Paiement: string;
  Reference_General: string;
  Date_Paiement: string;
  Etat: string;
  sous_couvert: string;
  Document_Type: string;
  Patente_Quitance: string;
  Identite_Gerant: string;
  Abonnement_Unique: string;
  Document_Created_At: string;
  Paiement_Categories: string;
  Paiement_Montants: string;
  Paiement_Methodes: string;
  Type_Wallets: string;
  Numero_Wallets: string;
  Numero_Cheques: string;
  Nom_Banques: string;
  Paiement_References: string;
};

export const Les_abonneColumns: ColumnDef<Les_abonnes>[] = [
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
    accessorKey: "Adresse",
    header: "Adresse",
  },
  {
    accessorKey: "TypeClient",
    header: "Type Client",
  },
  {
    accessorKey: "NBp",
    header: "N° Boite Postale",
  },
  {
    accessorKey: "Type_boite_postale",
    header: "Type Boîte Postale",
  },
  {
    accessorKey: "Telephone",
    header: "Téléphone",
  },
  {
    accessorKey: "annee_abonnement",
    header: "Année Abonnement",
  },
  {
    accessorKey: "Etat",
    header: "État Abonnement",
  },
  {
    accessorKey: "sous_couvert",
    header: "Sous Couvert",
  },
  {
    accessorKey: "Document_Type",
    header: "Type Document",
  },
  {
    accessorKey: "Patente_Quitance",
    header: "Patente Quitance",
  },
  {
    accessorKey: "Identite_Gerant",
    header: "Identité Gérant",
  },
  {
    accessorKey: "Abonnement_Unique",
    header: "Abonnement Unique",
  },
  {
    accessorKey: "Paiement_Type",
    header: "Type Paiement",
  },
  {
    accessorKey: "Penalites",
    header: "Pénalités",
  },
  {
    accessorKey: "Montant_Redevance",
    header: "Montant Redevance",
  },
  {
    accessorKey: "Methode_Paiement",
    header: "Méthode Paiement",
  },
  {
    accessorKey: "Reference_General",
    header: "Référence Générale",
  },
  {
    accessorKey: "Date_Paiement",
    header: "Date Paiement",
  },

  // ✅ Décomposition des paiements
  {
    accessorKey: "Paiement_Categories",
    header: "Catégories Paiement",
    cell: ({ row }) => (
      <div>
        {row.original.Paiement_Categories?.split(", ").map(
          (categorie, index) => (
            <p key={index} className="text-sm text-gray-600">
              {categorie}
            </p>
          )
        )}
      </div>
    ),
  },
  {
    accessorKey: "Paiement_Montants",
    header: "Montants Paiement",
    cell: ({ row }) => (
      <div>
        {row.original.Paiement_Montants?.split(", ").map((montant, index) => (
          <p key={index} className="text-sm text-gray-600">
            {montant} DH
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Paiement_Methodes",
    header: "Méthodes Paiement",
    cell: ({ row }) => (
      <div>
        {row.original.Paiement_Methodes?.split(", ").map((methode, index) => (
          <p key={index} className="text-sm text-gray-600">
            {methode}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Type_Wallets",
    header: "Types Wallet",
    cell: ({ row }) => (
      <div>
        {row.original.Type_Wallets?.split(", ").map((wallet, index) => (
          <p key={index} className="text-sm text-gray-600">
            {wallet}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Numero_Wallets",
    header: "Numéros Wallet",
    cell: ({ row }) => (
      <div>
        {row.original.Numero_Wallets?.split(", ").map((numero, index) => (
          <p key={index} className="text-sm text-gray-600">
            {numero}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Numero_Cheques",
    header: "Numéros Chèques",
    cell: ({ row }) => (
      <div>
        {row.original.Numero_Cheques?.split(", ").map((cheque, index) => (
          <p key={index} className="text-sm text-gray-600">
            {cheque}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Nom_Banques",
    header: "Banques",
    cell: ({ row }) => (
      <div>
        {row.original.Nom_Banques?.split(", ").map((banque, index) => (
          <p key={index} className="text-sm text-gray-600">
            {banque}
          </p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Paiement_References",
    header: "Références Paiement",
    cell: ({ row }) => (
      <div>
        {row.original.Paiement_References?.split(", ").map(
          (reference, index) => (
            <p key={index} className="text-sm text-gray-600">
              {reference}
            </p>
          )
        )}
      </div>
    ),
  },
];
