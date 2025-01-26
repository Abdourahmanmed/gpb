import { NoFilterDataTable } from "@/components/Tables/NoFilterData";
import React from "react";
import { DepotColumns } from "../columns/DepotCol";
const clients = [
  {
    id: 1,
    Nom: "abdirahman",
    NBp: "2014",
    Etat: "non mis a jour",
    Telephone: "77141414",
  },
];

const DepotResiliation = () => {
  return (
    <NoFilterDataTable data={clients} columns={DepotColumns} typeName="Nom" />
  );
};

export default DepotResiliation;
