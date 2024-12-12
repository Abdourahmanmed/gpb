"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import { Changename, ChangenameColumns } from './columns/ChangeNameColumns'

const data = [
    {
        id: "1",
        Nom: "Farah ali kassim",
        NBp: "2001",
        Etat: "paye",
    },
    {
        id: "2",
        Nom: "Rouwada saleh",
        NBp: "2041",
        Etat: "paye",
    },
    {
        id: "3",
        Nom: "Zalma nasir",
        NBp: "2003",
        Etat: "paye",
    },
]

const ChangeName = () => {
    const [Change_name, SetChange_name] = useState<Changename[]>([])

    useEffect(() => {
        SetChange_name(data);
    }, [])
    return (
        <DataTable data={Change_name} columns={ChangenameColumns} typeName="Nom" />
    )
}

export default ChangeName