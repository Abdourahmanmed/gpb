"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DemandeSchema } from "@/Schema/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSession } from "next-auth/react";

interface ChangeNameFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    ClientId: number;
    ClientName: string;
    NumeroBp: number;
    Etat: string;
}

export const ResilierForm: React.FC<ChangeNameFormProps> = ({ isOpen, setIsOpen, ClientId, ClientName, NumeroBp, Etat }) => {
    const { data: session } = useSession();
    const form = useForm<z.infer<typeof DemandeSchema>>({
        resolver: zodResolver(DemandeSchema),
        defaultValues: {
            lettreDemande: undefined, // ou `null`, car c'est un fichier
            nomDemandeur: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof DemandeSchema>) => {
        if (!session?.user?.id) {
            toast.error("L'ID de la session est introuvable !!");
            return;
        }

        if (!ClientId) {
            toast.error("L'ID du client est introuvable !!");
            return;
        }

        const formData = new FormData();
        formData.append("id_user", session.user.id.toString()); // ID utilisateur
        formData.append("id_client", ClientId.toString()); // ID client

        // Vérifier et ajouter le fichier si présent
        if (values.lettreDemande instanceof File) {
            formData.append("lettre_recommandation", values.lettreDemande);
        } else {
            toast.error("Veuillez sélectionner un fichier valide !");
            return;
        }

        try {
            const response = await fetch(`http://192.168.0.12/gbp_backend/api.php?method=ResilierClients&id=${session?.user?.id}&idClient=${ClientId}`, {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();
            if (!response.ok) {
                toast.error("Erreur d'excution !");
            } else {
                if(responseData?.error){
                    toast.error(responseData?.error);
                }
                toast.success(responseData?.success);
            }
        } catch (error) {
            toast.error("Erreur de connexion au serveur.");
            console.error("Erreur :", error);
        }
    };




    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent>
                <ToastContainer />
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl">Resiliation d&#39;un abonne</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <p className="text-xl">Vous voulez vraiment resilier ?</p>
                            <p className="text-md spase-y-2">Numero Boite Postal : <span className="font-semibold">{NumeroBp}</span></p>
                            <p className="text-md spase-y-2">Etat du Boite postale : <span className="font-semibold">{Etat}</span></p>
                            <div className="spase-y-2">
                                <FormField
                                    control={form.control}
                                    name="lettreDemande"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>La lettre de demande</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    onChange={(e) => field.onChange(e.target.files?.[0])} // Gère le fichier
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="spase-y-2">
                                <FormField
                                    control={form.control}
                                    name="nomDemandeur"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom du demandeur</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} value={ClientName} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    className="bg-slate-500 text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit" className="bg-red-500 text-white">
                                    Oui
                                </Button>
                            </div>
                        </form>
                    </Form>


                </div>
            </DialogContent>
        </Dialog>
    );
};
