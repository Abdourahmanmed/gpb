"use client";
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';
import React, { useEffect, useState } from 'react'
import { RecapLdvcols, RLdv } from './recapCols/Ldc';
import { useSession } from 'next-auth/react';

const RecapLvc = () => {
  const { data: session } = useSession();
  const [recapLdc, SetRecapLdc] = useState<RLdv[]>([]);

  const FetchRecap = async () => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=GetAllActivityLD`;
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
      SetRecapLdc(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchRecap()
  }, [])
  return (
    <NoFilterDataTable
      data={recapLdc}
      columns={RecapLdvcols}
      typeName="Nom"
    />
  )
}

export default RecapLvc