"use client";
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import { AjoutSousCouvert, AjoutSousCouvertColumns } from './columns/AjoutSousCouvColumns';

const data = [
    {
        id: "1",
        Nom: "Yasser ali",
        NBp: "2001",
        Etat: "impaye",
        Telephone: "77320114",
        Redevance: "1000 ,2025",
        sous_couvert: "",
        Domocile: "",
        Date_abonnement: "2017-04-14",
    },
    {
        id: "2",
        Nom: " fatouma ibrahimYasser",
        NBp: "2003",
        Etat: "impaye",
        Telephone: "77040103",
        Redevance: "1000 ,2025",
        sous_couvert: "",
        Domocile: "",
        Date_abonnement: "2017-04-14",
    },
    {
        id: "3",
        Nom: "farah ismael",
        NBp: "2025",
        Etat: "paye",
        Telephone: "77101412",
        Redevance: "1000 ,2025",
        sous_couvert: "",
        Domocile: "",
        Date_abonnement: "2017-04-14",
    },

]

const Sous_Couvert = () => {
    const [SousCouVert, SetSousCouVert] = useState<AjoutSousCouvert[]>([])

    useEffect(() => {
        SetSousCouVert(data);
    }, [])
    return (
        <DataTable data={SousCouVert} columns={AjoutSousCouvertColumns} typeName="Nom" />
    )
}

export default Sous_Couvert