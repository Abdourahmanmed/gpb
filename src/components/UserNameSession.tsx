'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { User } from 'next-auth'; // ✅ importer le bon type ici

export default function UserNameSession() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null); // ✅ typage correct ici

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        }
    }, [session?.user]);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-5 border-t-4 border-green-500 border-solid border-transparent"></div>
                <small className="ml-2">Chargement...</small>
            </div>
        );
    }

    if (status === 'authenticated' && user?.name) {
        return <span>{user.name}</span>;
    }

    return <span>Invité</span>;
}
