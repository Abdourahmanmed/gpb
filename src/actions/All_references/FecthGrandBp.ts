"use server";

export const FetchGrandBp = async () => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=getGrandeBoitesPostalesCount`;

    try {
        // Effectuer la requête fetch
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Définit le type de contenu attendu
            },
            cache: "no-store", // Empêche la mise en cache pour garantir que les données sont à jour
        });

        // Vérifier si la réponse est correcte (statut 200-299)
        if (!response.ok) {
            throw new Error(
                `Erreur de l'API : ${response.status} ${response.statusText}`
            );
        }

        // Parse la réponse en JSON
        const responseData = await response.json();

        // Vérifier si les données sont valides
        if (!responseData.count) {
            throw new Error(
                "Les données reçues ne sont pas valides ou ne sont pas au format attendu."
            );
        }

        return responseData.count; // Retourne les données si tout va bien
    } catch (error) {
        // Gérer les erreurs et les logs
        console.error("Erreur lors de l'appel API :", error);

        // Vous pouvez gérer les retours en cas d'erreur (par exemple, retourner une liste vide ou une valeur spécifique)
        return []; // Retourne une liste vide en cas d'erreur
    }
};
