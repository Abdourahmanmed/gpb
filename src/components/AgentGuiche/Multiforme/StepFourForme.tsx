"use client";
import React, { useEffect, useState } from "react";
import HeaderImprimary from "../components/HeaderImprimary";
import { LivreDoSchema, MontantSaiasiSchema } from "@/Schema/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import printJS from "print-js";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";

type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;

const StepFourForme = () => {
    const [recueNumber, setRecueNumber] = useState(""); // Ceci peut être utilisé pour afficher le numéro de reçu plus tard
    const donnees = useSelector((state: RootState) => state.multiForm); // Vérifiez la structure de 'multiForm' dans Redux
    // État pour gérer l'incrément du numéro
    const [currentNumber, setCurrentNumber] = useState(1);
    const formMontantSaisi = useForm<MontantSaisi>({
        resolver: zodResolver(MontantSaiasiSchema),
        defaultValues: { montantSaisi: "" },
    });

    useEffect(() => {
        // Générer la date actuelle
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format AAAA-MM-JJ

        // Générer le numéro de reçu
        const paddedNumber = String(currentNumber).padStart(5, '0'); // Ajoute des zéros à gauche pour atteindre 5 chiffres
        const newRecueNumber = `RNBP/${paddedNumber}/${formattedDate}`;

        setRecueNumber(newRecueNumber);
    }, [currentNumber]);

    // Fonction de gestion du paiement et de l'impression
    const handlePayer = (value: MontantSaisi) => {
        const printArea = document.getElementById("print-area");
        if (!printArea) return;

        // Imprimer la section définie sous 'print-area'
        printJS({
            printable: "print-area",
            type: "html",
            targetStyles: ["*"],
        });
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                Tous les informations d'un nouveau client
            </h2>

            {/* Section à imprimer */}
            <div id="print-area" className="rounded-md border border-gray-300 p-4 flex flex-col items-center w-full">
                <HeaderImprimary />
                {donnees && (
                    <div className="p-6 bg-gray-100 rounded-md shadow-md space-y-6 w-full">

                        <div className="mt-4 text-xl py-4 font-semibold flex justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Étape 4 : Résumé</h2>
                            <div className="">
                                <span>Numéro de reçu : </span>
                                <span className="text-blue-700">{recueNumber}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {/* Affichage des données provenant de 'donnees' */}
                            {Object.entries(donnees).map(([key, value], index) => (
                                <div key={index} className="border-b pb-2">
                                    <strong className="capitalize">{key.replace(/_/g, " ")} :</strong>{" "}
                                    {Array.isArray(value) ? (
                                        <ul className="pl-4 list-disc">
                                            {value.map((item, idx) => (
                                                <li key={idx}>{JSON.stringify(item, null, 2)}</li>
                                            ))}
                                        </ul>
                                    ) : typeof value === "object" && value !== null ? (
                                        <pre className="pl-4 bg-gray-50 p-2 rounded">
                                            {JSON.stringify(value, null, 2)}
                                        </pre>
                                    ) : (
                                        <span>{value ? value.toString() : "Aucune donnée"}</span>
                                    )}
                                </div>
                            ))}
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
        </div>
    );
};

export default StepFourForme;
