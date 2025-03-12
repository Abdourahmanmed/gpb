"use server";

export const FetchAllUsers = async () => {
    const api = `http://localhost/gbp_backend/api.php?method=getAllUsers`;

    try {
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Erreur de l'API : ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData || !Array.isArray(responseData)) {
            throw new Error('Les données reçues ne sont pas valides ou ne sont pas au format attendu.');
        }

        return responseData;
    } catch (error) {
        console.error('Erreur lors de l\'appel API :', error);
        return [];
    }
};

export const GetUserByEmail = async (email: string) => {
    if (!email) {
        throw new Error("L'email est requis pour rechercher un utilisateur.");
    }

    try {
        const users = await FetchAllUsers();

        // Recherche de l'utilisateur par email
        const user = users.find(user => user.Email.toLowerCase() === email.toLowerCase());

        return user ? user : null;
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur :", error);
        return null;
    }
};
