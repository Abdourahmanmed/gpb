import { FetchAllClients } from '@/actions/FetchClient';
import { NextApiRequest, NextApiResponse } from 'next';

// Définir le type pour les données des clients
interface Client {
    id: string;
    Nom: string;
    NBp: string;
    Etat: string;
    Telephone: string;
    Redevance: string;
    sous_couvert: string;
    Domocile: string;
    Date_abonnement: string;
    Adresse: string;
    TypeClient: string;
    Type_boite_postale: string;
    [key: string]: any; // Propriétés supplémentaires si nécessaire
}

// Définir le type pour la réponse
type Data =
    | { clients: Client[] } // Cas de succès
    | { error: string }; // Cas d'erreur

// Gestionnaire d'API pour récupérer les abonnés
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
): Promise<void> {
    try {
        // Récupérer les clients en appelant la fonction FetchAllClients
        const clients = await FetchAllClients();

        // Vérifiez si les données sont valides
        if (!Array.isArray(clients)) {
            // Retourner une erreur si les données ne sont pas valides
            return res.status(500).json({
                error: 'Les données reçues ne sont pas valides.',
            });
        }

        // Retourner les clients en réponse
        return res.status(200).json({ clients });
    } catch (error: unknown) {
        // Gestion des erreurs
        console.error('Erreur API :', error);

        // Retourner une erreur générique
        return res.status(500).json({
            error:
                error instanceof Error
                    ? error.message
                    : 'Une erreur inconnue est survenue.',
        });
    }
}
