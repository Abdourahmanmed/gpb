import { MyBetterChart } from "@/components/MyChart";
import { PieChartDonutWithText } from "@/components/PyChart";
import DashbordBoxFetch from "@/components/ResponsableCommercial/DashbordBoxFetch";
import BoxInfo from "@/components/Superviseur/BoxInfo";
import React from "react";

const page = () => {
  return (
    <>
      <DashbordBoxFetch />
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
