"use server"
export const GetLastReferenceOfLDV = async () => {
    const api = `http://localhost/gbp_backend/api.php?method=getLastReferenceLivraisonDomicile`;

    try {
        // Effectuer la requête fetch
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Définit le type de contenu attendu
            },
            cache: 'no-store', // Empêche la mise en cache pour garantir que les données sont à jour
        });

        // Vérifier si la réponse est correcte (statut 200-299)
        if (!response.ok) {
            throw new Error(`Erreur de l'API : ${response.status} ${response.statusText}`);
        }

        // Parse la réponse en JSON
        const responseData = await response.json();

        //verification si laste reference est null 
        if (responseData?.reference_livraison_domicile === null) {
            return responseData.reference_livraison_domicile
        }

        return responseData.reference_livraison_domicile; // Retourne les données si tout va bien
    } catch (error) {
        // Gérer les erreurs et les logs
        console.error('Erreur lors de l\'appel API :', error);

        // Vous pouvez gérer les retours en cas d'erreur (par exemple, retourner une liste vide ou une valeur spécifique)
        return []; // Retourne une liste vide en cas d'erreur
    }
}