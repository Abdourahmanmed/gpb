"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { nextStep, updateField } from "@/Store/Slices/Multi-formSlice";
import { Input } from "@/components/ui/input";
import { NouveauClientSchemaStepTwo } from "@/Schema/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MethodePaiement = "credit" | "cheque" | "cash" | "wallet";

const StepThreeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const multiFormState = useSelector((state: RootState) => state.multiForm);
  const [files, setFiles] = useState<File[]>([]); // État local pour les fichiers réels

  const form = useForm<z.infer<typeof NouveauClientSchemaStepTwo>>({
    resolver: zodResolver(NouveauClientSchemaStepTwo),
    defaultValues: {
      Abonnement: multiFormState.Abonnement || undefined,
      patent_quitance: multiFormState.TypeClient
        ? multiFormState.patent_quitance || undefined
        : undefined,
      Identiter: multiFormState.Identiter || undefined,
      TypeClient: multiFormState.TypeClient ?? false,
      Methode_de_paiement: multiFormState.Methode_de_paiement,
      wallet: multiFormState.wallet || undefined,
      Numero_wallet: multiFormState.Numero_wallet || "",
      Numero_cheque: multiFormState.Numero_cheque || "",
      Nom_Banque: multiFormState.Nom_Banque || "",
    },
  });

  const handleFileChange = (field: any, index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const updatedFiles = [...files];
      updatedFiles[index] = file;
      setFiles(updatedFiles);
      field.onChange(file);
      dispatch(updateField({ field: field.name, value: file }));
    }
  };

  const onSubmit = (values: z.infer<typeof NouveauClientSchemaStepTwo>) => {
    Object.entries(values).forEach(([field, value]) => {
      dispatch(updateField({ field, value }));
    });
    console.log("Final submission data:", { ...values, files });
    dispatch(nextStep());
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
        Enregistrement d'un nouveau client
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <FormField
              control={form.control}
              name="Abonnement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abonnement :</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={handleFileChange(field, 0)} onBlur={field.onBlur} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("TypeClient") === true && (
              <FormField
                control={form.control}
                name="patent_quitance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patent/Quittance :</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleFileChange(field, 1)} onBlur={field.onBlur} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="Identiter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identité :</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={handleFileChange(field, 2)} onBlur={field.onBlur} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisissez une méthode" />
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
            {form.watch("Methode_de_paiement") === "wallet" && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="wallet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choisissez un wallet</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
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
                        <Input {...field} placeholder="77 20 21 10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {form.watch("Methode_de_paiement") === "cheque" && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="Numero_cheque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro du chèque</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Numéro du chèque" />
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
                        <Input {...field} placeholder="Nom de la banque" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full bg-blue-900 text-white">
            Continuer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StepThreeForm;
