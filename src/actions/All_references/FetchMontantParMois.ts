"use server";

export const FetchMontantParMois = async () => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=getTotalParMois`;

    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Erreur de l'API : ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        // CORRECTION ICI
        if (!responseData.count || responseData.count.length === 0) {
            throw new Error("Les données reçues ne sont pas valides ou vides.");
        }

        return responseData.count[0].total; // Accède au premier élément du tableau
    } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
        return 0; // Retourne 0 en cas d'erreur
    }
};
