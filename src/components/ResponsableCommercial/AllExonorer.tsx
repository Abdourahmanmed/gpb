"use client";
import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import LoadingSpinner from "@/components/Spinner";
import { fetchResilier } from "@/Store/Slices/ResilierSlice";
import { AppDispatch } from "@/Store/store";
import { AllResilierColumns } from "./columns/AllResilierCol";
import { AllExonorerColumns } from "./columns/AllExonorerCol";
import { fetchExonorer } from "@/Store/Slices/ExonoreSlice";
const AllExonorer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Exonorers, loading, error } = useSelector(
        (state: RootState) => state.Exonorer
    );
    // Utiliser le thunk pour charger les clients
    useEffect(() => {
        dispatch(fetchExonorer()); // Appeler le thunk pour récupérer les clients
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingSpinner /> // Indicateur de chargement
            ) : error ? (
                <p>{error}</p> // Affichage de l'erreur si elle existe
            ) : (
                <NoFilterDataTable
                    data={Exonorers}
                    columns={AllExonorerColumns}
                    typeName="Nom"
                />
            )}
        </div>
    )
}

export default AllExonorer