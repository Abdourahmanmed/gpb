"use client";
import React, { useState } from 'react'
import HeaderImprimary from '../components/HeaderImprimary'
import Imprimery from '../components/Imprimery'
import { LivreDoSchema, MontantSaiasiSchema } from '@/Schema/schema';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import printJS from 'print-js';


type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;

const StepFourForme = () => {
    const [recueNumber, setRecueNumber] = useState('');
    const [donnees, setDonnees] = useState<z.infer<typeof LivreDoSchema> | null>(null);

    const formMontantSaisi = useForm<MontantSaisi>({
        resolver: zodResolver(MontantSaiasiSchema),
        defaultValues: { montantSaisi: "" },
    });

    const handlePayer = (value: MontantSaisi) => {
        if (parseInt(value.montantSaisi) !== donnees?.Montant) {
            alert(`Le montant saisi doit être exactement ${donnees?.Montant} DJF.`);
            return;
        }

        const printArea = document.getElementById("print-area");
        if (!printArea) return;

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
            <div id="print-area" className="rounded-md border  border-gray-300 p-4 flex flex-col items-center w-full">
                <HeaderImprimary />
                {donnees && (
                    <Imprimery donnees={donnees} recueNumber={recueNumber} NomRecue="Collection" />
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
    )
}

export default StepFourForme