"use client";
import { Check } from "lucide-react";
import HeaderImprimary from "./components/HeaderImprimary";

interface ReceiptContentCommercialProps {
  recueNumber: any;
  dataClient?: any;
  Np?: any;
  donnees?: any;
}

export default function ReceiptContentCommercial({
  recueNumber,
  dataClient,
  Np,
  donnees,
}: ReceiptContentCommercialProps) {
  return (
    <div
      id="print-area"
      className="rounded-md b p-4 flex flex-col items-center w-full"
    >
      {/* En-tête */}
      <HeaderImprimary Reference={recueNumber} />

      {/* Informations de contact */}
      <div className="flex flex-col mt-4 mb-2 text-gray-700 dark:text-gray-300 w-full">
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

      {/* Informations client */}
      <h5 className="font-bold text-xl mt-6 mb-4 w-full">
        Client : {dataClient?.Nom}
      </h5>
      <h5 className="font-bold text-xl mt-6 mb-4 w-full">
        NBP : {Np} -- {dataClient?.Type}
      </h5>

      {/* Tableau des paiements */}
      {donnees && (
        <div className="h-max w-full p-4">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr>
                <th>Redevance</th>
                <th>Type Client</th>
                <th>Livraison à domicile</th>
                <th>Méthode de paiement</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{dataClient?.Redevance}</td>
                <td className="text-center">{dataClient?.TypeClient}</td>
                <td className="text-center pl-16">
                  <Check />
                </td>
                <td className="flex gap-2 items-center justify-center">
                  <div className="mb-2 text-center">
                    {donnees.Methode_de_paiement}
                  </div>

                  {/* Paiement par Wallet */}
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
                    // Paiement par chèque
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
                <td className="text-center">{donnees.Montant} Djf</td>
              </tr>

              {/* Ligne total */}
              <tr>
                <td colSpan={4} className="text-right pr-3 pt-6">
                  Montant Total :
                </td>
                <td className="text-center pt-6">{donnees.Montant} Djf</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Pied de page */}
      <div className="w-full flex justify-end mr-56 text-3xl font-semibold mb-28">
        Service commerciale
      </div>
    </div>
  );
}
