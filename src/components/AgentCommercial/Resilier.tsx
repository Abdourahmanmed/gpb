"use client";
import React, { useEffect, useState } from 'react'
import { ResilierClient, ResilierClientColumns } from './colonnes/ResilierColumns';
import { NoFilterDataTable } from '../Tables/NoFilterData';
import LoadingSpinner from '../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { fetchClients } from '@/Store/Slices/GlobalManagementClient';

const data = [
    {
        id: "1",
        Nom: "Farah ali kassim",
        NBp: "2001",
        Etat: "paye",
        Type: "Grand",
    },
    {
        id: "2",
        Nom: "Rouwada saleh",
        NBp: "2041",
        Etat: "paye",
        Type: "Petit",
    },
    {
        id: "3",
        Nom: "Zalma nasir",
        NBp: "2003",
        Etat: "paye",
        Type: "Moyen",
    },
]

const Resilier = () => {
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
                <NoFilterDataTable data={clients} columns={ResilierClientColumns} typeName="Nom" />
            )}
        </div>
    )
}

export default Resilier