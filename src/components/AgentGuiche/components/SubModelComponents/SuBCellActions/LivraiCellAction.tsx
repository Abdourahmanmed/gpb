"use client";
import { useEffect, useState } from "react";
import { AnimatedModalDemo } from "../ModelDemo";

interface ModelProps {
    Nbr: number;
    Nom: string;
    Clients: number;
}

// Typage des données récupérées depuis l'API (remplace `any` par une structure précise si possible)
interface LvdInfo {
    id: number;
    Adresse: string;
    // Ajoute d'autres champs selon ta base de données
}

const LVDCellAction: React.FC<ModelProps> = ({ Nbr, Clients, Nom }) => {
    const [FetcNbrLvdInfo, SetFetcNbrLvdInfo] = useState<LvdInfo[]>([]);
    const [Error, SetError] = useState<string | null>(null);
    const [Loading, SetLoading] = useState<boolean>(false);
    // console.log(Clients)

    const FetchSousCouvert = async (): Promise<void> => {
        const api = `http://localhost/gbp_backend/api.php?method=GetLDVInfo&ClientId=${Clients}`;

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

            SetFetcNbrLvdInfo(data); // Stocke les données récupérées
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
            data={FetcNbrLvdInfo}
            loading={Loading}
            error={Error}
            Type="SousCouverte"
            Titre="Livraison à domicile"
        />
    );
};

export default LVDCellAction;
