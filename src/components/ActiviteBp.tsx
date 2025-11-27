"use client";

import React, { useEffect, useState } from "react";
import { ModelDetailsBp } from "./ModelDetailsBp";

interface HistoriqueBoite {
  NumeroBoite: string;
  IdClient: number;
  NomClient: string;
  TypeClient: string;
  Telephone: string | null;
  Email: string | null;
  DateDebut: string | null;
  DateFin: string | null;
  StatutOccupation: string;
  NombreAnnees: number;
  AnneeAbonnement: string | null;
  StatutAbonnement: string | null;
}

interface ApiResponse {
  success: boolean;
  data?: HistoriqueBoite[];
  error?: string;
}

interface ModelProps {
  numero: string;
  Name?: string;
}

const DetailsBp: React.FC<ModelProps> = ({ numero, Name }) => {
  const [data, setData] = useState<HistoriqueBoite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoriqueBoite = async () => {
      const apiUrl = `http://192.168.0.12/gbp_backend/api.php?method=GetHistoriqueBoite&numero=${numero}`;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl);

        const text = await response.text(); // 🧩 Lire la réponse brute

        // 🪵 Logger intelligent : seulement en dev
        if (process.env.NODE_ENV === "development") {
          console.log("%c[API RESPONSE RAW]", "color: #22d3ee; font-weight: bold;", text);
        }

        try {
          const json: ApiResponse = JSON.parse(text);

          if (json.error) {
            throw new Error(json.error || "Erreur inconnue côté serveur");
          }

          setData(json.data || []);
        } catch (jsonError) {
          console.error("⚠️ Erreur de parsing JSON :", jsonError);
          throw new Error("Réponse invalide du serveur (non-JSON). Vérifie la console pour le texte brut.");
        }
      } catch (err: any) {
        setError(err.message || "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    };

    if (numero) fetchHistoriqueBoite();
  }, [numero]);

  if (loading)
    return <p className="text-center text-gray-500">Chargement...</p>;

  if (error)
    return <p className="text-center text-red-500 font-medium">⚠️ {error}</p>;

  return (
    <ModelDetailsBp
      Name={Name}
      Id_bp={numero}
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default DetailsBp;
