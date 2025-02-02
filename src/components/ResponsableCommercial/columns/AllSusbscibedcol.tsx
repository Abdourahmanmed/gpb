"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast, ToastContainer } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Subscribed = {
  id: string;
  Nom: string;
  NBp: string;
  Etat: string;
  Telephone: string;
  Redevance: string;
  sous_couvert: string;
  Domocile: string;
  Date_abonnement: string;
  Adresse: string;
  TypeClient: string;
  Type_boite_postale: string;
};

export const SubscribedColumns: ColumnDef<Subscribed>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "NBp",
    header: "N°Boite Postal",
  },
  {
    accessorKey: "Etat",
    header: "Etat",
  },
  {
    accessorKey: "Telephone",
    header: "Telephone",
  },
  {
    accessorKey: "Redevance",
    header: "Redevance",
  },
  {
    accessorKey: "sous_couvert",
    header: "sous couvert",
  },
  {
    accessorKey: "Domocile",
    header: "Livraison à Domocile",
  },
  {
    accessorKey: "Date_abonnement",
    header: "Date abonnement",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isPending, setIsPending] = useState(false);

      const handleDeleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Correction de la faute de frappe
        const apiUrl = `http://localhost/gbp_backend/api.php?method=DeleteUser&id=${user?.id}`;
        console.log(user?.id);
        // try {
        //   const response = await fetch(apiUrl, {
        //     method: "DELETE",
        //   });

        //   const responseData = await response.json();

        //   if (!response.ok || responseData.error) {
        //     toast.error(responseData.error || "Network error detected.");
        //   }

        //   toast.success(responseData?.success);
        // } catch (error) {
        //   console.error(
        //     "Erreur lors de la suppression de l'utilisateur :",
        //     error
        //   );
        // }
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  className="w-full bg-blue-500 text-blanc hover:bg-blue-500/90 hover:text-blanc duration-500 rounded-lg p-1"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Enlever le penaliter
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="bg-white">
              <ToastContainer />
              <DialogHeader>
                <DialogTitle className="text-blue text-2xl mb-1 ml-[15%]">
                  Enlever une penaliter à un abonne
                </DialogTitle>
                <DialogDescription>
                  etes-vous sure d'enlever ???
                </DialogDescription>
              </DialogHeader>
              <form
                className="w-full max-w-xs mx-auto"
                onSubmit={(e) => {
                  e.preventDefault(); // Empêche le rechargement de la page
                  handleDeleteUser(e); // Remplacez "123" par l'id réel
                }}
              >
                <h1>Voulez-vous vraiment supprimer ?</h1>
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
