"use client";

import React, { useEffect, useState } from "react";
import { ModelClientFacture } from "./ModelClientFacture";

interface Impaye {
    annee: number;
    montant: number;
    penalite: number;
    total: number;
}

interface ApiResponse {
    impayes: Impaye[];
    nouveau_nfacture: string;
}
interface ModelProps {
    Name: string;
    Nom: string;
    Clients: number;
}

const UnpaidInvoice: React.FC<ModelProps> = ({ Name, Clients, Nom }) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnpaid = async () => {
            try {
                const response = await fetch(
                    `http://192.168.0.12/gbp_backend/api.php?method=SelectUnpaiedPaiement&ClientId=${Clients}`
                );
                const json = await response.json();
                console.log(json)
                setData(json);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUnpaid();
    }, [Clients]);

    if (loading) return <p className="text-center">Chargement...</p>;

    return (
        <ModelClientFacture
            Name={Name}
            Nom={Nom}
            data={data}
            loading={loading}
            error={null}
            Titre="Facture"
        />
    );
};

export default UnpaidInvoice;
