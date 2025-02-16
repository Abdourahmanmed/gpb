"use client";
import React, { useEffect, useState } from 'react'
import { MyBetterChart } from './MyChart'
import { PieChartDonutWithText } from './PyChart'
import { FetchNombreabonneNonAjour } from '@/actions/All_references/FetchNbrAbonneNonAjour';
import { FetchNombreabonneAjour } from '@/actions/All_references/FetchNbrAbonneAjour';
import { FetchNombreabonne } from '@/actions/All_references/FectNombreAbonne';
import { FetchPetiteBp } from '@/actions/All_references/FetchPetiteBp';
import { FetchMoyenBp } from '@/actions/All_references/FecthMoyenBp';
import { FetchGrandBp } from '@/actions/All_references/FecthGrandBp';

const DynamicCharts = () => {
    const [BpG, SetBpG] = useState(0);
    const [BpM, SetBpM] = useState(0);
    const [BpP, SetBpP] = useState(0);
    const [NbrAbonne, SetNbrAbonne] = useState(0);
    const [NbrAbonneAjour, SetNbrAbonneAjour] = useState(0);
    const [NbrAbonneNonAjour, SetNbrAbonneNonAjour] = useState(0);


    const fetctBpG = async () => {
        const result = await FetchGrandBp();
        if (result) {
            SetBpG(result);
        }
    }
    const fetctBpM = async () => {
        const result = await FetchMoyenBp();
        if (result) {
            SetBpM(result);
        }
    }
    const fetctBpP = async () => {
        const result = await FetchPetiteBp();
        if (result) {
            SetBpP(result);
        }
    }
    const fetctNbrAbonne = async () => {
        const result = await FetchNombreabonne();
        if (result) {
            SetNbrAbonne(result);
        }
    }
    const fetctNbrAbonneajour = async () => {
        const result = await FetchNombreabonneAjour();
        if (result) {
            SetNbrAbonneAjour(result);
        }
    }
    const fetctAbonneNonajour = async () => {
        const result = await FetchNombreabonneNonAjour();
        if (result) {
            SetNbrAbonneNonAjour(result);
        }
    }


    useEffect(() => {
        fetctBpG();
        fetctBpM();
        fetctBpP();
        fetctNbrAbonne();
        fetctNbrAbonneajour();
        fetctAbonneNonajour();
    }, [])
    return (
        <div className="flex gap-4">
            <div className="w-2/3 py-4">
                <MyBetterChart AbonneTotal={NbrAbonne} Abonne_a_jour={NbrAbonneAjour} Abonne_non_a_jour={NbrAbonneNonAjour} />
            </div>
            <div className="w-2/3 py-4">
                <PieChartDonutWithText BpPetit={BpP} BpMoyen={BpM} BpGrand={BpG} />
            </div>
        </div>
    )
}

export default DynamicCharts