"use client"
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { nextStep, updateField } from '@/Store/Slices/Multi-formSlice';
import { Input } from '@/components/ui/input';
import { NouveauClientSchemaStepTwo } from '@/Schema/schema';
import { Button } from '@/components/ui/button';

const StepThreeForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const multiFormState = useSelector((state: RootState) => state.multiForm);

  const form = useForm<z.infer<typeof NouveauClientSchemaStepTwo>>({
    resolver: zodResolver(NouveauClientSchemaStepTwo),
    defaultValues: multiFormState,
  });

  const onSubmit = (values: z.infer<typeof NouveauClientSchemaStepTwo>) => {
    // Mise à jour des champs dans Redux
    Object.entries(values).forEach(([field, value]) => {
      dispatch(updateField({ field, value }));
    });
    console.log(values);

    dispatch(nextStep()); // Passer à l'étape suivante
  };

  const handleFileChange = (field: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    field.onChange(file); // Mise à jour de la valeur du fichier
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
        Enregistrement d'un nouveau client
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Abonnement */}
          <FormField
            control={form.control}
            name="Abonnement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abonnement :</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange(field)} // Gestion du changement de fichier
                    onBlur={field.onBlur} // OnBlur pour la validation
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nom */}
          <FormField
            control={form.control}
            name="patent_quitance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>patent/quittance:</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange(field)} // Gestion du changement de fichier
                    onBlur={field.onBlur} // OnBlur pour la validation
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Téléphone */}
          <FormField
            control={form.control}
            name="Identiter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identiter :</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    name={field.name}
                    onChange={handleFileChange(field)} // Gestion du changement de fichier
                    onBlur={field.onBlur} // OnBlur pour la validation
                  />
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

export default StepThreeForm;
