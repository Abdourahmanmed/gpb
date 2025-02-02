"use client"
import React, { useEffect, useState } from 'react'
import { ListBp, ListBpColumns } from './colonnes/ListBpColumn'
import { NoFilterDataTable } from '../Tables/NoFilterData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Store/store'
import { fetchListBp } from '@/Store/Slices/ListeBpSlice'
import LoadingSpinner from '../Spinner'

const data = [
    {
        id: "1",
        NBp: "2001",
        Etat: "paye",
        Type: "Grand",
    },
    {
        id: "2",
        NBp: "2002",
        Etat: "paye",
        Type: "Petite",
    },
    {
        id: "3",
        NBp: "2004",
        Etat: "Impayer",
        Type: "Moyen",
    },
]

const Liste_Bp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { ListBp, loading, error } = useSelector(
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
                    columns={ListBpColumns}
                    typeName="type"
                />
            )}
        </div>
    )
}

export default Liste_Bp