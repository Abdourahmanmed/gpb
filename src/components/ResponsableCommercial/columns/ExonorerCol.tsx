"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";

import { useState } from "react";
import ColectionCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/CollectionCelleAction";
import LVDCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/LivraiCellAction";
import ClientsCellAction from "@/components/AgentGuiche/components/SubModelComponents/SuBCellActions/ClientsCellAction";
import { useSession } from "next-auth/react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Exonored = {
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

export const ExonorerColumns: ColumnDef<Exonored>[] = [
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
        header: "Abonnement",
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
    {
        accessorKey: "nombre_sous_couverte",
        header: "Nombre Sous Couvert",
        cell: ({ row }) => {

            return <ClientsCellAction Nbr={row.original?.nombre_sous_couverte} Clients={row.original?.id} Nom={row.original?.Nom} />
        },
    },
    {
        accessorKey: "Adresse_Livraison",
        header: "Nombre Adresse livraison",
        cell: ({ row }) => {
            return <LVDCellAction Nbr={row.original?.nombre_sous_couverte} Clients={row.original?.id} Nom={row.original?.Nom} />
        },
    },
    {
        accessorKey: "Adresse_Collection",
        header: "Nombre Adresse Collections",
        cell: ({ row }) => {
            return <ColectionCellAction Nbr={row.original?.nombre_sous_couverte} Clients={row.original?.id} Nom={row.original?.Nom} />
        },
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
            const client = row.original;
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const { data: session } = useSession();
            const handleExonorer = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault(); // Correction de la faute de frappe
                const apiUrl = `http://192.168.0.15/gbp_backend/api.php?method=ExonorerClients&idClient=${client?.id}&iduser=${session?.user?.id}`;
                try {
                    const response = await fetch(apiUrl, {
                        method: "POST",
                    });

                    const responseData = await response.json();

                    if (!response.ok || responseData.error) {
                        toast.error(responseData.error || "Network error detected.");
                    }

                    toast.success(responseData?.success);
                } catch (error) {
                    console.error(
                        "Erreur lors de la suppression de l'utilisateur :",
                        error
                    );
                }
            };

            return (
                <div>
                    <button
                        className="w-full bg-blue-500 text-white hover:bg-blue-500/90 hover:text-white duration-500 rounded-lg p-1"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        Exonorer
                    </button>
                    {/* Delete dialog */}
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                    >
                        <DialogContent className="bg-white">
                            <ToastContainer />
                            <DialogHeader>
                                <DialogTitle className="text-blue text-2xl mb-1 ml-[15%]">
                                    Exonorer un abonne
                                </DialogTitle>
                                <DialogDescription>

                                </DialogDescription>
                            </DialogHeader>
                            <form
                                className="w-full max-w-xs mx-auto"
                                onSubmit={(e) => {
                                    e.preventDefault(); // Empêche le rechargement de la page
                                    handleExonorer(e); // Remplacez "123" par l'id réel
                                }}
                            >
                                <h1> Etes-vous sure d&#39; exonorer ???</h1>
                                <div className="flex items-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-500/80 text-white font-bold py-2 px-4 rounded-[10px] w-full focus:outline-none focus:shadow-outline mt-4"
                                        type="submit"
                                    >
                                        Oui
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
