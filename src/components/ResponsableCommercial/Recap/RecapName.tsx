"use client";
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';
import React, { useEffect, useState } from 'react'
import { RecapNamecols, RName } from './recapCols/Name';
import { useSession } from 'next-auth/react';

const RecapName = () => {
  const { data: session } = useSession();
  const [recapName, SetRecapName] = useState<RName[]>([]);

  const FetchRecap = async () => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=GetAllActivityChagementName`;
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
      SetRecapName(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchRecap()
  }, [])

  return (
    <NoFilterDataTable
      data={recapName}
      columns={RecapNamecols}
      typeName="Nom"
    />
  )
}

export default RecapName