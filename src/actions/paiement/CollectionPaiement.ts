"use server";

interface dataType {
    Adresse_collection: string;
    Montant: 5000;
    Methode_de_paiement: "cheque" | "cash" | "wallet";
    Wallet?: "cac_pay" | "waafi" | "d_money" | "sabapay" | "dahabplaces" | undefined;
    Numero_wallet?: string | undefined;
    Numero_cheque?: string | undefined;
    Nom_Banque?: string | undefined;
    ReferenceId?: string | undefined;
}

export const CollectionPaiement = async (clientId: string,UserId:string | undefined, data: dataType) => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=AddCollectionClients&id=${UserId}&idClient=${clientId}`;
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
