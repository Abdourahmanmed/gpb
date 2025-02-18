"use client";
import React, { useEffect, useState } from "react";
import {
  ActiveClient,
  ActiveClientColumns,
} from "../columns/ActivityClientCol";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";

const Activiter_du_jour: React.FC = () => {
  const [ActivityRedevance, setActivityRedevance] = useState<ActiveClient[]>(
    []
  );
  const [ActivitySousCouvert, setActivitySousCouvert] = useState<
    ActiveClient[]
  >([]);
  const [ActivityLD, setActivityLd] = useState<ActiveClient[]>([]);
  const [ActivityCollection, setActivityCollection] = useState<ActiveClient[]>(
    []
  );
  const [ActivityChangeName, setActivityChangeName] = useState<ActiveClient[]>(
    []
  );
  const [ActivityAchatCle, setActivityAchatCle] = useState<ActiveClient[]>([]);

  const fetchActivities = async () => {
    const urls = [
      "http://192.168.0.5/gbp_backend/api.php?method=GetToDayActivity",
      "http://192.168.0.5/gbp_backend/api.php?method=GetToDayActivitySousCouverte",
      "http://192.168.0.5/gbp_backend/api.php?method=GetToDayActivityLD",
      "http://192.168.0.5/gbp_backend/api.php?method=GetToDayActivityAchatCle",
      "http://192.168.0.5/gbp_backend/api.php?method=GetToDayActivityCollections",
      "http://192.168.0.5/gbp_backend/api.php?method=GetToDayActivityChagementName",
    ];

    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      setActivityRedevance(data[0] || []);
      setActivitySousCouvert(data[1] || []);
      setActivityLd(data[2] || []);
      setActivityAchatCle(data[3] || []);
      setActivityCollection(data[4] || []);
      setActivityChangeName(data[5] || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Activités du Jour
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: "Redevance", data: ActivityRedevance },
          { title: "Sous Couvert", data: ActivitySousCouvert },
          { title: "Livraison à Domicile", data: ActivityLD },
          { title: "Collection", data: ActivityCollection },
          { title: "Changement de Nom", data: ActivityChangeName },
          { title: "Achat Clé", data: ActivityAchatCle },
        ].map(({ title, data }, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              {title}
            </h1>
            <NoFilterDataTable
              data={data}
              columns={ActiveClientColumns}
              typeName="client_nom"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activiter_du_jour;
