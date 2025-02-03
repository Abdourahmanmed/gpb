"use client"
import React, { useEffect} from 'react'
import { Les_abonneCommerceColumns } from './colonnes/Les_abonneColumn'
import { NoFilterDataTable } from '../Tables/NoFilterData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Store/store'
import { fetchClients } from '@/Store/Slices/GlobalManagementClient'
import LoadingSpinner from '../Spinner'



const LesAbonnes = () => {
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

export default LesAbonnes