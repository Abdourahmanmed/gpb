"use client"
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';
import React, { useEffect, useState } from 'react'
import { RecapSccols, RSousCouverte } from './recapCols/Sous_couverte';
import { useSession } from 'next-auth/react';

const RecapSousCouvert = () => {
  const { data: session } = useSession();
  const [recapSc, SetRecapSc] = useState<RSousCouverte[]>([]);

  const FetchRecap = async () => {
    const api = `http://192.168.0.12/gbp_backend/api.php?method=GetAllActivitySousCouverte`;
    try {
      const responses = await fetch(api, {
        method: 'GET',
      })
      if (!responses.ok) {
        throw Error('Erreur de reseau .impossible de recupere les donnes ');
      }
      const responseData = await responses.json();
      if (responseData.error) {
        throw Error(responseData.error);
      }
      SetRecapSc(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchRecap()
  }, [])

  return (
    <NoFilterDataTable
      data={recapSc}
      columns={RecapSccols}
      typeName="Nom"
    />
  )
}

export default RecapSousCouvert