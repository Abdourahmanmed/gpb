"use client";
import LoadingSpinner from "@/components/Spinner";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import { AppDispatch, RootState } from "@/Store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListeBpColumns } from "../columns/ListBpCol";
import { fetchListBp } from "@/Store/Slices/ListeBpSlice";

const ListeBp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ListBp , loading, error } = useSelector(
    (state: RootState) => state.BoitPostal
  );
  // Utiliser le thunk pour charger les clients
  useEffect(() => {
    dispatch(fetchListBp()); // Appeler le thunk pour récupérer les clients
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingSpinner /> // Indicateur de chargement
      ) : error ? (
        <p>{error}</p> // Affichage de l'erreur si elle existe
      ) : (
        <NoFilterDataTable
          data={ListBp}
          columns={ListeBpColumns}
          typeName="type"
        />
      )}
    </div>
  );
};

export default ListeBp;
