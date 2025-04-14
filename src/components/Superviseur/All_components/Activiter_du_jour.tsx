"use client";
import React, { useEffect, useState } from "react";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import { ActiveClient, ActiveClientColumns } from "../columns/ActivityCols/ActivityClientCol";
import { SCouvertClientColumns, Sous_couvert } from "../columns/ActivityCols/SousCouvertCol";
import { Ldc, LdcClientColumns } from "../columns/ActivityCols/LdcCols";
import { CllClientColumns, Collection } from "../columns/ActivityCols/CollectionCols";
import { ChangeName, ChangeNameClientColumns } from "../columns/ActivityCols/Changement_Nom_cols";
import { AchatCle, CleClientColumns } from "../columns/ActivityCols/Achat_Cle_cols";

const Activiter_du_jour: React.FC = () => {
  const [ActivityRedevance, setActivityRedevance] = useState<ActiveClient[]>([]);
  const [ActivitySousCouvert, setActivitySousCouvert] = useState<Sous_couvert[]>([]);
  const [ActivityLD, setActivityLd] = useState<Ldc[]>([]);
  const [ActivityCollection, setActivityCollection] = useState<Collection[]>([]);
  const [ActivityChangeName, setActivityChangeName] = useState<ChangeName[]>([]);
  const [ActivityAchatCle, setActivityAchatCle] = useState<AchatCle[]>([]);

  const fetchActivities = async () => {
    const urls = [
      "http://localhost/gbp_backend/api.php?method=GetToDayActivity",
      "http://localhost/gbp_backend/api.php?method=GetToDayActivitySousCouverte",
      "http://localhost/gbp_backend/api.php?method=GetToDayActivityLD",
      "http://localhost/gbp_backend/api.php?method=GetToDayActivityAchatCle",
      "http://localhost/gbp_backend/api.php?method=GetToDayActivityCollections",
      "http://localhost/gbp_backend/api.php?method=GetToDayActivityChagementName",
    ];

    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map(async (res) => {
        if (!res.ok) {
          console.error("Erreur de réseau", res.statusText);
          return [];
        }
        return res.json();
      }));

      setActivityRedevance(data[0] || []);
      setActivitySousCouvert(data[1] || []);
      setActivityLd(data[2] || []);
      setActivityAchatCle(data[3] || []);
      setActivityCollection(data[4] || []);
      setActivityChangeName(data[5] || []);
    } catch (error) {
      console.log("Erreur lors de la récupération des données :", error);
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
      <div className="flex flex-col gap-6">
        {[
          { title: "Redevance", data: ActivityRedevance, cols: ActiveClientColumns, Nom: "Agent" },
          { title: "Sous Couvert", data: ActivitySousCouvert, cols: SCouvertClientColumns, Nom: "Agent" },
          { title: "Livraison à Domicile", data: ActivityLD, cols: LdcClientColumns, Nom: "Agent" },
          { title: "Collection", data: ActivityCollection, cols: CllClientColumns, Nom: "Agent" },
          { title: "Changement de Nom", data: ActivityChangeName, cols: ChangeNameClientColumns, Nom: "Agent" },
          { title: "Achat Clé", data: ActivityAchatCle, cols: CleClientColumns, Nom: "Agent" },
        ].map(({ title, data, cols, Nom }, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              {title}
            </h1>
            <NoFilterDataTable
              data={data}
              columns={cols}
              typeName={Nom}  // Assuming "Nom" refers to the field to filter or show in the table
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activiter_du_jour;
