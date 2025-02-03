"use client";
import React, { useEffect, useRef, useState } from "react";
import HeaderImprimary from "../components/HeaderImprimary";
import { MontantSaiasiSchema } from "@/Schema/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { GetLastReferenceOfRdv } from "@/actions/All_references/GetLastReferenceOfRdv";

type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;

const StepFourForme = () => {
    const [recueNumber, setRecueNumber] = useState(""); // Ceci peut être utilisé pour afficher le numéro de reçu plus tard
    const donnees = useSelector((state: RootState) => state.multiForm); // Vérifiez la structure de 'multiForm' dans Redux
    const [currentNumber, setCurrentNumber] = useState(1); // État pour gérer l'incrément du numéro
    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null);

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

    const handlePayer = () => {
        if (PrintJS && printAreaRef.current) { // Vérification que PrintJS est chargé et que le DOM est prêt
            PrintJS({
                printable: printAreaRef.current,
                type: "html",
                targetStyles: ["*"],
            });
        }
    };

    // Calculer la somme totale des montants
    const totalMontant =
        (donnees?.montantRd || 0) +
        (donnees?.montantLd || 0) +
        (donnees?.montantCll || 0) +
        (donnees?.montantSC || 0);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                Tous les informations d&#39;un nouveau client
            </h2>

            {/* Section à imprimer */}
            <div id="print-area" ref={printAreaRef} className="rounded-md border border-gray-300 p-4 flex flex-col items-center w-full">
                <HeaderImprimary />
                {donnees && (
                    <div className="p-6 space-y-6 w-full">
                        <div className="mt-4 text-xl py-4 font-semibold flex justify-between items-center border-b">
                            <h2 className="text-2xl font-bold text-gray-800">Résumé</h2>
                            <div>
                                <span className="text-gray-600">Numéro de reçu :</span>
                                <span className="text-blue-700 font-medium ml-2">{recueNumber}</span>
                            </div>
                        </div>

                        {/* Tableau pour afficher les données */}
                        <div className="">
                            <table className="min-w-full border-collapse border border-gray-300 rounded-md">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">Champ</th>
                                        <th className="text-left px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">Valeur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(donnees)
                                        .filter(([key, value]) => {
                                            // Ignorer les champs inutiles comme 'step'
                                            if (key === "step") return false;

                                            // Vérifier les objets pour des données valides
                                            if (typeof value === "object" && value !== null) {
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
                                                        <ul className="pl-4 list-disc">
                                                            {value.map((item, idx) => (
                                                                <li key={idx} className="text-sm text-gray-600">
                                                                    {JSON.stringify(item, null, 2)}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : typeof value === "object" && value !== null ? (
                                                        <pre className="bg-gray-100 p-2 rounded text-sm">
                                                            {JSON.stringify(
                                                                Object.fromEntries(
                                                                    Object.entries(value).filter(
                                                                        ([, v]) => v && v.toString().trim() !== ""
                                                                    )
                                                                ),
                                                                null,
                                                                2
                                                            )}
                                                        </pre>
                                                    ) : (
                                                        <span>{value}</span>
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
                        disabled={!donnees || !Object.entries(donnees).some(([key, value]) => {
                            if (key === "step") return false;
                            if (typeof value === "object" && value !== null) {
                                return Object.values(value).some(
                                    (v) => v && v.toString().trim() !== ""
                                );
                            }
                            return value && value.toString().trim() !== "";
                        })}
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
