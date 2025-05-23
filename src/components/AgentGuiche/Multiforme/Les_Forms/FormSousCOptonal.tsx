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
import { GetLastReferenceOfSC } from "@/actions/All_references/GetLastReferenceOfSC";
import { GetLastReferenceOfCLL } from "@/actions/All_references/GetLastReferenceOfCll";
import { GetLastReferenceOfLDV } from "@/actions/All_references/GetLastReferenceOfLVD";

type SousCouvertFormValues = z.infer<typeof DynamicSchema>;

const FormSousCOptonal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const multiFormState = useSelector((state: RootState) => state.multiForm)
    const [montantTotal, setMontantTotal] = useState(0);
    const [montantBaseLd, setMontantBaseLd] = useState(0);
    const [montantBaseCll, setMontantBaseCll] = useState(0);
    const [montantBaseSc, setMontantBaseSc] = useState(0);
    // État pour gérer l'incrément du numéro pour les souscouverte
    const [currentNumber] = useState(1);
    const [recueNumber, setRecueNumber] = useState('');

    useEffect(() => {
        if (multiFormState?.Role == "particulier") {
            setMontantBaseSc(3500);
        } else {
            setMontantBaseLd(60000);
            setMontantBaseCll(60000);
            setMontantBaseSc(10000);
        }
    }, [multiFormState?.Role]);

    // État pour gérer l'incrément du numéro pour les livraisons
    const [currentNumberLiv] = useState(1);
    const [recueNumberLiv, setRecueNumberLiv] = useState('');

    // État pour gérer l'incrément du numéro pour les collections
    const [currentNumberCll] = useState(1);
    const [recueNumberCll, setRecueNumberCll] = useState('');

    const form = useForm<SousCouvertFormValues>({
        resolver: zodResolver(DynamicSchema),
        defaultValues: {
            ...multiFormState,
            MontantSC: 0,
            montantCll: 0,
            montantLd: 0,
            reference_Sc: "",
            reference_Ld: "",
            reference_collection: "",
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

    // useEffect pour la référence sous-couvert
    useEffect(() => {
        if (form.getValues("Have_sous_couvert_ld_cll")) {
            const fetchLastReference = async () => {
                try {
                    const lastReference = await GetLastReferenceOfSC();
                    const currentDate = new Date();
                    const formattedDate = currentDate.toISOString().split("T")[0];
                    const anneeActuelle = currentDate.getFullYear();

                    if (!lastReference) {
                        const paddedNumber = String(currentNumber).padStart(5, "0");
                        const newRecueNumber = `AJSC/${paddedNumber}/${formattedDate}`;
                        setRecueNumber(newRecueNumber);
                    } else {
                        const lastReferenceParts = lastReference.split("/");
                        const lastReferenceDate = lastReferenceParts.pop();
                        const lastReferenceYear = lastReferenceDate.split("-")[0];
                        const middleNumber = lastReferenceParts[1];

                        if (lastReferenceYear !== anneeActuelle.toString()) {
                            const paddedNumber = String(currentNumber).padStart(5, "0");
                            const newRecueNumber = `AJSC/${paddedNumber}/${formattedDate}`;
                            setRecueNumber(newRecueNumber);
                        } else {
                            const incrementee = (parseInt(middleNumber, 10) + 1)
                                .toString()
                                .padStart(5, "0");
                            const newRecueNumber = `AJSC/${incrementee}/${formattedDate}`;
                            setRecueNumber(newRecueNumber);
                        }
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de la référence :", error);
                }
            };

            fetchLastReference();
        }
    }, [form.getValues("Have_sous_couvert_ld_cll"), currentNumber]);

    // useEffect pour la référence livraison
    useEffect(() => {
        if (form.getValues("Have_ld")) {
            const fetchLastReference = async () => {
                try {
                    const lastReference = await GetLastReferenceOfLDV();
                    const currentDate = new Date();
                    const formattedDate = currentDate.toISOString().split("T")[0];
                    const anneeActuelle = currentDate.getFullYear();

                    if (!lastReference) {
                        const paddedNumber = String(currentNumberLiv).padStart(5, "0");
                        const newRecueNumber = `AJLV/${paddedNumber}/${formattedDate}`;
                        setRecueNumberLiv(newRecueNumber);
                    } else {
                        const lastReferenceParts = lastReference.split("/");
                        const lastReferenceDate = lastReferenceParts.pop();
                        const lastReferenceYear = lastReferenceDate.split("-")[0];
                        const middleNumber = lastReferenceParts[1];

                        if (lastReferenceYear !== anneeActuelle.toString()) {
                            const paddedNumber = String(currentNumberLiv).padStart(5, "0");
                            const newRecueNumber = `AJLV/${paddedNumber}/${formattedDate}`;
                            setRecueNumberLiv(newRecueNumber);
                        } else {
                            const incrementee = (parseInt(middleNumber, 10) + 1)
                                .toString()
                                .padStart(5, "0");
                            const newRecueNumber = `AJLV/${incrementee}/${formattedDate}`;
                            setRecueNumberLiv(newRecueNumber);
                        }
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de la référence :", error);
                }
            };

            fetchLastReference();
        }
    }, [form.getValues("Have_ld"), currentNumberLiv]);

    // useEffect pour la référence collection
    useEffect(() => {
        if (form.getValues("Have_cll")) {
            const fetchLastReference = async () => {
                try {
                    const lastReference = await GetLastReferenceOfCLL();
                    const currentDate = new Date();
                    const formattedDate = currentDate.toISOString().split("T")[0];
                    const anneeActuelle = currentDate.getFullYear();

                    if (!lastReference) {
                        const paddedNumber = String(currentNumberCll).padStart(5, "0");
                        const newRecueNumber = `AJCll/${paddedNumber}/${formattedDate}`;
                        setRecueNumberCll(newRecueNumber);
                    } else {
                        const lastReferenceParts = lastReference.split("/");
                        const lastReferenceDate = lastReferenceParts.pop();
                        const lastReferenceYear = lastReferenceDate.split("-")[0];
                        const middleNumber = lastReferenceParts[1];

                        if (lastReferenceYear !== anneeActuelle.toString()) {
                            const paddedNumber = String(currentNumberCll).padStart(5, "0");
                            const newRecueNumber = `AJCll/${paddedNumber}/${formattedDate}`;
                            setRecueNumberCll(newRecueNumber);
                        } else {
                            const incrementee = (parseInt(middleNumber, 10) + 1)
                                .toString()
                                .padStart(5, "0");
                            const newRecueNumber = `AJCll/${incrementee}/${formattedDate}`;
                            setRecueNumberCll(newRecueNumber);
                        }
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de la référence :", error);
                }
            };

            fetchLastReference();
        }
    }, [form.getValues("Have_cll"), currentNumberCll]);


    const onSubmit = (values: SousCouvertFormValues) => {
        const finaldata = {
            ...values,
            reference_Sc: recueNumber,
            reference_Ld: recueNumberLiv,
            reference_collection: recueNumberCll
        }
        Object.entries(finaldata).forEach(([field, value]) => {
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
                    {multiFormState?.Role == "entreprise" ? (
                        <>
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
                        </>
                    ) : (
                        <div>
                            
                        </div>
                    )}

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
