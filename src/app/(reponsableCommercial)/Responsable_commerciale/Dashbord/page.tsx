import { MyBetterChart } from "@/components/MyChart";
import { PieChartDonutWithText } from "@/components/PyChart";
import BoxInfo from "@/components/Superviseur/BoxInfo";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex justify-around flex-wrap gap-10">
        <BoxInfo titre="Boite Postal : Petit" Nombre="18" color="" />
        <BoxInfo
          titre="Boite Postal : Moyen"
          Nombre="10"
          color="text-primary-2"
        />
        <BoxInfo
          titre="Boite Postal : Grand"
          Nombre="20"
          color="text-primary-3"
        />
        <BoxInfo
          titre="Nombre des abonnes"
          Nombre="305"
          color="text-primary-4"
        />
        <BoxInfo
          titre="Nombre des abonnes à jour"
          Nombre="205"
          color="text-primary-5"
        />
        <BoxInfo
          titre="Nombre des abonnes non à jour"
          Nombre="100"
          color="text-primary-6"
        />
        <BoxInfo
          titre="Nombre des comptes resilier"
          Nombre="15"
          color="text-primary-7"
        />
        <BoxInfo
          titre="Nombre des comptes exonorer"
          Nombre="10"
          color="text-primary-3"
        />
      </div>
      {/* charte and table of compagne */}
      <div className="flex gap-4">
        <div className="w-2/3 py-4">
          <MyBetterChart
            AbonneTotal={305}
            Abonne_a_jour={205}
            Abonne_non_a_jour={100}
          />
        </div>
        <div className="w-2/3 py-4">
          <PieChartDonutWithText BpPetit={18} BpMoyen={10} BpGrand={20} />
        </div>
      </div>
    </>
  );
};

export default page;
