"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import { ListBp, ListBpColumns } from './colonnes/ListBpColumn'

const data = [
    {
        id: "1",
        NBp: "2001",
        Etat: "paye",
        Type: "Grand",
    },
    {
        id: "2",
        NBp: "2002",
        Etat: "paye",
        Type: "Petite",
    },
    {
        id: "3",
        NBp: "2004",
        Etat: "Impayer",
        Type: "Moyen",
    },
]

const Liste_Bp = () => {
    const [ListBp, SetListBp] = useState<ListBp[]>([])

    useEffect(() => {
        SetListBp(data);
    }, [])
    return (
        <DataTable data={ListBp} columns={ListBpColumns} typeName="NBp" />
    )
}

export default Liste_Bp