"use client";
import React, { useEffect, useRef, useState } from "react";
import HeaderImprimary from "../components/HeaderImprimary";
import { MontantSaiasiSchema } from "@/Schema/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { GetLastReferenceOfRdv } from "@/actions/All_references/GetLastReferenceOfRdv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles de react-toastify
import { useFileContext } from "@/components/FileContexe";
import { useSession } from "next-auth/react";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { resetStep } from "@/Store/Slices/Multi-formSlice";
import { Check, X } from "lucide-react";

type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;

const StepFourForme = () => {
    const [recueNumber, setRecueNumber] = useState(""); // Ceci peut être utilisé pour afficher le numéro de reçu plus tard
    const donnees = useSelector((state: RootState) => state.multiForm); // Vérifiez la structure de 'multiForm' dans Redux
    const dispatch = useDispatch<AppDispatch>();
    const [currentNumber] = useState(1); // État pour gérer l'incrément du numéro
    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null);
    const { files } = useFileContext(); // Utilisation du contexte pour les fichiers
    const { data: session } = useSession();
    const confettiRef = useRef<ConfettiRef>(null);
    const [isSucessOpen, setisSucessOpen] = useState(false);
    const [message, setMessage] = useState('');


    const formMontantSaisi = useForm<MontantSaisi>({
        resolver: zodResolver(MontantSaiasiSchema),
        defaultValues: { montantSaisi: "" },
    });

    useEffect(() => {
        const fetchLastReference = async () => {
            try {
                // Récupérer la dernière référence depuis la base de données
                const lastReference = await GetLastReferenceOfRdv();

                // Générer la date actuelle
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split("T")[0]; // Format AAAA-MM-JJ
                const anneeActuelle = currentDate.getFullYear();

                if (!lastReference) {
                    // Si aucune référence n'existe, générer un nouveau numéro
                    const paddedNumber = String(currentNumber).padStart(5, "0");
                    const newRecueNumber = `RNBP/${paddedNumber}/${formattedDate}`;
                    setRecueNumber(newRecueNumber);
                } else {
                    // Si une référence existe, analyser les données
                    const lastReferenceParts = lastReference.split("/");
                    const lastReferenceDate = lastReferenceParts.pop();
                    const lastReferenceYear = lastReferenceDate.split("-")[0];
                    const middleNumber = lastReferenceParts[1];

                    if (lastReferenceYear !== anneeActuelle.toString()) {
                        // Si l'année est différente, recommencer avec le numéro initial
                        const paddedNumber = String(currentNumber).padStart(5, "0");
                        const newRecueNumber = `RNBP/${paddedNumber}/${formattedDate}`;
                        setRecueNumber(newRecueNumber);
                    } else {
                        // Si l'année est identique, incrémenter le numéro
                        const incrementee = (parseInt(middleNumber, 10) + 1)
                            .toString()
                            .padStart(5, "0");
                        const newRecueNumber = `RNBP/${incrementee}/${formattedDate}`;
                        setRecueNumber(newRecueNumber);
                    }
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de la référence :",
                    error
                );
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
    // Calculer la somme totale des montants
    const totalMontant =
        (donnees?.montantRd || 0) +
        (donnees?.montantLd || 0) +
        (donnees?.montantCll || 0) +
        (donnees?.montantSC || 0);

    const handlePayer = async (value: MontantSaisi) => {
        if (totalMontant === 0) {
            toast.error(`Le montant ne doit pas être ${totalMontant} DJF.`);
            return;
        }
        if (parseInt(value.montantSaisi) !== totalMontant) {
            toast.error(`Le montant saisi doit être exactement ${totalMontant} DJF.`);
            return;
        }

        const formData = new FormData();

        // Convertir sousCouvertures en JSON valide avant de l'ajouter à formData
        formData.append("sousCouvertures", JSON.stringify(donnees.sousCouvertures));

        // Ajouter les autres données texte
        Object.entries(donnees).forEach(([key, val]) => {
            if (key !== "sousCouvertures" && val !== undefined && val !== null) {
                formData.append(key, val);
            }
        });

        // Ajout des fichiers si disponibles
        if (files[0]?.Abonnement) formData.append("Abonnement", files[0].Abonnement);
        if (files[0]?.patent_quitance) formData.append("patent_quitance", files[0].patent_quitance);
        if (files[0]?.Identiter) formData.append("Identiter", files[0].Identiter);

        // Affichage du contenu de formData dans la console pour débogage
        console.log("FormData content:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch(
                `http://192.168.0.12/gbp_backend/api.php?method=AddClientsAbonnment&id=${session?.user?.id}`,
                {
                    method: "POST",
                    body: formData, // Envoi des données au format multipart/form-data
                }
            );
            console.log(formData)
            const result = await response.json();

            if (!response.ok) {
                throw new Error("Erreur de l'exécution de l'API");
            }

            if (result?.error) {
                toast.error(result?.error);
            } else {
                setMessage(result?.success);
                setisSucessOpen(true);
            }
        } catch (error) {
            console.error("Erreur lors du paiement :", error);
            toast.error("Erreur lors du paiement. Veuillez réessayer.");
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
        dispatch(resetStep()); // reinitialisation de l'étape
    };


    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
            <Dialog open={isSucessOpen} onOpenChange={setisSucessOpen}>
                <DialogContent className=" p-8 bg-white rounded-xl shadow-lg max-w-[980px] mx-auto">
                    <ScrollArea className="max-h-[70vh] w-full">
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
                        <div
                            id="print-area"
                            ref={printAreaRef}
                            className="rounded-md p-4 flex flex-col items-center w-full mt-2"
                        >
                            <HeaderImprimary Reference={recueNumber} />
                            <div className="flex flex-col mt-4 mb-2 text-gray-700 dark:text-gray-300 w-full ">
                                <strong className="text-[0.4rem]">Boulevard de la République</strong>
                                <span className="text-[0.4rem] mt-2"><strong>Tél :</strong> +253 21 35 48 02 / +253 21 25 03 12</span>
                                <span className="text-[0.4rem] mt-2"><strong>Email :</strong> <a href="mailto:contact@laposte.dj" className="underline">contact@laposte.dj</a></span>
                                <span className="text-[0.4rem] mt-2"><strong>Site web :</strong> <a href="http://www.laposte.dj" className="underline" target="_blank" rel="noopener noreferrer">www.laposte.dj</a></span>
                            </div>
                            <h5 className="font-bold text-xl mt-6 mb-4 w-full">Client : {donnees?.Nom}</h5>
                            {donnees && (
                                <div className="h-max w-full p-4">
                                    <table className="w-full border border-gray-200 text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-2 border" rowSpan={2}>Redevance</th>
                                                <th className="p-2 border" rowSpan={2}>Type</th>
                                                <th className="p-2 border" colSpan={3}>Service additionnel</th>
                                                <th className="p-2 border" colSpan={4}>Méthode de Paiement</th>
                                                <th className="p-2 border" rowSpan={2}>Montant</th>
                                            </tr>
                                            <tr className="bg-gray-100">
                                                <th className="p-2 border">SC</th>
                                                <th className="p-2 border">Ldc</th>
                                                <th className="p-2 border">Coll</th>
                                                <th className="p-2 border">Rd</th>
                                                <th className="p-2 border">SC</th>
                                                <th className="p-2 border">Ld</th>
                                                <th className="p-2 border">Coll</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="p-2 border text-center">{new Date().getFullYear()}</td>
                                                <td className="p-2 border text-center">{donnees?.Role}</td>

                                                {/* Service additionnel */}
                                                <td className="p-2 border text-center">
                                                    {donnees?.sousCouvertures?.length > 0 ? <Check /> : <X />}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {donnees?.Adresse_Livraison_Domicile ? <Check /> : <X />}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {donnees?.Adresse_collection ? <Check /> : <X />}
                                                </td>

                                                {/* Méthode de paiement */}
                                                <td colSpan={4} className="p-2 border text-center">{donnees?.Methode_de_paiement}</td>

                                                {/* Montant */}
                                                <td className="p-2 border text-center">
                                                    <div className="text-center">{donnees?.montantRd}</div>
                                                    <div className="text-center">{donnees?.montantSC}</div>
                                                    <div className="text-center">{donnees?.montantLd}</div>
                                                    <div className="text-center">{donnees?.montantCll}</div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan={9} className="text-right pr-3 font-semibold">Montant Total :</td>
                                                <td className="text-center font-semibold">{totalMontant} Djf</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            )}
                        </div>
                    </ScrollArea>
                    <div className="flex justify-end space-y-2">
                        <Button onClick={handleImprimary} type="submit">Imprimer</Button>
                    </div>

                </DialogContent>
            </Dialog>
            <ToastContainer />
            <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                Tous les informations d&#39;un nouveau client
            </h2>
            {/* Section à imprimer */}
            <div
                className="rounded-md border border-gray-300 p-4 flex flex-col items-center w-full"
            >
                <HeaderImprimary Reference={recueNumber} />
                {donnees && (
                    <div className="p-6 space-y-6 w-full">
                        <div className="mt-4 text-xl py-4 font-semibold flex justify-between items-center border-b">
                            <h2 className="text-2xl font-bold text-gray-800">Résumé</h2>
                            <div>
                                <span className="text-gray-600">Numéro de reçu :</span>
                                <span className="text-blue-700 font-medium ml-2">
                                    {recueNumber}
                                </span>
                            </div>
                        </div>

                        {/* Tableau pour afficher les données */}
                        <div className="">
                            <table className="min-w-full border-collapse border border-gray-300 rounded-md">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">
                                            Champ
                                        </th>
                                        <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">
                                            Valeur
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(donnees)
                                        .filter(([key, value]) => {
                                            // Ignorer les champs inutiles comme 'step'
                                            if (key === "step") return false;

                                            // Vérifier les objets pour des données valides
                                            if (typeof value === "object" && value !== null) {
                                                // Vérifier si 'sousCouvertures' contient des données valides
                                                if (key === "sousCouvertures" && Array.isArray(value)) {
                                                    return value.some(
                                                        (item) => Object.values(item).some((v) => v && v.toString().trim() !== "")
                                                    );
                                                }
                                                // Pour les autres objets, on vérifie s'ils ont des valeurs valides
                                                return Object.values(value).some(
                                                    (v) => v && v.toString().trim() !== ""
                                                );
                                            }

                                            // Vérifier les chaînes non vides
                                            if (typeof value === "string") {
                                                return value.trim() !== "";
                                            }

                                            // Vérifier les tableaux non vides
                                            if (Array.isArray(value)) {
                                                return value.length > 0;
                                            }

                                            return false; // Ignorer tout autre type de données
                                        })
                                        .map(([key, value], index) => (
                                            <tr key={index} className="even:bg-gray-50">
                                                <td className="capitalize px-4 py-2 border-b border-gray-300 text-gray-800">
                                                    {key.replace(/_/g, " ")}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-300 text-gray-600">
                                                    {Array.isArray(value) ? (
                                                        // Gérer le cas des tableaux
                                                        <ul className="pl-4 list-disc">
                                                            {value.map((item, idx) => (
                                                                <div key={idx} >
                                                                    <li className="text-sm text-gray-600">
                                                                        {typeof item === "object" && item !== null ? (
                                                                            // Afficher les objets imbriqués de manière plus lisible
                                                                            <div>
                                                                                {Object.entries(item).map(([subKey, subValue]) => (
                                                                                    <div key={subKey}>
                                                                                        <strong>{subKey.replace(/_/g, " ")}:</strong> <span>{typeof subValue === 'string' || typeof subValue === 'number' ? subValue : "N/A"}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        ) : (
                                                                            item || "N/A"
                                                                        )}
                                                                    </li>
                                                                    <hr className="font-semibold" />
                                                                </div>
                                                            ))}
                                                        </ul>
                                                    ) : typeof value === "object" && value !== null ? (
                                                        // Gérer les objets imbriqués
                                                        <pre className="bg-gray-100 p-2 rounded text-sm">
                                                            {Object.entries(value).map(([subKey, subValue]) => (
                                                                <div key={subKey}>
                                                                    <strong>{subKey.replace(/_/g, " ")}:</strong> <span>{typeof subValue === 'string' || typeof subValue === 'number' ? subValue : "N/A"}</span>
                                                                </div>
                                                            ))}
                                                        </pre>
                                                    ) : (
                                                        <span>{value || "N/A"}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    {/* Ajout des montants et de la somme totale */}
                                    <tr className="even:bg-gray-50">
                                        <td className="capitalize px-4 py-2 border-b border-gray-300 text-gray-800">
                                            Montant Rd
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300 text-gray-600">
                                            {donnees?.montantRd || 0}
                                        </td>
                                    </tr>
                                    <tr className="even:bg-gray-50">
                                        <td className="capitalize px-4 py-2 border-b border-gray-300 text-gray-800">
                                            Montant Ld
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300 text-gray-600">
                                            {donnees?.montantLd || 0}
                                        </td>
                                    </tr>
                                    <tr className="even:bg-gray-50">
                                        <td className="capitalize px-4 py-2 border-b border-gray-300 text-gray-800">
                                            Montant Cll
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300 text-gray-600">
                                            {donnees?.montantCll || 0}
                                        </td>
                                    </tr>
                                    <tr className="even:bg-gray-50">
                                        <td className="capitalize px-4 py-2 border-b border-gray-300 text-gray-800">
                                            Montant SC
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300 text-gray-600">
                                            {donnees?.montantSC || 0}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="capitalize px-4 py-2 border-b border-gray-300 text-gray-800 font-bold">
                                            Somme Totale
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300 text-gray-600 font-bold">
                                            {totalMontant}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Formulaire de Paiement */}
            <Form {...formMontantSaisi}>
                <form
                    onSubmit={formMontantSaisi.handleSubmit(handlePayer)}
                    className="mt-6 flex gap-8 flex-col"
                >
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
                        disabled={
                            !donnees ||
                            !Object.entries(donnees).some(([key, value]) => {
                                if (key === "step") return false;
                                if (typeof value === "object" && value !== null) {
                                    return Object.values(value).some(
                                        (v) => v && v.toString().trim() !== ""
                                    );
                                }
                                return value && value.toString().trim() !== "";
                            })
                        }
                        className="bg-blue-600 text-white mt-4"
                    >
                        Valider le Paiement
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StepFourForme;
