"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditAgentSchema } from "@/Schema/schema"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import { updateAgent } from "@/Store/Slices/AgentManagement"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Agents = {
    id: string;
    Nom: string;
    Email: string;
    Telephone: string;
    Adresse: string;
    password: string;
    Role: string;
};

export const AgentsColumns: ColumnDef<Agents>[] = [
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
            )
        },
    },
    {
        accessorKey: "Email",
        header: "Email",
    },
    {
        accessorKey: "Telephone",
        header: "Telephone",
    },
    {
        accessorKey: "Adresse",
        header: "Adresse",
    },
    {
        accessorKey: "Role",
        header: "Role",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
            // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
            const dispatch = useDispatch<AppDispatch>();
            const [isPending, setIsPending] = useState(false);
            const form = useForm<z.infer<typeof EditAgentSchema>>({
                resolver: zodResolver(EditAgentSchema),
                defaultValues: {
                    Nom: '',
                    Email: '',
                    password: '',
                    Telephone: '',
                    Adresse: '',
                    Role: '',
                },
            });
            // Fonction pour éditer les informations du compagne
            const onEditSubmit = async (values: z.infer<typeof EditAgentSchema>) => {
                const api = `http://192.168.0.15/gbp_backend/api.php?method=UpdateAgentByResponsable&id=${user?.id}`;
                console.log(values)
                try {
                    const response = await fetch(api, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(`Erreur lors de la mise à jour : ${response.statusText}`);
                    }

                    if (data?.error) {
                        toast.error(data?.error);
                    }
                    const agents = {
                        ...values,
                        id: user?.id
                    }
                    toast.success(data?.success);
                    dispatch(updateAgent(agents))
                    // Ajoute ici une logique pour mettre à jour l'UI après modification (ex: recharger les données)
                } catch (error) {
                    console.error("Erreur lors de la mise à jour :", error);
                }
            };


            //fonction pour recupere les information d'un compagne par son id 
            const fetchUser = async (id: string) => {
                const apiUrl = `http://192.168.0.15/gbp_backend/api.php?method=GetUsersById&id=${id}`;
                try {
                    const response = await fetch(apiUrl, {
                        method: "GET",
                    });

                    const responseData = await response.json();

                    if (!response.ok || responseData.error) {
                        toast.error(responseData.error || "Network error detected.");
                    } else {
                        // Set form default values with the fetched data
                        form.setValue("Nom", responseData.Nom);
                        form.setValue("Email", responseData.Email);
                        form.setValue("password", responseData.password);
                        form.setValue("Telephone", responseData.Telephone);
                        form.setValue("Adresse", responseData.Adresse);
                        form.setValue("Role", responseData.Role);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            // const handleDeleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
            //     e.preventDefault(); // Correction de la faute de frappe
            //     const apiUrl = `http://localhost/gbp_backend/api.php?method=DeleteUser&id=${user?.id}`;
            //     console.log(user?.id)
            //     try {
            //         const response = await fetch(apiUrl, {
            //             method: "DELETE",
            //         });

            //         const responseData = await response.json();

            //         if (!response.ok || responseData.error) {
            //             toast.error(responseData.error || "Network error detected.");
            //         }

            //         toast.success(responseData?.success);

            //     } catch (error) {
            //         console.error("Erreur lors de la suppression de l'utilisateur :", error);
            //     }
            // };

            //appeller la fonction fetchCompagne ici
            useEffect(() => {
                if (user.id) {
                    fetchUser(user.id);
                }
            }, [user.id]); // Fetch data when the dialog is opened

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis className="" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button
                                    className="w-full bg-blue-700 text-white hover:bg-blue-500 duration-500 rounded-lg p-1"
                                    onClick={() => setIsEditDialogOpen(true)}
                                >
                                    Editer
                                </button>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                <button
                                    className="w-full bg-red-500 text-blanc hover:bg-red-500/90 hover:text-blanc duration-500 rounded-lg p-1"
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                >
                                    Supprimer
                                </button>
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit dialog */}
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogContent className="bg-white">
                            <ToastContainer />
                            <DialogHeader>
                                <DialogTitle className="text-blue text-2xl mb-1 ml-[15%]">Editer un utilisateur</DialogTitle>
                                <DialogDescription >
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onEditSubmit)} className="w-full max-w-xs mx-auto">
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="Nom"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-blue">Nom</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="example:fatouma" type="text" disabled={isPending} className="text-blue font-bold" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-blue">Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="fatouma@example.com" type="email" disabled={isPending} className="text-blue font-bold" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-blue">password</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="***********" type="password" disabled={isPending} className="text-blue font-bold" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Telephone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-blue">Telephone</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="example:77101010" type="text" disabled={isPending} className="text-blue font-bold" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Adresse"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-blue">Adresse</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="example:quartier 1" type="text" disabled={isPending} className="text-blue font-bold" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="Role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-blue">Adresse</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Choisissez une méthode" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="agent_commercial">agent commerciale</SelectItem>
                                                                <SelectItem value="agent_guichet">agent guichets</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full mt-2 bg-blue-700 text-white" disabled={isPending}>Enregistrer</Button>
                                </form>

                            </Form>
                        </DialogContent>
                    </Dialog>

                    {/* Delete dialog */}
                    {/* <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogContent className="bg-white">
                        <ToastContainer />
                            <DialogHeader>
                                <DialogTitle className="text-blue text-2xl mb-1 ml-[15%]">Supprimer un utilisateur</DialogTitle>
                                <DialogDescription>
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
                                        className="bg-red-500 hover:bg-red-500/80 text-white font-bold py-2 px-4 rounded-[10px] w-full focus:outline-none focus:shadow-outline mt-4"
                                        type="submit"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog> */}
                </div>
            );
        },
    },
]
