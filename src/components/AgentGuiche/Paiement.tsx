"use client";
import React, { useEffect} from 'react'
import { DataTable } from '../Tables/DataTables'
import {Le_PaiementColumns } from './columns/PaiementColones'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { fetchClients } from '@/Store/Slices/GlobalManagementClient';
import LoadingSpinner from '../Spinner';



const Paiement = () => {
     const dispatch = useDispatch<AppDispatch>();
    const { clients, loading, error } = useSelector((state: RootState) => state.clients);
    // Utiliser le thunk pour charger les clients
    useEffect(() => {
        dispatch(fetchClients()); // Appeler le thunk pour récupérer les clients
    }, [dispatch]);
    return (
        <div >
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p>{error}</p> // Affichage de l'erreur si elle existe
            ) : (
                 <DataTable data={clients} columns={Le_PaiementColumns} typeName="Nom" />
            )}
        </div>
    )
}

export default Paiement