"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./AgentGuiche/components/SubModelComponents/animated-modal";
import HeaderImprimary from "./AgentGuiche/components/HeaderImprimary";

interface HistoriqueBoite {
  NumeroBoite: string;
  IdClient: number;
  NomClient: string;
  TypeClient: string;
  Telephone: string | null;
  Email: string | null;
  DateDebut: string | null;
  DateFin: string | null;
  StatutOccupation: string;
  NombreAnnees: number;
  AnneeAbonnement: string | null;
  StatutAbonnement: string | null;
}

interface ModelProps {
  Name?: string;
  Id_bp: string;
  data: HistoriqueBoite[] | null;
  loading: boolean;
  error: string | undefined;
}

export function ModelDetailsBp({
  Name,
  Id_bp,
  data,
  loading,
  error,
}: ModelProps) {
  const [PrintJS, setPrintJS] = useState<any>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("print-js").then((module) => {
        setPrintJS(() => module.default);
      });
    }
  }, []);

  const handleImprimary = () => {
        if (PrintJS && printAreaRef.current) {
            PrintJS({
                printable: printAreaRef.current,
                type: "html",
                targetStyles: ["*"],
            });
        }
    };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-primary dark:bg-white dark:text-black text-white flex justify-center group/modal-btn relative overflow-hidden rounded-md py-2 px-4 font-semibold">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {Name || "Voir détails"}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📄
          </div>
        </ModalTrigger>

        <ModalBody className="w-full">
          <ModalContent className="w-full bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6">
         <h1 className="text-3xl capitalize text-center">detail de la Boite Postale : <span className="text-blue-950 font-bold">{Id_bp}</span> </h1>
            <ScrollArea className="h-[420px] w-full rounded-md px-4 mt-4">
              <div className="flex flex-col gap-6" ref={printAreaRef}>
                {loading ? (
                  <p className="text-center text-gray-500">Chargement...</p>
                ) : error ? (
                  <p className="text-center text-red-500 font-medium">
                    {error}
                  </p>
                ) : !data || data.length === 0 ? (
                  <p className="text-center text-gray-400">
                    Aucun historique trouvé pour cette boîte postale.
                  </p>
                ) : (
                  data.map((item, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-xl border transition ${
                        item.StatutOccupation === "Actuel"
                          ? "bg-green-50 border-green-400"
                          : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-blue-700">
                          {item.NomClient}
                        </h3>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            item.StatutOccupation === "Actuel"
                              ? "bg-green-600 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {item.StatutOccupation}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                        <p>
                          <strong>Type client :</strong> {item.TypeClient}
                        </p>
                        <p>
                          <strong>Téléphone :</strong> {item.Telephone || "N/A"}
                        </p>
                        <p>
                          <strong>Email :</strong> {item.Email || "N/A"}
                        </p>
                        <p>
                          <strong>Date début :</strong> {item.DateDebut}
                        </p>
                        <p>
                          <strong>Date fin :</strong>{" "}
                          {item.DateFin || "En cours"}
                        </p>
                        <p>
                          <strong>Durée :</strong> {item.NombreAnnees} an
                          {item.NombreAnnees > 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm">
                          <strong>Années d’abonnement :</strong>{" "}
                          {item.AnneeAbonnement || "—"}
                        </p>
                        <p className="text-sm">
                          <strong>Statuts d’abonnement :</strong>{" "}
                          {item.StatutAbonnement || "—"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <ModalFooter className="flex justify-center mt-6">
              <button
                onClick={handleImprimary}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-md transition"
              >
                🖨️ Imprimer
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
