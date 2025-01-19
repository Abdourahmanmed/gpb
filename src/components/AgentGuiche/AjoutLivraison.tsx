"use client";
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import {LivraisonDomicilCoulmns } from './columns/LivraisonDColumn';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { fetchClients } from '@/Store/Slices/GlobalManagementClient';
import LoadingSpinner from '../Spinner';



const AjoutLivraison = () => {
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
                <DataTable data={clients} columns={LivraisonDomicilCoulmns} typeName="Nom" />
            )}
        </div>
    )
}

export default AjoutLivraison