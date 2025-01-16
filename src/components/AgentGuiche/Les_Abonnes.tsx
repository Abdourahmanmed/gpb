"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../Tables/DataTables';
import { Les_abonneColumns } from './columns/Les_abonnesTables';
import { AppDispatch, RootState } from '@/Store/store';
import { fetchClients } from '@/Store/Slices/GlobalManagementClient';
const Les_Abonnes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { clients, loading, error } = useSelector((state: RootState) => state.clients);

    // Utiliser le thunk pour charger les clients
    useEffect(() => {
        dispatch(fetchClients()); // Appeler le thunk pour récupérer les clients
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <p>Chargement des données...</p> // Indicateur de chargement
            ) : error ? (
                <p>{error}</p> // Affichage de l'erreur si elle existe
            ) : (
                <DataTable data={clients} columns={Les_abonneColumns} typeName="Nom" />
            )}
        </div>
    );
};

export default Les_Abonnes;
