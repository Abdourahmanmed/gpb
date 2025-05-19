"use client";
import { useEffect, useState } from "react";
import { AnimatedModalDemo } from "../ModelDemo";

interface ModelProps {
    Nbr: number;
    Nom: string;
    Clients: number;
}

// Typage des données récupérées depuis l'API (remplace `any` par une structure précise si possible)
interface SousCouvertInfo {
    id: number;
    Nom_societe: string;
    Nom_personne: string;
    Telephone: string;
    Adresse: string;
    // Ajoute d'autres champs selon ta base de données
}

const ClientsCellAction: React.FC<ModelProps> = ({ Nbr, Clients, Nom }) => {
    const [FetcNbrSCInfo, SetFetcNbrSCInfo] = useState<SousCouvertInfo[]>([]);
    const [Error, SetError] = useState<string | null>(null);
    const [Loading, SetLoading] = useState<boolean>(false);
    // console.log(Clients)

    const FetchSousCouvert = async (): Promise<void> => {
        const api = `http://192.168.0.12/gbp_backend/api.php?method=GetSousCouvertInfo&ClientId=${Clients}`;

        SetLoading(true);
        SetError(null);

        try {
            const response = await fetch(api, { method: "GET" });

            if (!response.ok) {
                SetError(`Erreur HTTP ! Statut :`);
            }

            const data = await response.json();

            if (data.error) {
                SetError(data.error); // Propage l'erreur du serveur
            }

            SetFetcNbrSCInfo(data); // Stocke les données récupérées
        } catch (error) {
            SetError("Erreur du ")
            console.log("Erreur de :", error)
        } finally {
            SetLoading(false);
        }
    };

    useEffect(() => {
        FetchSousCouvert();
    }, [Clients]); // Recharge les données si Clients change

    return (
        <AnimatedModalDemo
            Nbr={Nbr}
            Nom={Nom}
            data={FetcNbrSCInfo}
            loading={Loading}
            error={Error}
            Type="SousCouverte"
            Titre="Sous couverte"
        />
    );
};

export default ClientsCellAction;
