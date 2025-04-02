"use client";
import { useEffect, useState } from "react";
import { AnimatedModalDemo } from "../ModelDemo";

interface ModelProps {
    Nbr: number;
    Nom: string;
    Clients: number;
}

// Typage des données récupérées depuis l'API (remplace `any` par une structure précise si possible)
interface CollectionInfo {
    id: number;
    Adresse: string;
    // Ajoute d'autres champs selon ta base de données
}

const ColectionCellAction: React.FC<ModelProps> = ({ Nbr, Clients, Nom }) => {
    const [FetcNbrCllInfo, SetFetcNbrCllInfo] = useState<CollectionInfo[]>([]);
    const [Error, SetError] = useState<string | null>(null);
    const [Loading, SetLoading] = useState<boolean>(false);
    // console.log(Clients)

    const FetchSousCouvert = async (): Promise<void> => {
        const api = `http://localhost/gbp_backend/api.php?method=GetCollectionInfo&ClientId=${Clients}`;

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

            SetFetcNbrCllInfo(data); // Stocke les données récupérées
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
            data={FetcNbrCllInfo}
            loading={Loading}
            error={Error}
            Type="SousCouverte"
            Titre="Collections"
        />
    );
};

export default ColectionCellAction;
