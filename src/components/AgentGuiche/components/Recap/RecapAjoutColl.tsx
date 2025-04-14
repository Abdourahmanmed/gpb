"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { RCll, RecapCllcols } from './recapCols/Collection';
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';

const RecapAjoutColl = () => {
  const { data: session } = useSession();
  const [recapCll, SetRecapCll] = useState<RCll[]>([]);

  const FetchRecap = async () => {
    const api = `http://localhost/gbp_backend/api.php?method=GetToDayActivityCollectionsById&IdRecpUser=${session?.user?.id}`;
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
      SetRecapCll(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchRecap()
  }, [])
  return (
    <NoFilterDataTable
      data={recapCll}
      columns={RecapCllcols}
      typeName="Nom"
    />
  )
}

export default RecapAjoutColl