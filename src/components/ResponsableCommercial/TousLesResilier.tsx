"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";
import { ResilierColumns } from "./columns/ResilierCol";
import { fetchResilier } from "@/Store/Slices/ResilierSlice";
import { AppDispatch } from "@/Store/store";

const TousLesResilier = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Resiliers, loading, error } = useSelector(
    (state: RootState) => state.Resilier
  );
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchResilier()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable
          data={Resiliers}
          columns={ResilierColumns}
          typeName="client_name"
        />
      )}
    </div>
  );
};

export default TousLesResilier;
