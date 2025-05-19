"use server";

interface dataType {
    sousCouvertures: {
        societe: string;
        personne: string;
        adresse: string;
        telephone: string;
    }[];
    Methode_de_paiement: string;
    totalMontant: number;
    Wallet?: string | undefined;
    Numero_wallet?: string | undefined;
    Numero_cheque?: string | undefined;
    Nom_Banque?: string | undefined;
}

export const SousCouvertPaiement = async (clientId: string,UserId:string | undefined, data: dataType) => {
    const api = `http://192.168.0.12/gbp_backend/api.php?method=AddSousCouverteClients&id=${UserId}&idClient=${clientId}`;
    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur côté serveur :", errorData);
            return { success: false, error: errorData };
        }

        const result = await response.json();

        if (result?.error) {
            console.log(result?.error);
            return { error: result?.error };

        }
        console.log("Réponse réussie :", result);
        return { success: result?.success };
    } catch (error) {
        console.error("Erreur réseau :", error);
        return { success: false, error: "Erreur réseau" };
    }
};
