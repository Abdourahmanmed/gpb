"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";
import { AppDispatch } from "@/Store/store";
import { ChangedNameColumns } from "./columns/ChangedName";
import { fetchChangedName } from "@/Store/Slices/NameChangeSlice";

const ChangementNomAbonne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { AllchangementName, loading, error } = useSelector(
    (state: RootState) => state.ChangementName
  );
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchChangedName()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable
          data={AllchangementName}
          columns={ChangedNameColumns}
          typeName="client_nom"
        />
      )}
    </div>
  );
};

export default ChangementNomAbonne;
