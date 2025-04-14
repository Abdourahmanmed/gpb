"use client";
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';


import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/Store/store';
import { updateField, nextStep, setTypeClient } from '@/Store/Slices/Multi-formSlice';
import { NouveauClientSchemaStepOne } from '@/Schema/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GetLastReferenceOfRdv } from '@/actions/All_references/GetLastReferenceOfRdv';

// Définition du type de la réponse API
interface ApiResponse {
    numeros_disponibles: number[];
}

const StepOneForm = () => {
    // const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const multiFormState = useSelector((state: RootState) => state.multiForm);

    // État pour gérer l'incrément du numéro
    const [currentNumber] = useState(1);
    const [recueNumber, setRecueNumber] = useState('');
    const [LesNumerosBp, setLesNumerosBp] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // État de chargement

    const form = useForm<z.infer<typeof NouveauClientSchemaStepOne>>({
        resolver: zodResolver(NouveauClientSchemaStepOne),
        defaultValues: {
            ...multiFormState,
            montantRd: 25000,
            Reference_Rdv: ""
        } // Charger les valeurs initiales depuis Redux
    });

    // Fonction pour récupérer les numéros depuis l'API
    const FetchLesNumero = async (): Promise<void> => {
        setIsLoading(true);
        const api = "http://localhost/gbp_backend/api.php?method=GetNextBoitePostal";

        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            setLesNumerosBp(data.numeros_disponibles || []);
        } catch (error) {
            console.error("Erreur de serveur:", error);
            setLesNumerosBp([]); // En cas d'erreur, tableau vide
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        FetchLesNumero();
    }, []);

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

    const onSubmit = (values: z.infer<typeof NouveauClientSchemaStepOne>) => {
        let finaldata;
        if (values?.Role == "particulier") {
            finaldata = {
                ...values,
                montantRd: 15000,
                Reference_Rdv: recueNumber
            }
        } else {
            finaldata = {
                ...values,
                Reference_Rdv: recueNumber
            }
        }
        // Mise à jour des champs dans Redux
        Object.entries(finaldata).forEach(([field, value]) => {
            dispatch(updateField({ field, value }));
        });

        dispatch(nextStep()); // Passer à l'étape suivante
        // router.push("/Agent_guiche/Nouveau_client/StepTwoForm"); // Naviguer vers la prochaine étape
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                Enregistrement d&#39;un nouveau client
            </h2>

            {/*  formulaire pour ajouter  */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-4"
                >
                    {/* Boite Postale */}
                    <FormField
                        control={form.control}
                        name="BoitePostale"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Le numéro boîte postale:</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={isLoading ? "Chargement..." : "Choisir un n° BP..."} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {isLoading ? (
                                                <SelectItem disabled value="loading">
                                                    Chargement...
                                                </SelectItem>
                                            ) : LesNumerosBp.length > 0 ? (
                                                LesNumerosBp.map((num) => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem disabled value="no-data">
                                                    Aucun numéro disponible
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="TypeBp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Le Type boite postale:</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={isLoading ? "Chargement..." : "Choisir un type BP..."} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Grand">
                                                Grand
                                            </SelectItem>
                                            <SelectItem value="Moyen">
                                                Moyen
                                            </SelectItem>
                                            <SelectItem value="Petite">
                                                Petite
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Adresse */}
                    <FormField
                        control={form.control}
                        name="Adresse"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse :</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Choisir une adresse..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Nom */}
                    <FormField
                        control={form.control}
                        name="Nom"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Le nom:</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Exemple : Fatouma" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Téléphone */}
                    <FormField
                        control={form.control}
                        name="Telephone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Téléphone :</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Exemple : 77101010" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="Email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email :</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="fatouma@example.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Rôle */}
                    <FormField
                        control={form.control}
                        name="Role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type client :</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            dispatch(setTypeClient(value === "entreprise"));
                                        }}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choisir un type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="particulier" >Particulier</SelectItem>
                                            <SelectItem value="entreprise">Entreprise</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* montant du inscriptions  */}
                    <div className="flex justify-end mr-10 col-span-2">
                        <Badge variant="outline">Montant:{form.getValues('montantRd')} fdj </Badge>
                    </div>
                    {/* Bouton */}
                    <div className="col-span-2">
                        <Button type="submit" className="w-full bg-blue-900 text-white">
                            Continuer
                        </Button>
                    </div>
                </form>
            </Form>


        </div>
    );
};

export default StepOneForm;
