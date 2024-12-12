"use client";
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import { ResilierClient, ResilierClientColumns } from './colonnes/ResilierColumns';

const data = [
    {
        id: "1",
        Nom: "Farah ali kassim",
        NBp: "2001",
        Etat: "paye",
        Type: "Grand",
    },
    {
        id: "2",
        Nom: "Rouwada saleh",
        NBp: "2041",
        Etat: "paye",
        Type: "Petit",
    },
    {
        id: "3",
        Nom: "Zalma nasir",
        NBp: "2003",
        Etat: "paye",
        Type: "Moyen",
    },
]

const Resilier = () => {
    const [Resilier_client, SetResilier_client] = useState<ResilierClient[]>([])

    useEffect(() => {
        SetResilier_client(data);
    }, [])
    return (
        <DataTable data={Resilier_client} columns={ResilierClientColumns} typeName="Nom" />
    )
}

export default Resilier