"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";
import { AppDispatch } from "@/Store/store";
import { fetchChangedCle } from "@/Store/Slices/ChangementCleSlice";
import { ChangedCleColumns } from "./columns/ChangedCle";

const ChangementCleAbonne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Allchangementcle, loading, error } = useSelector(
    (state: RootState) => state.ChangementCle
  );
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchChangedCle()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable
          data={Allchangementcle}
          columns={ChangedCleColumns}
          typeName="client_nom"
        />
      )}
    </div>
  );
};

export default ChangementCleAbonne;
