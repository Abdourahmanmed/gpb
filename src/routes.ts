/**
 * An array of routes used for authentication.
 * These routes will redirect logged-in users to their respective interfaces.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purposes.
 * @type {string}
 */
export const ApiauthPrefix = "/api/auth";


/**
 * The default redirect path after logging in for users with the role "superviseur".
 * @type {string}
 */
export const default_Superviseur_redirect = "/Superviseur/Dashbord";

/**
 * The default redirect path after logging in for users with the role "agent commerciale".
 * @type {string}
 */
export const default_agent_commercial_redirect = "/Agent_commercial/Les_abonnes";

/**
 * The default redirect path after logging in for users with the role "agent guihet".
 * @type {string}
 */
export const default_AgentGuichet_redirect = "/Agent_guiche/Rechercher";
/**
 * The default redirect path after logging in for users with the role "Pour les agents responsable commerciale".
 * @type {string}
 */
export const default_Responsable_redirect = "/Responsable_commerciale/Dashbord";

/**
 * An array of routes used for authenticated users with the role "superviseur".
 * These routes correspond to the superviseur's interface.
 * @type {string[]}
 */
export const SuperviseurRoutes = [
    "/Superviseur/Dashbord",
    "/Superviseur/Depot_de_resiliation",
    "/Superviseur/Les_Abonnes",
    "/Superviseur/Les_Agents",
    "/Superviseur/Liste_Boite_Postal",
    "/Superviseur/Notifications",
];

/**
 * An array of routes used for authenticated users with the role "Responsable commerciale".
 * These routes correspond to the teleconseiller's interface.
 * @type {string[]}
 */
export const AgentRsponsableRoutes = [
    "/Responsable_commerciale/Dashbord",
    "/Responsable_commerciale/Creation_des_utilisateur",
    "/Responsable_commerciale/Les_Abonnes",
    "/Responsable_commerciale/Enleve_les_penalites",
    "/Responsable_commerciale/Compte_Resilier",
    "/Responsable_commerciale/Compte_Exonorer",
    "/Responsable_commerciale/Recaputilations/Redevance",
    "/Responsable_commerciale/Recaputilations/Changer_nom",
    "/Responsable_commerciale/Recaputilations/Achat_cle",
    "/Responsable_commerciale/Recaputilations/Sous_couverte",
    "/Responsable_commerciale/Recaputilations/Livraison",
    "/Responsable_commerciale/Recaputilations/Collection",
];

/**
 * An array of routes used for authenticated users with the role "Agent Commerciale".
 * These routes correspond to the AgentCommerce's interface.
 * @type {string[]}
 */
export const AgentCommercialRoutes = [
    "/Agent_commercial/Liste_Boite_postal",
    "/Agent_commercial/Les_abonnes",
    "/Agent_commercial/Voir_les_depots",
    "/Agent_commercial/Resiliation",
    "/Agent_commercial/Recaputilation/Rapport/Resilier",
    "/Agent_commercial/Recaputilation/Rapport/Redevance",
    "/Agent_commercial/Recaputilation/Rapport/Changer_nom",
    "/Agent_commercial/Recaputilation/Rapport/Achat_cle",
    "/Agent_commercial/Recaputilation/Rapport/Sous_couverte",
    "/Agent_commercial/Recaputilation/Rapport/Livraison",
    "/Agent_commercial/Recaputilation/Rapport/Collection",
];
/**
 * An array of routes used for authenticated users with the role "Agent Guichet".
 * These routes correspond to the AgentCommerce's interface.
 * @type {string[]}
 */
export const AgentGuichetRoutes = [
    "/Agent_guiche/Rechercher",
    "/Agent_guiche/Paiement",
    "/Agent_guiche/Nouveau_client/Multi-Form",
    "/Agent_guiche/Changer_nom",
    "/Agent_guiche/Achat_cle",
    "/Agent_guiche/Ajout_sous_couverte",
    "/Agent_guiche/Ajout_livraison",
    "/Agent_guiche/Ajout_collection",
    "/Agent_guiche/Recaputilations/Ajoute_client",
    "/Agent_guiche/Recaputilations/Changer_nom",
    "/Agent_guiche/Recaputilations/Achat_cle",
    "/Agent_guiche/Recaputilations/Ajout_sous_couverte",
    "/Agent_guiche/Recaputilations/Ajout_livraison",
    "/Agent_guiche/Recaputilations/Ajout_collection",
];
