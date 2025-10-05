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
  message?: string;
}

interface ModelProps {
  numero: string; // 🧩 On remplace Id_bp par numero, car ton API attend ?numero=...
  Name?: string;
}

const DetailsBp: React.FC<ModelProps> = ({ numero, Name }) => {
  const [data, setData] = useState<HistoriqueBoite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchHistoriqueBoite = async () => {
      const apiUrl = `http://192.168.0.12/gbp_backend/api.php?method=GetHistoriqueBoite&numero=${numero}`;
      setLoading(true);
      setError("");

      try {
        const response = await fetch(apiUrl, { method: "GET" });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Vérifier si data est un tableau avant de l'affecter
        if ((data.data)) {
          setData(data.data);
        } else {
          throw new Error("Données invalides reçues de l'API.");
        }
      } catch (error: any) {
        setError(error.message || "Une erreur inconnue s'est produite.");
        // console.error("Erreur lors du chargement des factures :", error);
      } finally {
        setLoading(false);
      }
    };

    if (numero) {
      fetchHistoriqueBoite();
    }
  }, [numero]);

  if (loading)
    return <p className="text-center text-gray-500">Chargement...</p>;

  if (error)
    return <p className="text-center text-red-500 font-medium">⚠️ {error}</p>;

  //   if (!data || data.length === 0)
  //     return (
  //       <p className="text-center text-gray-400">Aucune donnée disponible. </p>
  //     );

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
