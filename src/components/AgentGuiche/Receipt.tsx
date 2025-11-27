"use client";
import Image from "next/image";
import React from "react";

interface ReceiptProps {
  dataClient: any;
  donnees: any;
  recueNumber: string;
}

const Receipt = ({ dataClient, donnees, recueNumber }: ReceiptProps) => {
  return (
    <div className="rounded-md p-4 flex flex-col items-center w-[900px] border-b border-dashed border-gray-300 mb-6 print:mb-0">
      <div className="w-full">
        {/* --- En-tête --- */}
        <div className="flex-1 text-center">
          <div className="text-lg font-bold">REPUBLIQUE DE DJIBOUTI</div>
          <div className="text-sm italic my-1">Unité - Égalité - Paix</div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center flex-col">
            {/* Logo */}
            <div className="w-max h-max rounded-full flex items-center justify-center overflow-hidden pt-4 gap-2">
              <Image
                src="/logoposte.png"
                alt="Logo"
                width={70}
                height={70}
                className="object-cover"
              />
            </div>
            <div className="">
              <div className="text-blue-500 font-bold mt-4 text-lg">
                LA POSTE DE DJIBOUTI S.A
              </div>
              <div className="text-sm uppercase">DIRECTION COMMERCIALE</div>
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="text-left text-gray-700 space-y-2 w-[300px] mt-24">
            <p className="italic">
              Djibouti, le {new Date().toLocaleDateString()}
            </p>
            <p className="font-semibold text-lg">
              N° Reçu :
              <span className="text-primary text-[0.8rem] ml-2">
                {recueNumber}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Coordonnées --- */}
      <div className="flex flex-col mt-4 mb-2 text-gray-700 w-full ">
        <strong className="text-[0.4rem]">Boulevard de la République</strong>
        <span className="text-[0.4rem] mt-2">
          <strong>Tél :</strong> +253 21 35 48 02 / +253 21 25 03 12
        </span>
        <span className="text-[0.4rem] mt-2">
          <strong>Email :</strong>{" "}
          <a href="mailto:contact@laposte.dj" className="underline">
            contact@laposte.dj
          </a>
        </span>
        <span className="text-[0.4rem] mt-2">
          <strong>Site web :</strong>{" "}
          <a
            href="http://www.laposte.dj"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.laposte.dj
          </a>
        </span>
      </div>

      {/* --- Informations client --- */}
      <h5 className="font-bold text-xl mt-6 mb-4 w-full">
        Client : {dataClient?.Nom}
      </h5>
      <h5 className="font-bold text-xl mt-6 mb-4 w-full">
        NBP: {dataClient?.NBP} -- {dataClient?.TypeBp}
      </h5>

      {/* --- Table --- */}
      {donnees && (
        <div className="h-max w-full p-4">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr>
                <th>Redevance</th>
                <th>Type Client</th>
                <th>Méthode de paiement</th>
                <th>Pénalité</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{dataClient?.Redevance}</td>
                <td className="text-center">{dataClient?.TypeClient}</td>
                <td className="flex gap-2 items-center justify-center text-center">
                  <div className="mb-2">{donnees.Methode_de_paiement}</div>
                  {donnees.Wallet ? (
                    <div className="flex justify-between items-center gap-4 p-4 bg-gray-50 rounded-md shadow-md">
                      <div className="text-sm text-gray-800">
                        <strong>Wallet :</strong> {donnees.Wallet}
                      </div>
                      <div className="text-sm text-gray-800">
                        <strong>Téléphone :</strong> {donnees.Numero_wallet}
                      </div>
                    </div>
                  ) : (
                    donnees?.Methode_de_paiement === "cheque" && (
                      <div className="flex justify-between items-center gap-4 p-4 bg-gray-50 rounded-md shadow-md">
                        <div className="text-sm text-gray-800">
                          <strong>Chèque :</strong> {donnees.Numero_cheque}
                        </div>
                        <div className="text-sm text-gray-800">
                          <strong>Banque :</strong> {donnees.Nom_Banque}
                        </div>
                      </div>
                    )
                  )}
                </td>
                <td className="text-center">{dataClient.Penaliter} Djf</td>
                <td className="text-center">{donnees.Montant} Djf</td>
              </tr>
              <tr>
                <td colSpan={4} className="text-right pr-3">
                  Montant Total :
                </td>
                <td className="text-center p-6">{donnees.Montant} Djf</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="w-full flex justify-end font-medium mt-6 mb-28">
        Service Commercial
      </div>
    </div>
  );
};

export default Receipt;
