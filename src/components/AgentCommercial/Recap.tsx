"use client";

import { useEffect, useState } from "react";
import { RecapReslierCol, Recaputilation } from "./colonnes/RecapColumn";
import { useSession } from "next-auth/react";
import { FetchRecapResilier } from "@/actions/FetchRecapReslier";
import LoadingSpinner from "../Spinner";
import { NoFilterDataTable } from "../Tables/NoFilterData";

const Recap = () => {
  const [recap, setRecap] = useState<Recaputilation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRecap = async () => {
      if (!session?.user?.id) return; // Vérifie que l'ID est bien défini avant d'appeler l'API

      setLoading(true);
      setError(null);

      try {
        const response = await FetchRecapResilier(session.user.id);
        setRecap(response);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecap();
  }, [session?.user?.id]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p className="text-red-500">{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable data={recap} columns={RecapReslierCol} typeName="Nom" />
      )}
    </div>
  );
};

export default Recap;
