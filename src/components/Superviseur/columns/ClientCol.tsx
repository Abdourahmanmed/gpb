"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Detail from "@/components/Detail";

export type ClientType = {
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

export const ClientColumns: ColumnDef<ClientType>[] = [
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
        cell: ({ row }) => (
            <p >
                {row.original.Etat}
            </p>
        ),
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
        header: "Patente/Quitance",
        cell: ({ row }) => {
            const FilePath = row.original.Patente_Quitance; // Récupère le chemin du fichier
            const fileUrl = FilePath
                ? `http://localhost/gbp_backend/${FilePath}`
                : null;

            return (
                <div className="flex justify-center">
                    {fileUrl ? (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Voir le document Patente/Quitance
                        </a>
                    ) : (
                        <span className="text-gray-500 italic">Aucun document</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "Identite_Gerant",
        header: "Identité",
        cell: ({ row }) => {
            const FilePath = row.original.Identite_Gerant; // Récupère le chemin du fichier
            const fileUrl = FilePath
                ? `http://localhost/gbp_backend/${FilePath}`
                : null;

            return (
                <div className="flex justify-center">
                    {fileUrl ? (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Voir le document Identité
                        </a>
                    ) : (
                        <span className="text-gray-500 italic">Aucun document</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "Abonnement_Unique",
        header: "Abonnement",
        cell: ({ row }) => {
            const FilePath = row.original.Abonnement_Unique; // Récupère le chemin du fichier
            const fileUrl = FilePath
                ? `http://localhost/gbp_backend/${FilePath}`
                : null;

            return (
                <div className="flex justify-center">
                    {fileUrl ? (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Voir le document Abonnement
                        </a>
                    ) : (
                        <span className="text-gray-500 italic">Aucun document</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "Penalites",
        header: "Pénalités",
        cell: ({ row }) => {
            const idClient = row?.original?.id;
            const nom = row?.original?.Nom;
            return <Detail IdClient={idClient} Nom={nom} />; // Retourner le composant ici
        },
    },
    {
        accessorKey: "Montant_Redevance",
        header: "Montant Redevance",
    },

    {
        accessorKey: "Reference_General",
        header: "Référence Générale",
    },
    {
        accessorKey: "Date_Paiement",
        header: "Date Paiement",
    },
    {
        header: "Detais du paiements",
        cell: ({ row }) => {
            const idClient = row?.original?.id;
            const nom = row?.original?.Nom;
            return <Detail IdClient={idClient} Nom={nom} />; // Retourner le composant ici
        },
    },];

