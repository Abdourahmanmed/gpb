"use client";

import { useEffect, useState } from "react";
import { ModelFacture } from "../ModelFacture";

interface ModelProps {
    Name: string;
    Nom: string;
    Clients: number;
}

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

// Typage des données récupérées depuis l'API
interface FactureInfo {
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

const FactureCelleAction: React.FC<ModelProps> = ({ Name, Clients, Nom }) => {
    const [factures, setFactures] = useState<FactureInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchFactures = async (): Promise<void> => {
        const apiUrl = `http://192.168.0.15/gbp_backend/api.php?method=GetFactureClient&ClientId=${Clients}`;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(apiUrl, { method: "GET" });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Vérifier si data est un tableau avant de l'affecter
            if (Array.isArray(data)) {
                setFactures(data);
            } else {
                throw new Error("Données invalides reçues de l'API.");
            }
        } catch (error: any) {
            setError(error.message || "Une erreur inconnue s'est produite.");
            console.error("Erreur lors du chargement des factures :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Clients) {
            fetchFactures();
        }
    }, [Clients]); // Recharge les données si Clients change

    return (
        <ModelFacture
            Name={Name}
            Nom={Nom}
            data={factures}
            loading={loading}
            error={error}
            Titre="Reçue"
        />
    );
};

export default FactureCelleAction;
