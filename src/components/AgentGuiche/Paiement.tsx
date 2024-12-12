"use client";
import React, { useEffect, useState } from 'react'
import { DataTable } from '../Tables/DataTables'
import { Le_Paiement, Le_PaiementColumns } from './columns/PaiementColones'

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

const Paiement = () => {
    const [Payement, SetPayement] = useState<Le_Paiement[]>([])

    useEffect(() => {
        SetPayement(data);
    }, [])
    return (
        <DataTable data={Payement} columns={Le_PaiementColumns} typeName="Nom" />
    )
}

export default Paiement