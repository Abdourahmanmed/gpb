"use client";

import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { nextStep, updateField } from '@/Store/Slices/Multi-formSlice';
import { SousCouvertSchema } from '@/Schema/schema';

type SousCouvertFormValues = z.infer<typeof SousCouvertSchema>;
type MethodePaiement = "credit" | "cheque" | "cash" | "wallet";
type WalletOptions = "cac_pay" | "waafi" | "d_money" | "sabapay" | "dahabplaces";

const StepTwoForm = () => {
    const montantParSousCouverture = 30000;
    const [totalMontant, setTotalMontant] = useState(montantParSousCouverture);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MethodePaiement | undefined>(undefined);

    const dispatch = useDispatch<AppDispatch>();
    const multiFormState = useSelector((state: RootState) => state.multiForm);

    const form = useForm<SousCouvertFormValues>({
        resolver: zodResolver(SousCouvertSchema),
        defaultValues: multiFormState,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'sousCouvertures',
    });

    const handleAdd = () => {
        append({ societe: '', personne: '', adresse: '', telephone: '' });
        setTotalMontant((prev) => prev + montantParSousCouverture);
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
            setTotalMontant((prev) => prev - montantParSousCouverture);
        }
    };

    const onSubmit = (values: z.infer<typeof SousCouvertSchema>) => {
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
            <ScrollArea className="h-[45vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                <Input placeholder="Exemple: Entreprise X" {...field} />
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
                                                <Input placeholder="Exemple: John Doe" {...field} />
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
                                                <Input placeholder="Exemple: 123 rue Principale" {...field} />
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
                                            <FormLabel>Numéro de téléphone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Exemple: 0123456789" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {fields.length > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => handleRemove(index)}
                                        className="text-red-500"
                                    >
                                        Supprimer
                                    </Button>
                                )}
                            </div>
                        ))}

                        {fields.length < 5 && (
                            <Button variant="outline" onClick={handleAdd} className="w-full">
                                Ajouter une sous-couverture
                            </Button>
                        )}

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
                                    name="wallet"
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
                                                        <SelectItem value="sabapay">Saba-paye</SelectItem>
                                                        <SelectItem value="dahabplaces">Dahab-Places</SelectItem>
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
                                            <FormLabel>Numéro wallet</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Exemple: 77 20 21 10" />
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
                                            <FormLabel>Numéro du chèque</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Entrez le numéro du chèque" />
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
                                            <FormLabel>Nom de la banque</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Entrez le nom de la banque" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        <FormField
                            control={form.control}
                            name='totalMontant'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Le montant total</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Exemple: 123 rue Principale" {...field} value={totalMontant} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-lg font-semibold text-right">
                            Montant Total : <span>{totalMontant.toLocaleString()} DJF</span>
                        </div>

                        <Button type="submit" className="w-full bg-blue-900 text-white">
                            Continuer
                        </Button>
                    </form>
                </Form>
            </ScrollArea>
        </div>
    );
};

export default StepTwoForm;
