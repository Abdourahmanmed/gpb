"use client"
import { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import { Les_abonneColumns, Les_abonnes } from './columns/Les_abonnesTables'

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

const Les_Abonnes = () => {

    const [Abones, SetAbonne] = useState<Les_abonnes[]>([])

    useEffect(() =>{
        SetAbonne(data);
    },[])

    return (
        <DataTable data={Abones} columns={Les_abonneColumns} typeName="Nom" />
    )
}

export default Les_Abonnes