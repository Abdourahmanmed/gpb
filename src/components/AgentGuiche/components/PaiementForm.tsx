"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MontantSaiasiSchema, PaiementSchema } from "@/Schema/schema";
import Image from "next/image";
import { GetLastReferenceOfRdv } from "@/actions/All_references/GetLastReferenceOfRdv";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify
import { ChangementRdvPaiement } from "@/actions/paiement/RdvPaiement";

// Typages
type MethodePaiement = "cheque" | "cash" | "wallet";
type WalletOptions = "cac_pay" | "waafi" | "d_money" | "dahabplaces" | "sabapay";


// Typage du formulaire
type PaiementFormValues = z.infer<typeof PaiementSchema>;
type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;
interface PaymentFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    UserId: string,
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ isOpen, setIsOpen, UserId }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MethodePaiement | undefined>(undefined);
    const [donnees, setDonnees] = useState<PaiementFormValues | null>(null);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null);

    // État pour gérer l'incrément du numéro
    const [currentNumber] = useState(1);
    const [recueNumber, setRecueNumber] = useState('');

    useEffect(() => {
        const fetchLastReference = async () => {
            try {
                // Récupérer la dernière référence depuis la base de données
                const lastReference = await GetLastReferenceOfRdv();

                // Générer la date actuelle
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0]; // Format AAAA-MM-JJ
                const anneeActuelle = currentDate.getFullYear();

                if (!lastReference) {
                    // Si aucune référence n'existe, générer un nouveau numéro
                    const paddedNumber = String(currentNumber).padStart(5, '0');
                    const newRecueNumber = `RNBP/${paddedNumber}/${formattedDate}`;
                    setRecueNumber(newRecueNumber);
                } else {
                    // Si une référence existe, analyser les données
                    const lastReferenceParts = lastReference.split("/");
                    const lastReferenceDate = lastReferenceParts.pop();
                    const lastReferenceYear = lastReferenceDate.split('-')[0];
                    const middleNumber = lastReferenceParts[1];

                    if (lastReferenceYear !== anneeActuelle.toString()) {
                        // Si l'année est différente, recommencer avec le numéro initial
                        const paddedNumber = String(currentNumber).padStart(5, '0');
                        const newRecueNumber = `RNBP/${paddedNumber}/${formattedDate}`;
                        setRecueNumber(newRecueNumber);
                    } else {
                        // Si l'année est identique, incrémenter le numéro
                        const incrementee = (parseInt(middleNumber, 10) + 1).toString().padStart(5, '0');
                        const newRecueNumber = `RNBP/${incrementee}/${formattedDate}`;
                        setRecueNumber(newRecueNumber);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la référence :', error);
            }
        };

        fetchLastReference();

    }, [currentNumber]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Importer printJS uniquement côté client
            import("print-js").then((module) => {
                setPrintJS(() => module.default);
            });
        }
    }, []);


    const form = useForm<PaiementFormValues>({
        resolver: zodResolver(PaiementSchema),
        defaultValues: {
            Montant: 40000,
            Methode_de_paiement: undefined,
            Wallet: undefined,
            Numero_wallet: '',
            Numero_cheque: '',
            Nom_Banque: '',
            ReferenceId: '',
        },
    });
    const formMontantSaisi = useForm<MontantSaisi>({
        resolver: zodResolver(MontantSaiasiSchema),
        defaultValues: { montantSaisi: "" },
    });
    const onSubmit = (values: PaiementFormValues) => {
        try {
            // Assurez-vous que la référence est bien générée avant de continuer
            if (!recueNumber) {
                console.error("La référence n'est pas générée.");
                return;
            }
            // Ajouter la référence dans les données avant d'envoyer la requête
            const finalData = {
                ...values,
                ReferenceId: recueNumber,  // Assurez-vous d'ajouter la valeur de recueNumber ici
            };

            // Logique d'enregistrement (par exemple, sauvegarde des données)
            console.log("Données soumises :", finalData);
            console.log(recueNumber);

            // Met à jour les états nécessaires
            setDonnees(finalData); // Sauvegarde les valeurs dans un état
            setIsSummaryOpen(true); // Ouvre le résumé
            setIsOpen(false); // Ferme le formulaire
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
        }
    };

    const handlePayer = async (value: MontantSaisi) => {
        if (parseInt(value.montantSaisi) !== donnees?.Montant) {
            toast.error(`Le montant saisi doit être exactement ${donnees?.Montant} DJF.`);
            return;
        }

        try {
            const enregistrement = await ChangementRdvPaiement(UserId, donnees);

            if (enregistrement?.success) {
                toast.success("Données enregistrées avec succès.");

                // Vérification que PrintJS est chargé et que le DOM est prêt
                if (PrintJS && printAreaRef.current) {
                    PrintJS({
                        printable: printAreaRef.current,
                        type: "html",
                        targetStyles: ["*"],
                    });
                }

                // Réinitialiser l'état après succès
                setIsSummaryOpen(false);
                form.reset();
            } else if (enregistrement?.error) {
                // Gestion des erreurs retournées par l'API
                toast.error(enregistrement.error || "Une erreur est survenue.");
            }
        } catch (error) {
            // Gestion des erreurs inattendues
            toast.error("Erreur lors de la communication avec le serveur.");
            console.log(error);
        }
    };

    return (
        <>
            {/* formulaire principal */}
            <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <DialogContent>
                    <div>
                        <DialogHeader>
                            <DialogTitle className="text-primary text-xl">Paiement du client</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="Montant"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Montant</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ReferenceId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reference</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={recueNumber} // Utilisation de la référence générée ici
                                                        readOnly // Rendre le champ en lecture seule si la référence ne doit pas être modifiable
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Methode_de_paiement"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Méthode de paiement</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value as MethodePaiement);
                                                            setSelectedPaymentMethod(value as MethodePaiement);
                                                            if (value !== "wallet") form.setValue("Wallet", undefined); // Reset Wallet if needed
                                                        }}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Choisissez une méthode de paiement" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cheque">Par Chèque</SelectItem>
                                                            <SelectItem value="cash">Par Cash</SelectItem>
                                                            <SelectItem value="wallet">Par Wallet</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {selectedPaymentMethod === "wallet" && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="Wallet"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Choisissez un wallet</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={(value) => field.onChange(value as WalletOptions)}
                                                                value={field.value}
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Sélectionnez un wallet" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="cac_pay">CAC Pay</SelectItem>
                                                                    <SelectItem value="waafi">Waafi</SelectItem>
                                                                    <SelectItem value="d_money">D-Money</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="Numero_wallet"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Telephone</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} value={field.value} placeholder="Entre le numéro ..." />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                    {selectedPaymentMethod === "cheque" && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="Numero_cheque"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cheque</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} value={field.value} placeholder="Entre le numéro ..." />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="Nom_Banque"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Banque</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} value={field.value} placeholder="Entre le Nom de la banque ..." />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="outline"
                                            className="bg-slate-500 text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Annuler
                                        </Button>
                                        <Button type="submit" className="bg-primary text-white">
                                            Enregistrer
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            {/* formuliare d'enregistrement */}
            <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
                <DialogContent className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
                    <ScrollArea className="max-h-[70vh] w-full">
                        <ToastContainer />
                        <DialogHeader className="border-b-2 pb-4 mb-6">
                            <DialogTitle className="text-2xl font-bold text-gray-800">Résumé des informations Redevence</DialogTitle>
                        </DialogHeader>

                        {/* Section à imprimer */}
                        <div id="print-area" ref={printAreaRef} className="rounded-md border  border-gray-300 p-4 flex flex-col items-center w-full">
                            <div className="flex items-center gap">
                                {/* Logo à gauche */}
                                <div className="w-max h-max rounded-full flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/logoposte.png"
                                        alt="Logo"
                                        width={100} // Largeur de 64px
                                        height={100} // Hauteur de 64px
                                        className="object-cover"
                                    />
                                </div>

                                {/* Texte principal */}
                                <div className="flex-1 text-center">
                                    <div className="text-lg font-bold">
                                        REPUBLIQUE DE DJIBOUTI
                                    </div>
                                    <div className="text-sm italic my-1">
                                        Unité - Égalité - Paix
                                    </div>
                                    <div className="text-sm uppercase my-1">
                                        MINISTÈRE DE LA COMMUNICATION, CHARGÉ DES POSTES ET DES TÉLÉCOMMUNICATIONS
                                    </div>
                                    <div className="text-blue-500 font-bold mt-4 text-lg">
                                        LA POSTE DE DJIBOUTI S.A
                                    </div>
                                    <div className="text-sm uppercase">
                                        DIRECTION COMMERCIALE
                                    </div>
                                </div>
                            </div>
                            {donnees && (
                                <div className="h-max w-full p-4 ">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Reçue du paiement Redevence</h1>
                                    {/* Numéro de reçu */}
                                    <div className="mt-4 text-xl py-4 font-semibold">
                                        <span>Numéro de reçu : </span>
                                        <span className="text-blue-700">{recueNumber}</span>
                                    </div>
                                    <div className="space-y-6">
                                        {/* Méthode de Paiement */}
                                        <div className="space-y-2">
                                            <div className="text-lg font-semibold text-gray-700">
                                                <strong>Méthode de paiement :</strong> {donnees.Methode_de_paiement}
                                                {donnees.ReferenceId}
                                            </div>
                                            {donnees.Wallet ? (
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
                                                    <div className="text-sm text-gray-800">
                                                        <strong>Wallet :</strong> {donnees.Wallet}
                                                    </div>
                                                    <div className="text-sm text-gray-800">
                                                        <strong>Telephone :</strong> {donnees.Numero_wallet}
                                                    </div>
                                                    <div className="text-sm text-gray-800">
                                                        <strong>Montant :</strong> {donnees.Montant}  Djf
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
                                                    {donnees?.Methode_de_paiement === "cheque" && (
                                                        <>
                                                            <div className="text-sm text-gray-800">
                                                                <strong>Cheque :</strong> {donnees.Numero_cheque}
                                                            </div>
                                                            <div className="text-sm text-gray-800">
                                                                <strong>Banque :</strong> {donnees.Nom_Banque}
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className="text-sm text-gray-800">
                                                        <strong>Montant :</strong> {donnees.Montant} Djf
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Formulaire de Paiement */}
                        <Form {...formMontantSaisi}>
                            <form onSubmit={formMontantSaisi.handleSubmit(handlePayer)} className="mt-6 flex gap-8 flex-col">
                                <FormField
                                    control={formMontantSaisi.control}
                                    name="montantSaisi"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Entrer le montant</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Saisir le montant total"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                                >
                                    Payer et Imprimer
                                </Button>
                            </form>
                        </Form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};
