"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";
import { fetchAgents } from "@/Store/Slices/AgentManagement";
import { AgentsColumns } from "../columns/AgentsCol";


const AgentsGuichet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { agents, loading, error } = useSelector((state: RootState) => state.Agents);
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchAgents()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable data={agents} columns={AgentsColumns} typeName="nom" />
      )}
    </div>

  );
};

export default AgentsGuichet;
