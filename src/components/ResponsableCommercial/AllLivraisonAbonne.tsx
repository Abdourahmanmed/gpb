"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";
import { AppDispatch } from "@/Store/store";
import { LvdColumns } from "./columns/LivraisonAdded";
import { fetchLivraison } from "@/Store/Slices/LvdSlice";

const LvdAbonne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Livraison, loading, error } = useSelector(
    (state: RootState) => state.Lvd
  );
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchLivraison()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable
          data={Livraison}
          columns={LvdColumns}
          typeName="client_nom"
        />
      )}
    </div>
  );
};

export default LvdAbonne;
