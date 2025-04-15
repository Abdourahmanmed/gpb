"use client"
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';
import React, { useEffect, useState } from 'react'
import { Rdv, RecapRvcols } from './recapCols/redevance';
import { useSession } from 'next-auth/react';

const RecapRdv = () => {
  const { data: session } = useSession();
  const [recapRdv, SetRecapRdv] = useState<Rdv[]>([]);

  const FetchRecap = async () => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=GetAllActivityRdv`;
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
      SetRecapRdv(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchRecap()
  }, [])
  return (
    <NoFilterDataTable
      data={recapRdv}
      columns={RecapRvcols}
      typeName="Nom"
    />
  )
}

export default RecapRdv