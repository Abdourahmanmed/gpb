"use client";
import React, { useEffect, useState } from "react";
import BoxInfo from "../Superviseur/BoxInfo";
import { FetchGrandBp } from "@/actions/All_references/FecthGrandBp";
import { FetchMoyenBp } from "@/actions/All_references/FecthMoyenBp";
import { FetchPetiteBp } from "@/actions/All_references/FetchPetiteBp";
import { FetchNombreabonne } from "@/actions/All_references/FectNombreAbonne";
import { FetchNombreabonneAjour } from "@/actions/All_references/FetchNbrAbonneAjour";
import { FetchNombreabonneNonAjour } from "@/actions/All_references/FetchNbrAbonneNonAjour";
import { FetchNombreabonneResilier } from "@/actions/All_references/FetchNombreCptResilier";
import { FetchNombreabonneExonorer } from "@/actions/All_references/FetchNbrCptExonorer";
import { FetchMontantParJour } from "@/actions/All_references/FetchMontantParJour";
import { FetchMontantParMois } from "@/actions/All_references/FetchMontantParMois";
import { FetchMontantParAns } from "@/actions/All_references/FetchMontantParAns";

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

  useEffect(() => {
    (async () => {
      SetBpG(await FetchGrandBp());
      SetBpM(await FetchMoyenBp());
      SetBpP(await FetchPetiteBp());
      SetNbrAbonne(await FetchNombreabonne());
      SetNbrAbonneAjour(await FetchNombreabonneAjour());
      SetNbrAbonneNonAjour(await FetchNombreabonneNonAjour());
      SetNbrresilier(await FetchNombreabonneResilier());
      SetNbrExonorer(await FetchNombreabonneExonorer());
      SetNbrMontantParJour(await FetchMontantParJour());
      SetNbrMontantParMois(await FetchMontantParMois());
      SetNbrMontantParAns(await FetchMontantParAns());
    })();
  }, []);

  return (
    <div className="grid gap-6">
      {/* Ligne 1 : BP */}
      <div className="grid grid-cols-3 gap-6">
        <BoxInfo
          titre="Boîte postale : Petite"
          Nombre={BpP}
          color="text-primary-3"
        />
        <BoxInfo
          titre="Boîte postale : Moyenne"
          Nombre={BpM}
          color="text-primary-2"
        />
        <BoxInfo
          titre="Boîte postale : Grande"
          Nombre={BpG}
          color="text-primary-1"
        />
      </div>

      {/* Ligne 2 : Abonnés */}
      <div className="grid grid-cols-3 gap-6">
        <BoxInfo
          titre="Nombre d’abonnés"
          Nombre={NbrAbonne}
          color="text-primary-4"
        />
        <BoxInfo
          titre="Nombre de boîtes à jour"
          Nombre={NbrAbonneAjour}
          color="text-primary-5"
        />
        <BoxInfo
          titre="Nombre de boîtes non à jour"
          Nombre={NbrAbonneNonAjour}
          color="text-primary-6"
        />
      </div>

      {/* Ligne 3 : Montants */}
      <div className="grid grid-cols-3 gap-6">
        <BoxInfo
          titre="Montant total journalier"
          Nombre={NbrMontantParJour}
          color="text-primary-8"
        />
        <BoxInfo
          titre="Montant total mensuel"
          Nombre={NbrMontantParMois}
          color="text-primary-8"
        />
        <BoxInfo
          titre="Montant total annuel"
          Nombre={NbrMontantParAns}
          color="text-primary-8"
        />
      </div>

      {/* Ligne 4 : Comptes spéciaux */}
      <div className="grid grid-cols-2 gap-6">
        <BoxInfo
          titre="Nombre de boîtes résiliées"
          Nombre={Nbrresilier}
          color="text-primary-7"
        />
        <BoxInfo
          titre="Nombre de boîtes exonérées"
          Nombre={NbrExonorer}
          color="text-primary-3"
        />
      </div>
    </div>
  );
};

export default DashbordBoxFetch;
