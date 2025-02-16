import DynamicCharts from "@/components/DynamicCharts";
import DashbordBoxFetch from "@/components/ResponsableCommercial/DashbordBoxFetch";
import React from "react";

export default function page() {
  return (
    <>
      <DashbordBoxFetch />
      {/* charte and table of compagne */}
      <DynamicCharts />
    </>
  );
}
