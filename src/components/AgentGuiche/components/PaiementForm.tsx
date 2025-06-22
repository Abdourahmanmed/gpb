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
import { useSession } from "next-auth/react";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";
// Typages
type MethodePaiement = "cheque" | "cash" | "wallet";
type WalletOptions = "cac_pay" | "waafi" | "d_money" | "dahabplaces" | "sabapay";


// Typage du formulaire
type PaiementFormValues = z.infer<typeof PaiementSchema>;
type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;
interface DataClient {
    ClientId: string,
    TypeClient: string,
    Nom: string,
    Redevance: number
}
interface PaymentFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    dataClient: DataClient,
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ isOpen, setIsOpen, dataClient }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MethodePaiement | undefined>(undefined);
    const [donnees, setDonnees] = useState<PaiementFormValues | null>(null);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [isSucessOpen, setisSucessOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null);
    const confettiRef = useRef<ConfettiRef>(null);

    // État pour gérer l'incrément du numéro
    const [currentNumber] = useState(1);
    const [recueNumber, setRecueNumber] = useState('');
    const { data: session } = useSession();

    // pour recupere le montant que les clients doivent payer 
    const [Apayer, SetApayer] = useState(0);

    const FetApayer = async () => {
        const api = `http://192.168.0.12/gbp_backend/api.php?method=SelectionsLesMontantsImaper&ClientId=${dataClient?.ClientId}`;
        try {
            const response = await fetch(api);
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Erreur inconnue");
            }

            SetApayer(data.MontantApayer);
        } catch (error) {
            console.error("Erreur lors de la récupération du montant à payer :", error);
        }
    }

    // Appeler l'API lorsque ClientId change
    useEffect(() => {
        if (dataClient?.ClientId) {
            FetApayer();
        }
    }, [dataClient?.ClientId]);


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
            Montant: Apayer,
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
            form.setValue('Montant', Apayer);
            // Ajouter la référence dans les données avant d'envoyer la requête
            const finalData = {
                ...values,
                Montant: Apayer,
                ReferenceId: recueNumber,  // Assurez-vous d'ajouter la valeur de recueNumber ici
                id_user: session?.user?.id,
            };

            // Logique d'enregistrement (par exemple, sauvegarde des données)
            console.log("Données soumises :", finalData);
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
            const enregistrement = await ChangementRdvPaiement(dataClient?.ClientId, session?.user?.id, donnees);
            if (enregistrement?.success) {
                setMessage(enregistrement?.success);
                setisSucessOpen(true);
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

    const handleImprimary = () => {
        // Vérification que PrintJS est chargé et que l'élément à imprimer est bien disponible
        // Vérification que PrintJS est chargé et que le DOM est prêt
        if (PrintJS && printAreaRef.current) {
            PrintJS({
                printable: printAreaRef.current,
                type: "html",
                targetStyles: ["*"],
            });
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
                                                    <Input {...field} value={Apayer} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <FormField
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
                                    /> */}
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

            <Dialog open={isSucessOpen} onOpenChange={setisSucessOpen}>
                <DialogContent className=" p-8 bg-white rounded-xl shadow-lg max-w-[980px]   mx-auto">
                    <DialogHeader className="border-b-2 pb-4 mb-6">
                        <DialogTitle className="text-2xl font-bold text-gray-800">Imprimer</DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        <h1 className="text-2xl text-green-600 font-semibold bg-green-100 p-2 rounded-md">Felicitation {message}</h1>
                        <Confetti
                            ref={confettiRef}
                            className="absolute left-0 top-0 z-0 size-full"
                            onMouseEnter={() => {
                                confettiRef.current?.fire({});
                            }}
                        />
                    </div>
                    {/* Section à imprimer */}
                    <div id="print-area" ref={printAreaRef} className="rounded-md  p-4 flex flex-col items-center w-[900px]">
                        <div className="w-full">
                            {/* Texte principal */}
                            <div className="flex-1 text-center">
                                <div className="text-lg font-bold">
                                    REPUBLIQUE DE DJIBOUTI
                                </div>
                                <div className="text-sm italic my-1">
                                    Unité - Égalité - Paix
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center justify-center flex-col">
                                    {/* Logo à gauche */}
                                    <div className="w-max h-max rounded-full flex items-center justify-center overflow-hidden pt-4 gap-2">
                                        <Image
                                            src="/logoposte.png"
                                            alt="Logo"
                                            width={70} // Largeur de 64px
                                            height={70} // Hauteur de 64px
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="">
                                        <div className="text-blue-500 font-bold mt-4 text-lg">
                                            LA POSTE DE DJIBOUTI S.A
                                        </div>
                                        <div className="text-sm uppercase">
                                            DIRECTION COMMERCIALE
                                        </div>
                                    </div>
                                </div>




                                {/* Colonne de droite : Date et numéro de reçu */}
                                <div className="text-left text-gray-700 dark:text-gray-300 space-y-2 w-[300px] mt-24">
                                    <p className="italic">Djibouti, le {new Date().toLocaleDateString()}</p>
                                    <p className="font-semibold text-lg">N° Reçu : <span className="text-primary text-[0.8rem]">{recueNumber}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 mb-2 text-gray-700 dark:text-gray-300 w-full ">
                            <strong className="text-[0.4rem]">Boulevard de la République</strong>
                            <span className="text-[0.4rem] mt-2"><strong>Tél :</strong> +253 21 35 48 02 / +253 21 25 03 12</span>
                            <span className="text-[0.4rem] mt-2"><strong>Email :</strong> <a href="mailto:contact@laposte.dj" className="underline">contact@laposte.dj</a></span>
                            <span className="text-[0.4rem] mt-2"><strong>Site web :</strong> <a href="http://www.laposte.dj" className="underline" target="_blank" rel="noopener noreferrer">www.laposte.dj</a></span>
                        </div>
                        <h5 className="font-bold text-xl mt-6 mb-4 w-full">Client : {dataClient?.Nom}</h5>
                        {donnees && (
                            <div className="h-max w-full p-4">
                                <table className="w-full border border-gray-200 text-sm">
                                    <thead>
                                        <tr>
                                            <th>Redevance</th>
                                            <th>Type Client</th>
                                            <th>Méthode de paiement</th>
                                            <th>Montant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">{dataClient?.Redevance}</td>
                                            <td className="text-center">{dataClient?.TypeClient}</td>
                                            <td className="flex gap-2 items-center text-center">
                                                <div className="mb-2"> {donnees.Methode_de_paiement}</div>
                                                {donnees.Wallet ? (
                                                    <div className="flex justify-between items-center  gap-4 p-4 bg-gray-50 rounded-md shadow-md">
                                                        <div className="text-sm text-gray-800">
                                                            <strong>Wallet :</strong> {donnees.Wallet}
                                                        </div>
                                                        <div className="text-sm text-gray-800">
                                                            <strong>Téléphone :</strong> {donnees.Numero_wallet}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    donnees?.Methode_de_paiement === "cheque" && (
                                                        <div className="flex justify-between items-center gap-4 p-4 bg-gray-50 rounded-md shadow-md">
                                                            <div className="text-sm text-gray-800">
                                                                <strong>Chèque :</strong> {donnees.Numero_cheque}
                                                            </div>
                                                            <div className="text-sm text-gray-800">
                                                                <strong>Banque :</strong> {donnees.Nom_Banque}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                            <td className="text-center">{donnees.Montant} Djf</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3} className="text-right pr-3">Montant Total :</td>
                                            <td className="text-center" >{donnees.Montant} Djf</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        )}
                    </div>
                    <div className="flex justify-end space-y-2">
                        <Button onClick={handleImprimary} type="submit">Imprimer</Button>
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
                        <div className="rounded-md border  border-gray-300 p-4 flex flex-col items-center w-full">
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
