"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import HeaderImprimary from "../HeaderImprimary";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./animated-modal";
import { useEffect, useRef, useState } from "react";
// Définition du type pour chaque catégorie
interface Category {
    Categorie: string;
    Methode_Paiement_Categorie: string;
    Wallet_de_Categorie: string;
    Numero_Telephone_categorie: string;
    Nom_banque_categorie: string;
    Numero_banque_categorie: string;
    Montant_categorie: number;
}

// Définition du type pour un paiement
interface Payment {
    Redevance: string;
    Nom: string;
    Reference: string;
    Methode_de_paiement_anne: string;
    Montant_Redevance: number;
    Wallet_de_redevance: string;
    Numero_wallet: string;
    Banque: string;
    Numero_cheque: string;
    Categorie: string; // Ajout de la propriété "Categorie" (elle manquait)
    Methode_Paiement_Categorie: string; // Ajout de la propriété "Methode_Paiement_Categorie"
    Wallet_de_Categorie: string; // Ajout de la propriété "Wallet_de_Categorie"
    Numero_Telephone_categorie: string; // Ajout de la propriété "Numero_Telephone_categorie"
    Nom_banque_categorie: string; // Ajout de la propriété "Nom_banque_categorie"
    Numero_banque_categorie: string; // Ajout de la propriété "Numero_banque_categorie"
    Montant_categorie: number; // Ajout de la propriété "Montant_categorie"
    categories: Category[]; // Liste des catégories associées à ce paiement
}

// Définition des types pour les props de la fonction `ModelFacture`
interface ModelProps {
    Name: string;
    Nom: string;
    data: Payment[]; // Données des paiements
    loading: boolean;
    error: string | null;
    Titre: string;
}

export function ModelFacture({
    Name,
    Nom,
    data,
    loading,
    error,
    Titre,
}: ModelProps) {
    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null);

    //importe le module print-js
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Importer printJS uniquement côté client
            import("print-js").then((module) => {
                setPrintJS(() => module.default);
            });
        }
    }, []);

    //fonction pour imprimer 
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

    // Grouper les catégories par paiement
    const groupedData = data.reduce((acc: { [key: string]: Payment }, item) => {
        // Crée une clé unique pour chaque paiement
        const key = `${item.Reference}-${item.Methode_de_paiement_anne}`;
        if (!acc[key]) {
            acc[key] = { ...item, categories: [] };
        }
        // Ajoute les informations de catégorie à chaque paiement
        acc[key].categories.push({
            Categorie: item.Categorie,
            Methode_Paiement_Categorie: item.Methode_Paiement_Categorie || "", // Valeur par défaut si non précisé
            Wallet_de_Categorie: item.Wallet_de_Categorie || "N", // Valeur par défaut
            Numero_Telephone_categorie: item.Numero_Telephone_categorie || "", // Valeur par défaut
            Nom_banque_categorie: item.Nom_banque_categorie || "", // Valeur par défaut
            Numero_banque_categorie: item.Numero_banque_categorie || "", // Valeur par défaut
            Montant_categorie: item.Montant_categorie || 0 // Valeur par défaut pour Montant_categorie
        });
        return acc;
    }, {});

    return (
        <div className="flex items-center justify-center">
            <Modal>
                <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">{Name}</span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ➡️
                    </div>
                </ModalTrigger>

                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Les informations{" "}
                            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                {Titre}
                            </span>{" "}
                            du client {Nom}
                        </h4>
                        <ScrollArea className="h-[400px] w-full rounded-md" >
                            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto" ref={printAreaRef}>
                                {/* Affichage du chargement */}
                                {loading ? (
                                    <p className="text-center text-gray-500">Chargement en cours...</p>
                                ) : error ? (
                                    <p className="text-center text-red-500">⚠️ Erreur : {error}</p>
                                ) : data.length > 0 && (
                                    <div className="w-full " ref={printAreaRef}>

                                        <HeaderImprimary />
                                        <div className="w-full mt-4">
                                            {/* Itérer sur les paiements */}
                                            {Object.keys(groupedData).map((key) => {
                                                const payment = groupedData[key];
                                                return (
                                                    <div key={key} className="mb-4" >
                                                        <h5 className="font-bold text-xl">N.acture : {payment.Reference}</h5>
                                                        <div className="mt-2">
                                                            {/* Afficher les informations principales */}
                                                            <p>Redevance: {payment.Redevance}</p>
                                                            <p>Nom: {payment.Nom}</p>
                                                            <p>Methode de paiement : {payment.Methode_de_paiement_anne}</p>
                                                            <p>Montant: {payment.Montant_Redevance}</p>
                                                            {/* Afficher les sous-tableaux de catégories */}
                                                            <table className="w-full mt-4">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Catégorie</th>
                                                                        <th>Méthode de Paiement</th>
                                                                        <th>Montant</th>
                                                                        <th>Numéro de Téléphone</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {payment.categories.map((category, index) => (
                                                                        <tr key={index}>
                                                                            <td>{category.Categorie}</td>
                                                                            <td className="text-center">{category.Methode_Paiement_Categorie}</td>
                                                                            <td>{category.Montant_categorie}</td>
                                                                            <td>{category.Numero_Telephone_categorie}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </ModalContent>
                    <ModalFooter className="gap-4">
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28" onClick={handleImprimary}>
                            Imprimer
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}
