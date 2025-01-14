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
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { nextStep, updateField } from "@/Store/Slices/Multi-formSlice";
import { Badge } from "@/components/ui/badge";

type SousCouvertFormValues = z.infer<typeof DynamicSchema>;

const montantBaseLd = 3000;
const montantBaseCll = 4000;
const montantBaseSc = 20000;

const FormSousCOptonal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const multiFormState = useSelector((state: RootState) => state.multiForm);
    const [montantTotal, setMontantTotal] = useState(0);

    const form = useForm<SousCouvertFormValues>({
        resolver: zodResolver(DynamicSchema),
        defaultValues: {
            ...multiFormState,
            MontantSC: 0,
            montantCll: 0,
            montantLd: 0,
            Have_sous_couvert_ld_cll: false,
            Have_ld: false,
            Have_cll: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sousCouvertures",
    });

    const watchedFields = useWatch({
        control: form.control,
        name: ["Have_sous_couvert_ld_cll", "Have_ld", "Have_cll", "sousCouvertures"],
    });

    useEffect(() => {
        const [haveSousCouvert, haveLd, haveCll, sousCouvertures] = watchedFields;

        let total = 0;

        if (haveSousCouvert) {
            total += montantBaseSc * (sousCouvertures?.length || 0);
        }
        if (haveLd) {
            total += montantBaseLd;
        }
        if (haveCll) {
            total += montantBaseCll;
        }

        setMontantTotal(total);

        form.setValue("montantSC", montantBaseSc * (sousCouvertures?.length || 0));
        form.setValue("montantLd", haveLd ? montantBaseLd : 0);
        form.setValue("montantCll", haveCll ? montantBaseCll : 0);
    }, [watchedFields]);

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
        }
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-around w-full">
                    {/* Sous-Couvertures */}
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
                        {form.watch("Have_sous_couvert_ld_cll") && (
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
                                                        <Input placeholder="personne X" {...field} />
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
                                                    <FormLabel>adresse</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="adresse X" {...field} />
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
                                                    <FormLabel>telephone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="telephone X" {...field} />
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
                    {/* Livraison */}
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
                        {form.watch("Have_ld") && (
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`Adresse_Livraison_Domicile`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adresse Livraison à Domicile</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Adresse X" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    {/* Collection */}
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
                        {form.watch("Have_cll") && (
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`Adresse_collection`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adresse de collection</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Adresse collection X" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* montant du inscriptions  */}
                <div className="flex justify-end mr-10">
                    <Badge variant="outline">Montant Total: {montantTotal} fdj </Badge>
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
