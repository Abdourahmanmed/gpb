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
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NouveauClientSchemaStepTwo } from '@/Schema/schema';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const StepThreeForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof NouveauClientSchemaStepTwo>>({
    resolver: zodResolver(NouveauClientSchemaStepTwo),
    defaultValues: {
      Abonnement: '',
      patent_quitance: '',
      Identiter: ''
    },
  });

  const onSubmit = (values: z.infer<typeof NouveauClientSchemaStepTwo>) => {
    console.log(values); // Remplacez par votre logique
    router.push("/Agent_guiche/Nouveau_client/StepTwoForm");
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
                    {...field}
                    type='file'
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
            name="patent_quitance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>patent/quittance:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Exemple : Fatouma" type='file' />
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
                  <Input {...field} placeholder="Exemple : 77101010" type='file' />
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
  )
}

export default StepThreeForm