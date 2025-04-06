"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { RecapNamecols, RName } from './recapCols/Name';
import { NoFilterDataTable } from '@/components/Tables/NoFilterData';

const RecapChName = () => {
  const { data: session } = useSession();
  const [recapName, SetRecapName] = useState<RName[]>([]);

  const FetchRecap = async () => {
    const api = `http://localhost/gbp_backend/api.php?method=GetToDayActivityChagementNameById&IdRecpUser=${session?.user?.id}`;
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

export default RecapChName