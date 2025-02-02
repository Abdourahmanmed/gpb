"use client";
import { fetchClients } from '@/Store/Slices/GlobalManagementClient';
import { AppDispatch, RootState } from '@/Store/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Spinner';
import { NoFilterDataTable } from '../Tables/NoFilterData';
import { Les_abonneCommerceColumns } from './colonnes/Les_abonneColumn';

const Depots = () => {
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
                <NoFilterDataTable data={clients} columns={Les_abonneCommerceColumns} typeName="Nom" />
            )}
        </div>
    )
}

export default Depots