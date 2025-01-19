"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MontantSaiasiSchema, SousCouvertSchema } from "@/Schema/schema";
import HeaderImprimary from "./HeaderImprimary";
import Imprimery from "./Imprimery";
import { GetLastReferenceOfSC } from "@/actions/All_references/GetLastReferenceOfSC";

type SousCouvertFormValues = z.infer<typeof SousCouvertSchema>;
type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;

interface SousCouverteFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SousCouverteForm: React.FC<SousCouverteFormProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const montantParSousCouverture = 30000;
    const [TotalMontant, setTotalMontant] = useState(montantParSousCouverture);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [donnees, setDonnees] = useState<SousCouvertFormValues | null>(null);

    // État pour gérer l'incrément du numéro
    const [currentNumber, setCurrentNumber] = useState(1);
    const [recueNumber, setRecueNumber] = useState('');

    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLastReference = async () => {
            try {
                // Récupérer la dernière référence depuis la base de données
                const lastReference = await GetLastReferenceOfSC();

                // Générer la date actuelle
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0]; // Format AAAA-MM-JJ
                const anneeActuelle = currentDate.getFullYear();

                if (!lastReference) {
                    // Si aucune référence n'existe, générer un nouveau numéro
                    const paddedNumber = String(currentNumber).padStart(5, '0');
                    const newRecueNumber = `AJSC/${paddedNumber}/${formattedDate}`;
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
                        const newRecueNumber = `AJSC/${paddedNumber}/${formattedDate}`;
                        setRecueNumber(newRecueNumber);
                    } else {
                        // Si l'année est identique, incrémenter le numéro
                        const incrementee = (parseInt(middleNumber, 10) + 1).toString().padStart(5, '0');
                        const newRecueNumber = `AJSC/${incrementee}/${formattedDate}`;
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

    // Fonction pour incrémenter le numéro de reçu
    const handleNewRecue = () => {
        setCurrentNumber((prev) => prev + 1);
    };

    const form = useForm<SousCouvertFormValues>({
        resolver: zodResolver(SousCouvertSchema),
        defaultValues: {
            sousCouvertures: [
                { societe: "", personne: "", adresse: "", telephone: "" },
            ],
            Methode_de_paiement: "",
            Wallet: undefined,
            Numero_wallet: "",
            Numero_cheque: "",
            Nom_Banque: "",
            totalMontant: TotalMontant
        },
    });

    const formMontantSaisi = useForm<MontantSaisi>({
        resolver: zodResolver(MontantSaiasiSchema),
        defaultValues: { montantSaisi: "" },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sousCouvertures",
    });

    const handleAdd = () => {
        append({ societe: "", personne: "", adresse: "", telephone: "" });
        setTotalMontant((prev) => prev + montantParSousCouverture);
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
            setTotalMontant((prev) => prev - montantParSousCouverture);
        }
    };

    const onSubmit = (values: SousCouvertFormValues) => {
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

    const handlePayer = (value: MontantSaisi) => {
        if (parseInt(value.montantSaisi) !== TotalMontant) {
            alert(`Le montant saisi doit être exactement ${TotalMontant} DJF.`);
            return;
        }

        if (PrintJS && printAreaRef.current) { // Vérification que PrintJS est chargé et que le DOM est prêt
            PrintJS({
                printable: printAreaRef.current,
                type: "html",
                targetStyles: ["*"],
            });
        }
        setIsSummaryOpen(false);
        form.reset();
        setTotalMontant(30000);
    };

    return (
        <>
            {/* Formulaire Principal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-primary text-xl">
                            Gestion des Sous-Couvertures
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="space-y-4 border-b pb-4">
                                        <h3 className="text-lg font-semibold">
                                            Sous-Couverture {index + 1}
                                        </h3>

                                        <FormField
                                            control={form.control}
                                            name={`sousCouvertures.${index}.societe`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nom de la société</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Exemple: Entreprise X" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`sousCouvertures.${index}.personne`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nom de la personne</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Exemple: John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`sousCouvertures.${index}.adresse`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Adresse</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Exemple: 123 rue Principale"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`sousCouvertures.${index}.telephone`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Numéro de téléphone</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Exemple: 0123456789"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {fields.length > 1 && (
                                            <Button
                                                variant="outline"
                                                onClick={() => handleRemove(index)}
                                                className="text-red-500"
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                    </div>
                                ))}

                                {fields.length < 5 && (
                                    <Button variant="outline" onClick={handleAdd} className="w-full">
                                        Ajouter une sous-couverture
                                    </Button>
                                )}

                                <FormField
                                    control={form.control}
                                    name="Methode_de_paiement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Méthode de paiement</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisissez une méthode" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cheque">Chèque</SelectItem>
                                                        <SelectItem value="cash">Cash</SelectItem>
                                                        <SelectItem value="wallet">Wallet</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.getValues("Methode_de_paiement") === "wallet" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="Wallet"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Choisir un Wallet</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Choisissez un wallet" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="cac pay">CAC Pay</SelectItem>
                                                                <SelectItem value="d-money">D-Money</SelectItem>
                                                                <SelectItem value="waafi">Waafi</SelectItem>
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
                                                    <FormLabel>Numero wallet</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Exemple: 77 20 21 10" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                                {form.getValues("Methode_de_paiement") === "cheque" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="Numero_cheque"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Numero du cheque</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Entre le numero cheque .." />
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
                                                    <FormLabel>Nom du banque</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Entre le nom du banque..." />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                <div className="text-lg font-semibold text-right">
                                    Montant Total :{" "}
                                    <span>{TotalMontant.toLocaleString()} DJF</span>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <Button
                                        variant="outline"
                                        className="bg-slate-500 text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Annuler
                                    </Button>
                                    <Button type="submit" className="bg-primary text-white">
                                        Next
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            {/* Résumé et Paiement */}
            <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
                <DialogContent className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
                    <ScrollArea className="max-h-[70vh] w-full">
                        <DialogHeader className="border-b-2 pb-4 mb-6">
                            <DialogTitle className="text-2xl font-bold text-gray-800">Résumé des informations</DialogTitle>
                        </DialogHeader>

                        {/* Section à imprimer */}
                        <div id="print-area" ref={printAreaRef} className="rounded-md border  border-gray-300 p-4 flex flex-col items-center w-full">
                            <HeaderImprimary />
                            {donnees && (
                                <Imprimery donnees={donnees} recueNumber={recueNumber} NomRecue="Sous couverte" totalMontant={TotalMontant} />
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

export default SousCouverteForm;
