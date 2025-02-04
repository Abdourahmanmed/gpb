"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

// ✅ Définition du type du contexte
interface SessionContextType {
    user: Session["user"] | null;
    setUser: (user: Session["user"] | null) => void;
}

// ✅ Création du contexte avec une valeur par défaut `undefined`
const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: ReactNode; // ✅ Correction : Définition explicite de `children`
}

// ✅ Création du Provider pour gérer l'état utilisateur
export const SessionProvider = ({ children }: SessionProviderProps) => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<Session["user"] | null>(null);

    useEffect(() => {
        if (status === "authenticated") {
            setUser(session?.user ?? null);
        }
    }, [session, status]);

    return (
        <SessionContext.Provider value={{ user, setUser }}>
            {children} {/* ✅ Correction : `children` est bien défini */}
        </SessionContext.Provider>
    );
};

// ✅ Hook pour récupérer les données de l'utilisateur dans le Navbar
export const useAuth = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useAuth must be used within a SessionProvider");
    }
    return context;
};
