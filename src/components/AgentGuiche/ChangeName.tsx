"use client"
import React, { useEffect } from 'react'
import { DataTable } from '../Tables/DataTables'
import {  ChangenameColumns } from './columns/ChangeNameColumns'
import { fetchClients } from '@/Store/Slices/GlobalManagementClient'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Store/store'
import LoadingSpinner from '../Spinner'


const ChangeName = () => {
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
                <DataTable data={clients} columns={ChangenameColumns} typeName="Nom" />
            )}
        </div>
    )
}

export default ChangeName