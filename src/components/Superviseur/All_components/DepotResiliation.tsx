"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { DepotColumns } from "../columns/DepotCol";
import { fetchClients } from "@/Store/Slices/GlobalManagementClient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";


const DepotResiliation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchClients()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable data={clients} columns={DepotColumns} typeName="Nom" />
      )}
    </div>

  );
};

export default DepotResiliation;
