"use client";
import React, { useEffect, useState } from "react";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import { ActiveClient, ActiveClientColumns } from "../columns/ActivityCols/ActivityClientCol";
import { SCouvertClientColumns, Sous_couvert } from "../columns/ActivityCols/SousCouvertCol";
import { Ldc, LdcClientColumns } from "../columns/ActivityCols/LdcCols";
import { CllClientColumns, Collection } from "../columns/ActivityCols/CollectionCols";
import { ChangeName, ChangeNameClientColumns } from "../columns/ActivityCols/Changement_Nom_cols";
import { AchatCle, CleClientColumns } from "../columns/ActivityCols/Achat_Cle_cols";

const API_BASE = "http://192.168.0.12/gbp_backend/api.php?method=";

const Activiter_du_jour: React.FC = () => {
  const [ActivityRedevance, setActivityRedevance] = useState<ActiveClient[]>([]);
  const [ActivitySousCouvert, setActivitySousCouvert] = useState<Sous_couvert[]>([]);
  const [ActivityLD, setActivityLd] = useState<Ldc[]>([]);
  const [ActivityCollection, setActivityCollection] = useState<Collection[]>([]);
  const [ActivityChangeName, setActivityChangeName] = useState<ChangeName[]>([]);
  const [ActivityAchatCle, setActivityAchatCle] = useState<AchatCle[]>([]);

  useEffect(() => {
    fetchRedevance();
    fetchSousCouvert();
    fetchLD();
    fetchCollection();
    fetchChangeName();
    fetchAchatCle();
  }, []);

  const fetchRedevance = async () => {
    try {
      const res = await fetch(`${API_BASE}GetToDayActivity`);
      const json = await res.json();
      setActivityRedevance(json || []);
    } catch (error) {
      console.error("Erreur redevance :", error);
    }
  };

  const fetchSousCouvert = async () => {
    try {
      const res = await fetch(`${API_BASE}GetToDayActivitySousCouverte`);
      const json = await res.json();
      setActivitySousCouvert(json || []);
    } catch (error) {
      console.error("Erreur sous-couvert :", error);
    }
  };

  const fetchLD = async () => {
    try {
      const res = await fetch(`${API_BASE}GetToDayActivityLD`);
      const json = await res.json();
      setActivityLd(json || []);
    } catch (error) {
      console.error("Erreur livraison domicile :", error);
    }
  };

  const fetchCollection = async () => {
    try {
      const res = await fetch(`${API_BASE}GetToDayActivityCollections`);
      const json = await res.json();
      setActivityCollection(json || []);
    } catch (error) {
      console.error("Erreur collection :", error);
    }
  };

  const fetchChangeName = async () => {
    try {
      const res = await fetch(`${API_BASE}GetToDayActivityChagementName`);
      const json = await res.json();
      setActivityChangeName(json || []);
    } catch (error) {
      console.error("Erreur changement de nom :", error);
    }
  };

  const fetchAchatCle = async () => {
    try {
      const res = await fetch(`${API_BASE}GetToDayActivityAchatCle`);
      const json = await res.json();
      setActivityAchatCle(json || []);
    } catch (error) {
      console.error("Erreur achat clé :", error);
    }
  };

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
              typeName={Nom}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activiter_du_jour;
