"use client";
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/Store/store';
import { updateField, nextStep, setTypeClient } from '@/Store/Slices/Multi-formSlice';
import { NouveauClientSchemaStepOne } from '@/Schema/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const StepOneForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const multiFormState = useSelector((state: RootState) => state.multiForm);

    const form = useForm<z.infer<typeof NouveauClientSchemaStepOne>>({
        resolver: zodResolver(NouveauClientSchemaStepOne),
        defaultValues: multiFormState, // Charger les valeurs initiales depuis Redux
    });

    const onSubmit = (values: z.infer<typeof NouveauClientSchemaStepOne>) => {
        // Mise à jour des champs dans Redux
        Object.entries(values).forEach(([field, value]) => {
            dispatch(updateField({ field, value }));
        });
        console.log(values);

        dispatch(nextStep()); // Passer à l'étape suivante
        // router.push("/Agent_guiche/Nouveau_client/StepTwoForm"); // Naviguer vers la prochaine étape
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                Enregistrement d'un nouveau client
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
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choisir un n° BP..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bp1">BP 1</SelectItem>
                                            <SelectItem value="bp2">BP 2</SelectItem>
                                            <SelectItem value="bp3">BP 3</SelectItem>
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
