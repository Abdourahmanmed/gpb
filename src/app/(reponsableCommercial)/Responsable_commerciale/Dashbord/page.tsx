import DynamicCharts from "@/components/DynamicCharts";
import DashbordBoxFetch from "@/components/ResponsableCommercial/DashbordBoxFetch";
import React from "react";

const page = () => {
  return (
    <>
      <DashbordBoxFetch />
      {/* charte and table of compagne */}
      <DynamicCharts />
    </>
  );
};

export default page;
