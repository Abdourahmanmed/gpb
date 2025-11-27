"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import HeaderImprimary from "../HeaderImprimary";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./animated-modal";
import { useEffect, useRef, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import ReceiptChangement from "../../ReceiptChangement";

// Types
interface Category {
  Categorie: string;
  Methode_Paiement_Categorie: string;
  Wallet_de_Categorie: string;
  Numero_Telephone_categorie: string;
  Nom_banque_categorie: string;
  Numero_banque_categorie: string;
  Montant_categorie: number;
}

interface Payment {
  id: string;
  Annee_abonnement: string;
}

interface Facture {
  Redevance: string;
  Nom: string;
  NBP: string;
  TypeBP: string;
  Reference: string;
  Methode_de_paiement_anne: string;
  TypeClient: string;
  Montant_Redevance: number;
  Wallet_de_redevance: string;
  Numero_wallet: string;
  Banque: string;
  Numero_cheque: string;
  Categorie: string;
  Methode_Paiement_Categorie: string;
  Wallet_de_Categorie: string;
  Numero_Telephone_categorie: string;
  Nom_banque_categorie: string;
  Numero_banque_categorie: string;
  Montant_categorie: number;
  categories: Category[];
}

interface FactureCategorie {
  Montant: number;
  reference: string;
  Methode_paiement: string;
}

interface ModelProps {
  Name: string;
  Nom: string;
  NBP: string;
  Clients: number;
  TypeBP: string;
  data: Payment[];
  loading: boolean;
  error: string | null;
  Titre: string;
}

export function ModelFacture({
  Name,
  Nom,
  Clients,
  data,
  loading,
  error,
  Titre,
  NBP,
  TypeBP,
}: ModelProps) {
  const [PrintJS, setPrintJS] = useState<any>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedAbonnement, setSelectedAbonnement] = useState<string | null>(
    null
  );
  const [factureYear, setFactureYear] = useState<Facture[]>([]);
  const [factureCategorie, setFactureCategorie] = useState<FactureCategorie[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedReference, setSelectedReference] = useState<string | null>(
    null
  );
  const [loadingSub, setLoadingSub] = useState(false);

  const categories = [
    "Par ans",
    "Changement_Nom",
    "Achat_cle",
    "collecte",
    "sous_couverte",
    "livraison_a_domicile",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("print-js").then((module) => {
        setPrintJS(() => module.default);
      });
    }
  }, []);

  const groupedData = factureYear.reduce(
    (acc: { [key: string]: Facture }, item) => {
      const key = `${item.Reference}-${item.Methode_de_paiement_anne}`;
      if (!acc[key]) {
        acc[key] = { ...item, categories: [] };
      }
      acc[key].categories.push({
        Categorie: item.Categorie,
        Methode_Paiement_Categorie: item.Methode_Paiement_Categorie || "",
        Wallet_de_Categorie: item.Wallet_de_Categorie || "N",
        Numero_Telephone_categorie: item.Numero_Telephone_categorie || "",
        Nom_banque_categorie: item.Nom_banque_categorie || "",
        Numero_banque_categorie: item.Numero_banque_categorie || "",
        Montant_categorie: item.Montant_categorie || 0,
      });
      return acc;
    },
    {}
  );

  const FactureContent = (payment: Facture, total: number) => (
    <div className="p-4 rounded-md shadow-sm bg-white dark:bg-neutral-900 w-full">
      <HeaderImprimary Reference={payment.Reference} />
      <div className="flex flex-col mb-2 text-gray-700 dark:text-gray-300">
        <strong className="text-[0.4rem]">Boulevard de la République</strong>
        <span className="text-[0.4rem]">
          <strong>Tél :</strong> +253 21 35 48 02 / +253 21 25 03 12
        </span>
        <span className="text-[0.4rem]">
          <strong>Email :</strong>{" "}
          <a href="mailto:contact@laposte.dj" className="underline">
            contact@laposte.dj
          </a>
        </span>
        <span className="text-[0.4rem]">
          <strong>Site web :</strong>{" "}
          <a
            href="http://www.laposte.dj"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.laposte.dj
          </a>
        </span>
      </div>

      <h5 className="font-bold text-xl mt-6">Client : {payment.Nom}</h5>
      <h5 className="font-bold text-xl mt-6">
        NBP : {NBP}-- {TypeBP}
      </h5>

      <table className="w-full border border-gray-300 mt-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border" rowSpan={2}>
              Redevance
            </th>
            <th className="p-2 border" rowSpan={2}>
              Type
            </th>
            <th className="p-2 border" colSpan={5}>
              Service additionnel
            </th>
            <th className="p-2 border" colSpan={6}>
              Méthode de Paiement
            </th>
            <th className="p-2 border" rowSpan={2}>
              Montant
            </th>
          </tr>
          <tr className="bg-gray-100">
            <th className="p-2 border">SC</th>
            <th className="p-2 border">Ld</th>
            <th className="p-2 border">Coll</th>
            <th className="p-2 border">AClé</th>
            <th className="p-2 border">CNom</th>
            <th className="p-2 border">Rd</th>
            <th className="p-2 border">SC</th>
            <th className="p-2 border">Ld</th>
            <th className="p-2 border">Coll</th>
            <th className="p-2 border">AClé</th>
            <th className="p-2 border">CNom</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2 border font-semibold">{payment.Redevance}</td>
            <td className="p-2 border font-semibold">{payment.TypeClient}</td>
            {[
              "sous_couverte",
              "livraison_a_domicile",
              "collecte",
              "Achat_cle",
              "Changement_Nom",
            ].map((categoryName) => {
              const hasCategory = payment.categories.some(
                (cat) => cat.Categorie === categoryName
              );
              return (
                <td key={categoryName} className="p-2 border text-center">
                  {hasCategory ? <Check /> : <X />}
                </td>
              );
            })}

            {/* Méthodes */}
            <td className="p-2 border text-center" colSpan={6}>
              {payment.Methode_de_paiement_anne}
            </td>

            {/* Montant */}
            <td className="p-2 border font-bold text-center w-[300px]">
              {payment.Montant_Redevance} <br />
              {[
                "sous_couverte",
                "livraison_a_domicile",
                "collecte",
                "Achat_cle",
                "Changement_Nom",
              ].map((categoryName) => {
                const category = payment.categories.find(
                  (cat) => cat.Categorie === categoryName
                );
                return (
                  <span key={categoryName} className="p-2">
                    {category ? (
                      <>
                        {category.Montant_categorie} <br />
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                );
              })}
            </td>
          </tr>

          <tr>
            <td colSpan={13} className="p-2 border text-right font-bold">
              Total
            </td>
            <td colSpan={6} className="p-2 border font-bold text-right">
              {total} <span className="text-[0.5rem]">FDJ</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const handleImprimary = () => {
    if (PrintJS && printAreaRef.current) {
      PrintJS({
        printable: printAreaRef.current,
        type: "html",
        targetStyles: ["*"],
      });
    }
  };

  // 🟢 Charger les factures de l'année
  const fetchFactureYear = async (year: string, abonnementId: string) => {
    setLoadingSub(true);
    setSelectedYear(year);
    setSelectedAbonnement(abonnementId);
    setFactureCategorie([]);
    setSelectedCategory("Par ans");
    setSelectedReference(null);

    try {
      const res = await fetch(
        `http://192.168.0.12/gbp_backend/api.php?method=GetFactureClient&ClientId=${Clients}&Year=${year}`
      );
      const json = await res.json();
      console.log(json);
      if (Array.isArray(json)) {
        setFactureYear(json);
      } else {
        setFactureYear([]);
      }
    } catch (err) {
      console.error("Erreur lors du chargement de facture par année :", err);
    } finally {
      setLoadingSub(false);
    }
  };

  // 🟢 Charger les factures additionnelles
  const fetchFactureCategorie = async (category: string) => {
    if (!selectedAbonnement) return;
    setSelectedCategory(category);
    setLoadingSub(true);

    try {
      const res = await fetch(
        `http://192.168.0.12/gbp_backend/api.php?method=GetFacturePerAdditionelService&IdAb=${selectedAbonnement}&Category=${category}`
      );
      const json = await res.json();
      console.log(json);
      if (Array.isArray(json)) setFactureCategorie(json);
      else setFactureCategorie([]);
    } catch (err) {
      console.error("Erreur lors du chargement de facture catégorie :", err);
    } finally {
      setLoadingSub(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-primary dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {Name}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ➡️
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent className="w-full">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6">
              Les informations{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                {Titre}
              </span>{" "}
              du client {Nom}
            </h4>

            {/* 🔹 Liste des années */}
            <ScrollArea className="h-[450px] w-full rounded-md px-4">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
                </div>
              ) : error ? (
                <p className="text-red-600 text-center">{error}</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-3 mb-6 justify-center">
                    {data.map((item) => (
                      <button
                        key={item.id}
                        onClick={() =>
                          fetchFactureYear(
                            item.Annee_abonnement,
                            item.id.toString()
                          )
                        }
                        className={`px-4 py-2 rounded-md border ${
                          selectedYear === item.Annee_abonnement
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {item.Annee_abonnement}
                      </button>
                    ))}
                  </div>

                  {/* 🔹 Détails facture d'une année */}
                  {selectedYear && factureYear.length > 0 && (
                    <div className="p-4 border rounded-md bg-gray-50">
                      <h5 className="font-semibold mb-3">
                        Facture {selectedYear}
                      </h5>

                      {/* Sélecteur de catégorie */}
                      <select
                        className="border p-2 rounded-md mb-4"
                        value={selectedCategory}
                        onChange={(e) => fetchFactureCategorie(e.target.value)}
                      >
                        <option value="">
                          -- Sélectionner une catégorie --
                        </option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                      {selectedCategory == "Par ans" ? (
                        data.length > 0 ? (
                          Object.keys(groupedData).map((key) => {
                            const payment = groupedData[key];
                            const total =
                              parseInt(payment.Montant_Redevance) +
                              payment.categories.reduce(
                                (sum, cat) => sum + cat.Montant_categorie,
                                0
                              );

                            return (
                              <div
                                key={key}
                                className="print-section"
                                ref={printAreaRef}
                              >
                                {/* Partie client */}
                                {FactureContent(payment, total)}
                                <div className="w-full flex  justify-end mr-56 text-3xl font-semibold mb-20">
                                  Service commerciale
                                </div>

                                {/* Ligne de séparation */}
                                <div className="border-t-2 border-dashed my-6"></div>

                                {/* Partie archive */}
                                {FactureContent(payment, total)}
                                <div className="w-full flex justify-end mr-56 text-3xl font-semibold">
                                  Service commerciale
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-center text-gray-400">
                            Aucune donnée disponible
                          </p>
                        )
                      ) : loadingSub ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="animate-spin w-5 h-5 text-blue-500" />
                        </div>
                      ) : (
                        factureCategorie.length > 0 && (
                          <div className="space-y-2">
                            {factureCategorie.map((f, i) => (
                              <div
                                key={i}
                                onClick={() =>
                                  setSelectedReference(f.reference)
                                }
                                className="cursor-pointer p-3 border rounded-md bg-white hover:bg-gray-100 flex justify-between items-center"
                              >
                                <span className="font-medium">
                                  {f.reference}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {f.Montant} Djf
                                </span>
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* 🔹 Dialogue du reçu */}
                  {selectedReference && (
                    <div
                      className="flex flex-col gap-6 print-container"
                      ref={printAreaRef}
                    >
                      <ReceiptChangement
                        dataClient={{
                          Nom,
                          NBP,
                          Type: TypeBP,
                          Redevance: selectedYear,
                          TypeClient: factureYear[0]?.TypeClient || "Inconnu",
                        }}
                        donnees={{
                          Methode_de_paiement:
                            factureCategorie[0]?.Methode_paiement || "",
                          Montant: factureCategorie[0]?.Montant || 0,
                          Wallet: factureYear[0]?.Wallet_de_Categorie || null,
                          Numero_wallet:
                            factureYear[0]?.Numero_Telephone_categorie || "",
                          Numero_cheque:
                            factureYear[0]?.Numero_banque_categorie || "",
                          Nom_Banque:
                            factureYear[0]?.Nom_banque_categorie || "",
                        }}
                        recueNumber={selectedReference}
                        category={selectedCategory}
                      />
                      <ReceiptChangement
                        dataClient={{
                          Nom,
                          NBP,
                          Type: TypeBP,
                          Redevance: selectedYear,
                          TypeClient: factureYear[0]?.TypeClient || "Inconnu",
                        }}
                        donnees={{
                          Methode_de_paiement:
                            factureCategorie[0]?.Methode_paiement || "",
                          Montant: factureCategorie[0]?.Montant || 0,
                          Wallet: factureYear[0]?.Wallet_de_Categorie || null,
                          Numero_wallet:
                            factureYear[0]?.Numero_Telephone_categorie || "",
                          Numero_cheque:
                            factureYear[0]?.Numero_banque_categorie || "",
                          Nom_Banque:
                            factureYear[0]?.Nom_banque_categorie || "",
                        }}
                        recueNumber={selectedReference}
                        category={selectedCategory}
                      />
                    </div>
                  )}
                </>
              )}
            </ScrollArea>
            <ModalFooter className="flex justify-center mt-4">
              {selectedCategory !== "" && (
                <button
                  onClick={handleImprimary}
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-md"
                >
                  Imprimer
                </button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>

      {/* 🔹 Style Impression */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            font-size: 10pt;
          }
          .print-container {
            page-break-after: always;
          }
          .print-section {
            page-break-inside: avoid;
            margin-bottom: 20px;
          }
          table {
            font-size: 9pt;
          }
        }
      `}</style>
    </div>
  );
}
