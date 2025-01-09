"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { DynamicSchema } from "@/Schema/schema";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { nextStep, updateField } from "@/Store/Slices/Multi-formSlice";

type SousCouvertFormValues = z.infer<typeof DynamicSchema>;

const FormSousCOptonal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const multiFormState = useSelector((state: RootState) => state.multiForm);
    const montantParSousCouverture = 30000;
    const [totalMontant, setTotalMontant] = useState(montantParSousCouverture);

    const form = useForm<SousCouvertFormValues>({
        resolver: zodResolver(DynamicSchema),
        defaultValues: multiFormState,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sousCouvertures",
    });

    const onSubmit = (values: SousCouvertFormValues) => {
        console.log("Form Values: ", values);

        Object.entries(values).forEach(([field, value]) => {
            dispatch(updateField({ field, value }));
        });

        dispatch(nextStep());
    };

    const handleAdd = () => {
        if (fields.length < 5) {
            append({
                societe: "",
                personne: "",
                adresse: "",
                telephone: "",
            });
            setTotalMontant((prev) => prev + montantParSousCouverture);
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
            setTotalMontant((prev) => prev - montantParSousCouverture);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-around w-full">
                    {/* Section Sous-Couvertures */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name={`Have_sous_couvert_ld_cll`}
                            render={({ field: checkboxField }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1">
                                            <Checkbox
                                                id={`terms-soucouvert`}
                                                checked={checkboxField.value || false}
                                                onCheckedChange={checkboxField.onChange}
                                            />
                                            <label
                                                htmlFor={`terms-soucouvert`}
                                                className="text-sm font-medium leading-none"
                                            >
                                                Je veux une sous-couverture
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("Have_sous_couvert_ld_cll") === true && (
                            <div className="space-y-4">
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
                                                        <Input placeholder="Entreprise X" {...field} />
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
                                                        <Input placeholder="John Doe" {...field} />
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
                                                            placeholder="123 rue Principale"
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
                                                    <FormLabel>Téléphone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="0123456789" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {fields.length > 1 && (
                                            <Button
                                                variant="destructive"
                                                onClick={() => handleRemove(index)}
                                                className="text-white"
                                            >
                                                Supprimer
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {fields.length < 5 && (
                                    <Button onClick={handleAdd} className="w-full bg-blue-500">
                                        Ajouter une sous-couverture
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Livraison Section */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name={`Have_ld`}
                            render={({ field: checkboxField }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1">
                                            <Checkbox
                                                id={`terms`}
                                                checked={checkboxField.value || false}
                                                onCheckedChange={checkboxField.onChange}
                                            />
                                            <label
                                                htmlFor={`terms`}
                                                className="text-sm font-medium leading-none"
                                            >
                                                Je veux une livraison à domicile
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("Have_ld") === true && (
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name={`Adresse_Livraison_Domicile`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adresse de livraison</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Les adresses" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    {/* Collection Section */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name={`Have_cll`}
                            render={({ field: checkboxField }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-1">
                                            <Checkbox
                                                id={`termsCli`}
                                                checked={checkboxField.value || false}
                                                onCheckedChange={checkboxField.onChange}
                                            />
                                            <label
                                                htmlFor={`termsCli`}
                                                className="text-sm font-medium leading-none"
                                            >
                                                Je veux une collection
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("Have_cll") === true && (
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name={`Adresse_collection`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adresse de collection</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Les adresses" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-6">
                    <Button type="submit" className="w-full bg-blue-900">
                        Soumettre
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default FormSousCOptonal;
