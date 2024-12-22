"use client"
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { SousCouvertSchema } from "@/Schema/schema";
import { ScrollArea } from '@/components/ui/scroll-area';

// Typages
type MethodePaiement = "credit" | "cheque" | "cash" | "wallet";
type WalletOptions = "cac_pay" | "waafi" | "d_money";


// Schéma de validation avec zod
const PaiementSchema = z.object({
    Montant: z.literal(40000),
    Methode_de_paiement: z.enum(["credit", "cheque", "cash", "wallet"], {
        required_error: "Veuillez sélectionner une méthode de paiement.",
    }),
    Wallet: z.enum(["cac_pay", "waafi", "d_money"]).optional(),
});

type SousCouvertFormValues = z.infer<typeof SousCouvertSchema>;

const StepTwoForm = () => {
    const montantParSousCouverture = 30000;
    const [totalMontant, setTotalMontant] = useState(montantParSousCouverture);

    const form = useForm<SousCouvertFormValues>({
        resolver: zodResolver(SousCouvertSchema),
        defaultValues: {
            sousCouvertures: [
                { societe: "", personne: "", adresse: "", telephone: "" },
            ],
            Methode_de_paiement: "",
            wallet: undefined,
            Numero_wallet: "",
            Numero_cheque: "",
            Nom_Banque: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sousCouvertures",
    });

    const handleAdd = () => {
        append({ societe: "", personne: "", adresse: "", telephone: "" });
        setTotalMontant((prev) => prev + montantParSousCouverture);
    };

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
            setTotalMontant((prev) => prev - montantParSousCouverture);
        }
    };
    const onSubmit = (values: SousCouvertFormValues) => {
        console.log(values);
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
                                                <Input
                                                    placeholder="Exemple: 123 rue Principale"
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
                                            <FormLabel>Numéro de téléphone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Exemple: 0123456789"
                                                    {...field}
                                                />
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
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisissez une méthode" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="credit">Crédit</SelectItem>
                                                <SelectItem value="cheque">Chèque</SelectItem>
                                                <SelectItem value="cash">Cash</SelectItem>
                                                <SelectItem value="wallet">Wallet</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.getValues("Methode_de_paiement") === "wallet" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="wallet"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Choisir un Wallet</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisissez un wallet" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cac pay">CAC Pay</SelectItem>
                                                        <SelectItem value="d-money">D-Money</SelectItem>
                                                        <SelectItem value="waafi">Waafi</SelectItem>
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
                                            <FormLabel>Numero wallet</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Exemple: 77 20 21 10" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {form.getValues("Methode_de_paiement") === "cheque" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="Numero_cheque"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Numero du cheque</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Entre le numero cheque .." />
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
                                            <FormLabel>Nom du banque</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Entre le nom du banque..." />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <div className="text-lg font-semibold text-right">
                            Montant Total :{" "}
                            <span>{totalMontant.toLocaleString()} DJF</span>
                        </div>

                        {/* Bouton */}
                        <div className="col-span-2">
                            <Button type="submit" className="w-full bg-blue-900 text-white">
                                Continuer
                            </Button>
                        </div>
                    </form>
                </Form>
            </ScrollArea>
        </div>
    )
}

export default StepTwoForm