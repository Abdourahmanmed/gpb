"use client";
import React, { useEffect, useState } from 'react'
import { RCle, RecapAchatcols } from './recapCols/AchatCle';
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';
import { useSession } from 'next-auth/react';

const RecapAchatCle = () => {
  const { data: session } = useSession();
  const [recapAchat, SetRecapAchat] = useState<RCle[]>([]);

  const FetchRecap = async () => {
    const api = `http://192.168.0.15/gbp_backend/api.php?method=GetToDayActivityAchatCleById&IdRecpUser=${session?.user?.id}`;
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
      SetRecapAchat(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    FetchRecap()
  }, [])

  return (
    <NoFilterDataTable
      data={recapAchat}
      columns={RecapAchatcols}
      typeName="Nom"
    />
  )
}

export default RecapAchatCle