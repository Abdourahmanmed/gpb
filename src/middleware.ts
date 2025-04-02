import { auth } from "@/auth";
import {
    publicRoutes,
    ApiauthPrefix,
    default_Superviseur_redirect,
    default_agent_commercial_redirect,
    default_AgentGuichet_redirect,
    default_Responsable_redirect,
    SuperviseurRoutes,
    AgentRsponsableRoutes,
    AgentCommercialRoutes,
    AgentGuichetRoutes,
} from "@/routes";

export default auth((req) => {
    // const { nextUrl } = req;
    // const isLoggedIn = !!req.auth;
    // const role = req.auth?.user?.role

    // const isApiRoutes = nextUrl.pathname.startsWith(ApiauthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isSuperviseurRoute = SuperviseurRoutes.includes(nextUrl.pathname);
    // const isResponsableRoute = AgentRsponsableRoutes.includes(nextUrl.pathname);
    // const isCommercialRoute = AgentCommercialRoutes.includes(nextUrl.pathname);
    // const isAgentGuichetRoute = AgentGuichetRoutes.includes(nextUrl.pathname);

    // // Vérifier si la route est une route API
    // if (isApiRoutes) {
    //     return null;
    // }

    // // Si l'utilisateur est connecté
    // if (isLoggedIn) {
    //     if (isSuperviseurRoute && role === "superviseur") {
    //         return null; // Accès autorisé pour Superviseur
    //     }
    //     if (isResponsableRoute && role === "responsable") {
    //         return null; // Accès autorisé pour le agent responsable
    //     }
    //     if (isCommercialRoute && role === "agent_commercial") {
    //         return null; // Accès autorisé pour AgentCommerce
    //     }
    //     if (isAgentGuichetRoute && role === "agent_guichet") {
    //         return null; // Accès autorisé pour Agent guichet
    //     }

    //     // Redirection vers l'interface appropriée si l'utilisateur essaie d'accéder à une route qui ne lui est pas destinée
    //     if (role === "superviseur") {
    //         return Response.redirect(new URL(default_Superviseur_redirect, nextUrl));
    //     }
    //     if (role === "responsable") {
    //         return Response.redirect(new URL(default_Responsable_redirect, nextUrl));
    //     }
    //     if (role === "agent_commercial") {
    //         return Response.redirect(new URL(default_agent_commercial_redirect, nextUrl));
    //     }
    //     if (role === "agent_guichet") {
    //         return Response.redirect(new URL(default_AgentGuichet_redirect, nextUrl));
    //     }
    // }

    // // Redirection pour les utilisateurs non connectés vers la page d'accueil pour les routes protégées
    // if (!isLoggedIn && !isPublicRoute) {
    //     return Response.redirect(new URL("/", nextUrl));
    // }

    return null;
});

export const config = {
    matcher: [
        // Exclure les fichiers internes de Next.js et les fichiers statiques, sauf ceux trouvés dans les paramètres de recherche
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Toujours s'exécuter pour les routes API
        '/(api|trpc)(.*)',
    ],
};
