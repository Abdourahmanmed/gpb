"use client"
import React, { useEffect, useState } from 'react';

type Activity = {
    name: string; // Assure-toi que c'est bien ce qui est retourné par l'API
};

type Activities = {
    sousCouverte: Activity[];
    ld: Activity[];
    achatCle: Activity[];
    general: Activity[];
    collections: Activity[];
    changementName: Activity[];
};

const Activiter_du_jour: React.FC = () => {
    const [activities, setActivities] = useState<Activities>({
        sousCouverte: [],
        ld: [],
        achatCle: [],
        general: [],
        collections: [],
        changementName: []
    });
    const [loading, setLoading] = useState<boolean>(true);

    // Fonction pour récupérer les données de chaque API
    const fetchData = async () => {
        setLoading(true);
        try {
            const responses = await Promise.all([
                fetch('http://localhost/gbp_backend/api.php?method=GetToDayActivitySousCouverte'),
                fetch('http://localhost/gbp_backend/api.php?method=GetToDayActivityLD'),
                fetch('http://localhost/gbp_backend/api.php?method=GetToDayActivityAchatCle'),
                fetch('http://localhost/gbp_backend/api.php?method=GetToDayActivity'),
                fetch('http://localhost/gbp_backend/api.php?method=GetToDayActivityCollections'),
                fetch('http://localhost/gbp_backend/api.php?method=GetToDayActivityChagementName')
            ]);

            const data = await Promise.all(responses.map(response => response.json()));

            setActivities({
                sousCouverte: data[0],
                ld: data[1],
                achatCle: data[2],
                general: data[3],
                collections: data[4],
                changementName: data[5]
            });
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderTable = (activitiesList: Activity[], title: string) => (
        <div className="border p-4">
            <h3 className="font-semibold">{title}</h3>
            <table className="min-w-full table-auto border-collapse mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Nom de l'Activité</th>
                    </tr>
                </thead>
                <tbody>
                    {activitiesList.map((activity, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border">{activity.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Activités du Jour</h2>
            <div className="grid grid-cols-3 gap-4">
                {renderTable(activities.sousCouverte, "Sous Couverte")}
                {renderTable(activities.ld, "LD")}
                {renderTable(activities.achatCle, "Achat Clé")}
                {renderTable(activities.general, "Activités Générales")}
                {renderTable(activities.collections, "Collections")}
                {renderTable(activities.changementName, "Changement de Nom")}
            </div>
        </div>
    );
};

export default Activiter_du_jour;
