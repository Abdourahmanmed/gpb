"use client";
import React, { useEffect, useState } from 'react'
import BoxInfo from '../Superviseur/BoxInfo'
import { FetchGrandBp } from '@/actions/All_references/FecthGrandBp';
import { FetchMoyenBp } from '@/actions/All_references/FecthMoyenBp';
import { FetchPetiteBp } from '@/actions/All_references/FetchPetiteBp';
import { FetchNombreabonne } from '@/actions/All_references/FectNombreAbonne';
import { FetchNombreabonneAjour } from '@/actions/All_references/FetchNbrAbonneAjour';
import { FetchNombreabonneNonAjour } from '@/actions/All_references/FetchNbrAbonneNonAjour';
import { FetchNombreabonneResilier } from '@/actions/All_references/FetchNombreCptResilier';
import { FetchNombreabonneExonorer } from '@/actions/All_references/FetchNbrCptExonorer';
import { FetchMontantParJour } from '@/actions/All_references/FetchMontantParJour';
import { FetchMontantParMois } from '@/actions/All_references/FetchMontantParMois';
import { FetchMontantParAns } from '@/actions/All_references/FetchMontantParAns';

const DashbordBoxFetch = () => {

    const [BpG, SetBpG] = useState(0);
    const [BpM, SetBpM] = useState(0);
    const [BpP, SetBpP] = useState(0);
    const [NbrAbonne, SetNbrAbonne] = useState(0);
    const [NbrAbonneAjour, SetNbrAbonneAjour] = useState(0);
    const [NbrAbonneNonAjour, SetNbrAbonneNonAjour] = useState(0);
    const [Nbrresilier, SetNbrresilier] = useState(0);
    const [NbrExonorer, SetNbrExonorer] = useState(0);
    const [NbrMontantParJour, SetNbrMontantParJour] = useState(0);
    const [NbrMontantParMois, SetNbrMontantParMois] = useState(0);
    const [NbrMontantParAns, SetNbrMontantParAns] = useState(0);

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
    const fetctnbrResilier = async () => {
        const result = await FetchNombreabonneResilier();
        if (result) {
            SetNbrresilier(result);
        }
    }
    const fetctnbrExonorer = async () => {
        const result = await FetchNombreabonneExonorer();
        if (result) {
            SetNbrExonorer(result);
        }
    }
    const fetctnbrMontantParJour = async () => {
        const result = await FetchMontantParJour();
        if (result) {
            SetNbrMontantParJour(result);
        }
    }
    const fetctnbrMontantParMois = async () => {
        const result = await FetchMontantParMois();
        if (result) {
            SetNbrMontantParMois(result);
        }
    }
    const fetctnbrMontantParAns = async () => {
        const result = await FetchMontantParAns();
        if (result) {
            SetNbrMontantParAns(result);
        }
    }

    useEffect(() => {
        fetctBpG();
        fetctBpM();
        fetctBpP();
        fetctNbrAbonne();
        fetctNbrAbonneajour();
        fetctAbonneNonajour();
        fetctnbrResilier();
        fetctnbrExonorer();
        fetctnbrMontantParJour();
        fetctnbrMontantParMois();
        fetctnbrMontantParAns();
    }, [])

    return (
        <div className="flex justify-around flex-wrap gap-10">
            <BoxInfo titre="Boite Postal : Grand" Nombre={BpG} color="" />
            <BoxInfo
                titre="Boite Postal : Moyen"
                Nombre={BpM}
                color="text-primary-2"
            />
            <BoxInfo
                titre="Montant Totale journalier"
                Nombre={NbrMontantParJour}
                color="text-primary-8"
            />
            <BoxInfo
                titre="Boite Postal : Petit"
                Nombre={BpP}
                color="text-primary-3"
            />

            <BoxInfo
                titre="Nombre des abonnes"
                Nombre={NbrAbonne}
                color="text-primary-4"
            />
            <BoxInfo
                titre="Montant Totale Mensuel"
                Nombre={NbrMontantParMois}
                color="text-primary-8"
            />
            <BoxInfo
                titre="Nombre des abonnes à jour"
                Nombre={NbrAbonneAjour}
                color="text-primary-5"
            />
            <BoxInfo
                titre="Nombre des abonnes non à jour"
                Nombre={NbrAbonneNonAjour}
                color="text-primary-6"
            />
            <BoxInfo
                titre="Montant Totale Annuel"
                Nombre={NbrMontantParAns}
                color="text-primary-8"
            />
            <BoxInfo
                titre="Nombre des comptes resilier"
                Nombre={Nbrresilier}
                color="text-primary-7"
            />
            <BoxInfo
                titre="Nombre des comptes exonorer"
                Nombre={NbrExonorer}
                color="text-primary-3"
            />

        </div>
    )
}

export default DashbordBoxFetch