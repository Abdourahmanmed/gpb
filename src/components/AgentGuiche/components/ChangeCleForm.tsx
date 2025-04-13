"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AchatCleSchema,
  MontantSaiasiSchema,
} from "@/Schema/schema";
import HeaderImprimary from "./HeaderImprimary";
import Imprimery from "./Imprimery";
import { GetLastReferenceOfCLE } from "@/actions/All_references/GetLastReferenceOfCLE";
import { ChangementClePaiement } from "@/actions/paiement/ClePaiement";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de react-toastify
import { useSession } from "next-auth/react";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";

// Typages
type MethodePaiement = "credit" | "cheque" | "cash" | "wallet";
type WalletOptions =
  | "cac_pay"
  | "waafi"
  | "d_money"
  | "sabapay"
  | "dahabplaces";

// Typage du formulaire
type PaiementFormValues = z.infer<typeof AchatCleSchema>;
type MontantSaisi = z.infer<typeof MontantSaiasiSchema>;

interface PaymentFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ClientId: string;
  TypeClient: string;
}

export const ChangeCleForm: React.FC<PaymentFormProps> = ({
  isOpen,
  setIsOpen,
  ClientId,
  TypeClient
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    MethodePaiement | undefined
  >(undefined);
  const [donnees, setDonnees] = useState<PaiementFormValues | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  // État pour gérer l'incrément du numéro
  const [currentNumber] = useState(1);
  const [recueNumber, setRecueNumber] = useState("");

  const [PrintJS, setPrintJS] = useState<any>(null); // Référence à printJS
  const printAreaRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const confettiRef = useRef<ConfettiRef>(null);
  const [isSucessOpen, setisSucessOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [Amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchLastReference = async () => {
      try {
        // Récupérer la dernière référence depuis la base de données
        const lastReference = await GetLastReferenceOfCLE();

        // Générer la date actuelle
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format AAAA-MM-JJ
        const anneeActuelle = currentDate.getFullYear();

        if (!lastReference) {
          // Si aucune référence n'existe, générer un nouveau numéro
          const paddedNumber = String(currentNumber).padStart(5, "0");
          const newRecueNumber = `CGCLE/${paddedNumber}/${formattedDate}`;
          setRecueNumber(newRecueNumber);
        } else {
          // Si une référence existe, analyser les données
          const lastReferenceParts = lastReference.split("/");
          const lastReferenceDate = lastReferenceParts.pop();
          const lastReferenceYear = lastReferenceDate.split("-")[0];
          const middleNumber = lastReferenceParts[1];

          if (lastReferenceYear !== anneeActuelle.toString()) {
            // Si l'année est différente, recommencer avec le numéro initial
            const paddedNumber = String(currentNumber).padStart(5, "0");
            const newRecueNumber = `CGCLE/${paddedNumber}/${formattedDate}`;
            setRecueNumber(newRecueNumber);
          } else {
            // Si l'année est identique, incrémenter le numéro
            const incrementee = (parseInt(middleNumber, 10) + 1)
              .toString()
              .padStart(5, "0");
            const newRecueNumber = `CGCLE/${incrementee}/${formattedDate}`;
            setRecueNumber(newRecueNumber);
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la référence :",
          error
        );
      }
    };

    fetchLastReference();
  }, [currentNumber]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Importer printJS uniquement côté client
      import("print-js").then((module) => {
        setPrintJS(() => module.default);
      });
    }
  }, []);

  const form = useForm<PaiementFormValues>({
    resolver: zodResolver(AchatCleSchema),
    defaultValues: {
      Montant: 0,
      Methode_de_paiement: undefined,
      Wallet: undefined,
      Numero_wallet: "",
      Numero_cheque: "",
      Nom_Banque: "",
      ReferenceId: "",
    },
  });

  const formMontantSaisi = useForm<MontantSaisi>({
    resolver: zodResolver(MontantSaiasiSchema),
    defaultValues: { montantSaisi: "" },
  });

  useEffect(() => {
    //verification de client 
    if (TypeClient == "Particulier") {
      setAmount(1500);
    } else {
      setAmount(3000);
    }
  }, [TypeClient])

  const onSubmit = (values: PaiementFormValues) => {
    try {
      let FinalAmount;
      // Assurez-vous que la référence est bien générée avant de continuer
      if (!recueNumber) {
        console.error("La référence n'est pas générée.");
        return;
      }
      //verification de client 
      if (TypeClient == "Particulier") {
        FinalAmount = 1500;
      } else {
        FinalAmount = 3000;
      }
      // Ajouter la référence dans les données avant d'envoyer la requête
      const finalData = {
        ...values,
        Montant: FinalAmount,
        ReferenceId: recueNumber, // Assurez-vous d'ajouter la valeur de recueNumber ici
        id_user: session?.user?.id,
      };

      // console.log(finalData);
      // Logique d'enregistrement (par exemple, sauvegarde des données)
      // console.log("Données soumises :", finalData);
      // console.log(recueNumber);

      // Met à jour les états nécessaires
      setDonnees(finalData); // Sauvegarde les valeurs dans un état
      setIsSummaryOpen(true); // Ouvre le résumé
      setIsOpen(false); // Ferme le formulaire
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  const handlePayer = async (value: MontantSaisi) => {
    if (parseInt(value.montantSaisi) !== donnees?.Montant) {
      toast.error(`Le montant saisi doit être exactement ${donnees?.Montant} DJF.`);
      return;
    }

    try {
      const enregistrement = await ChangementClePaiement(ClientId, session?.user?.id, donnees);

      if (enregistrement?.success) {
        setMessage(enregistrement?.success);
        setisSucessOpen(true);

        // Réinitialiser l'état après succès
        setIsSummaryOpen(false);
        form.reset();
      } else if (enregistrement?.error) {
        // Gestion des erreurs retournées par l'API
        toast.error(enregistrement.error || "Une erreur est survenue.");
      }
    } catch (error) {
      // Gestion des erreurs inattendues
      toast.error("Erreur lors de la communication avec le serveur.");
      console.log(error);
    }
  };

  const handleImprimary = () => {
    // Vérification que PrintJS est chargé et que l'élément à imprimer est bien disponible
    // Vérification que PrintJS est chargé et que le DOM est prêt
    if (PrintJS && printAreaRef.current) {
      PrintJS({
        printable: printAreaRef.current,
        type: "html",
        targetStyles: ["*"],
      });
    }
  };

  return (
    <>
      {/* formulaire principale */}
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent>
          <div>
            <DialogHeader>
              <DialogTitle className="text-primary text-xl">
                Changemnt cle
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="Montant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Montant</FormLabel>
                        <FormControl>
                          <Input {...field} value={Amount} disabled />
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
                            onValueChange={(value) => {
                              field.onChange(value as MethodePaiement);
                              setSelectedPaymentMethod(
                                value as MethodePaiement
                              );
                              // if (value !== "wallet") form.setValue("Wallet", undefined);
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
                        name="Wallet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Choisissez un wallet</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(value as WalletOptions)
                                }
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sélectionnez un wallet" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cac_pay">
                                    CAC Pay
                                  </SelectItem>
                                  <SelectItem value="waafi">Waafi</SelectItem>
                                  <SelectItem value="d_money">
                                    D-Money
                                  </SelectItem>
                                  <SelectItem value="sabapay">
                                    Saba-paye
                                  </SelectItem>
                                  <SelectItem value="dahabplaces">
                                    Dahab-Places
                                  </SelectItem>
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
                              <Input
                                {...field}
                                placeholder="Exemple: 77 20 21 10"
                              />
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
                            <FormLabel>Numero du cheque</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entre le numero cheque .."
                              />
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
                              <Input
                                {...field}
                                placeholder="Entre le nom du banque..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      className="bg-slate-500 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-primary text-white">
                      Next
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSucessOpen} onOpenChange={setisSucessOpen}>
        <DialogContent className=" p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
          <DialogHeader className="border-b-2 pb-4 mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-800">Imprimer</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <h1 className="text-2xl text-green-600 font-semibold bg-green-100 p-2 rounded-md">Felicitation {message}</h1>
            <Confetti
              ref={confettiRef}
              className="absolute left-0 top-0 z-0 size-full"
              onMouseEnter={() => {
                confettiRef.current?.fire({});
              }}
            />
          </div>
          <div
            id="print-area"
            ref={printAreaRef}
            className="rounded-md border  border-gray-300 p-4 flex flex-col items-center w-full"
          >
            <HeaderImprimary />
            {donnees && (
              <Imprimery
                donnees={donnees}
                recueNumber={recueNumber}
                NomRecue="Achat cle"
              />
            )}
          </div>
          <div className="flex justify-end space-y-2">
            <Button onClick={handleImprimary} type="submit">Imprimer</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* formulaire d'enregistrement et facture  */}
      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
          <ScrollArea className="max-h-[70vh] w-full">
            <ToastContainer />
            <DialogHeader className="border-b-2 pb-4 mb-6">
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Résumé des informations achat cle
              </DialogTitle>
            </DialogHeader>

            {/* Section à imprimer */}
            <div
              className="rounded-md border  border-gray-300 p-4 flex flex-col items-center w-full"
            >
              <HeaderImprimary />

              {donnees && (
                <Imprimery
                  donnees={donnees}
                  recueNumber={recueNumber}
                  NomRecue="Achat cle"
                />
              )}
            </div>

            {/* Formulaire de Paiement */}
            <Form {...formMontantSaisi}>
              <form
                onSubmit={formMontantSaisi.handleSubmit(handlePayer)}
                className="mt-6 flex gap-8 flex-col"
              >
                <FormField
                  control={formMontantSaisi.control}
                  name="montantSaisi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrer le montant</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Saisir le montant total"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                >
                  Payer et Imprimer
                </Button>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
