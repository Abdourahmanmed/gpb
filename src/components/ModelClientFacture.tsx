"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./AgentGuiche/components/SubModelComponents/animated-modal";
import HeaderImprimary from "./AgentGuiche/components/HeaderImprimary";

interface Impaye {
    annee: number;
    montant: number;
    penalite: number;
    total: number;
}

interface ApiResponse {
    impayes: Impaye[];
    nouveau_nfacture: string;
}

interface ModelProps {
    Name: string;
    Nom: string;
    data: ApiResponse | null;
    loading: boolean;
    error: string | null;
    Titre: string;
}

export function ModelClientFacture({ Name, Nom, data, loading, error, Titre }: ModelProps) {
    const [PrintJS, setPrintJS] = useState<any>(null);
    const printAreaRef = useRef<HTMLDivElement>(null);
    // console.log(data?.annees_impayees);
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
                <ModalTrigger className="bg-primary dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">{Name}</span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ➡️
                    </div>
                </ModalTrigger>

                <ModalBody>
                    <ModalContent className="w-full">
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Les informations <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">{Titre}</span> du client {Nom}
                        </h4>

                        <ScrollArea className="h-[400px] w-full rounded-md px-4">
                            <div className="flex flex-col gap-6" ref={printAreaRef}>
                                <div className="p-4 rounded-md shadow-sm bg-white dark:bg-neutral-900 w-full">
                                    <HeaderImprimary Reference={data?.nouveau_nfacture} NameOfFacture="Facture" />

                                    <div className="flex flex-col mb-2 text-gray-700 dark:text-gray-300 text-[0.4rem]">
                                        <strong>Boulevard de la République</strong>
                                        <span><strong>Tél :</strong> +253 21 35 48 02 / +253 21 25 03 12</span>
                                        <span><strong>Email :</strong> <a href="mailto:contact@laposte.dj" className="underline">contact@laposte.dj</a></span>
                                        <span><strong>Site web :</strong> <a href="http://www.laposte.dj" className="underline" target="_blank" rel="noopener noreferrer">www.laposte.dj</a></span>
                                    </div>

                                    <h5 className="font-bold text-xl mt-6">Client : {Nom}</h5>

                                    {data && data.impayes && Array.isArray(data.impayes) ? (
                                        <>
                                            <table className="w-full border border-gray-300 mb-6">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border p-2 text-left">Année</th>
                                                        <th className="border p-2 text-left">Montant</th>
                                                        <th className="border p-2 text-left">Pénalité</th>
                                                        <th className="border p-2 text-left">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.impayes.map((item) => (
                                                        <tr key={item.annee}>
                                                            <td className="border p-2">{item.annee}</td>
                                                            <td className="border p-2">{item.montant.toLocaleString()} Fdj</td>
                                                            <td className="border p-2">{item.penalite.toLocaleString()} Fdj</td>
                                                            <td className="border p-2">{item.total.toLocaleString()} Fdj</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <div className="text-right font-bold text-lg">
                                                Total global:{" "}
                                                {data.impayes
                                                    .reduce((acc, curr) => acc + curr.total, 0)
                                                    .toLocaleString()}{" "}
                                                Fdj
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-red-600">Aucune donnée disponible ou format incorrect.</p>
                                    )}

                                </div>
                            </div>
                        </ScrollArea>

                        <ModalFooter className="flex justify-center mt-4">
                            <button
                                onClick={handleImprimary}
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-md"
                            >
                                Imprimer
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}
