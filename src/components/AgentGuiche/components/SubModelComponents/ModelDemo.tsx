"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./animated-modal";

interface SousCouvertInfo {
    id: number;
    Nom_societe: string;
    Nom_personne: string;
    Telephone: string;
    Adresse: string;
    // Ajoute d'autres champs selon ta base de données
}
interface LvdInfo {
    id: number;
    Adresse: string;
    // Ajoute d'autres champs selon ta base de données
}
interface CollectionInfo {
    id: number;
    Adresse: string;
    // Ajoute d'autres champs selon ta base de données
}
// Union des types possibles pour `data`
type DataInfo = SousCouvertInfo | LvdInfo | CollectionInfo

interface ModelProps {
    Nbr: number;
    Nom: string;
    data: DataInfo[]; // Remplace `any[]` par un type plus précis si possible
    loading: boolean;
    error: string | null;
    Type: String;
    Titre: String;
}

export function AnimatedModalDemo({ Nbr, Nom, data, loading, error, Type, Titre }: ModelProps) {
    // Type guards pour chaque type
    function isSousCouvertInfo(item: any): item is SousCouvertInfo {
        return 'Nom_societe' in item && 'Nom_personne' in item && 'Telephone' in item && 'Adresse' in item;
    }

    function isLvdInfo(item: any): item is LvdInfo {
        return 'Adresse' in item;
    }
    // Déterminer si data est de type SousCouvertInfo
    const isSousCouvert = data.length > 0 && isSousCouvertInfo(data[0]);
    return (
        <div className="flex items-center justify-center">
            <Modal>
                <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        {Nbr}
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ➡️
                    </div>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Les informations{" "}
                            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                {Titre}
                            </span>{" "}
                            du client {Nom}
                        </h4>
                        <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                            {loading ? (
                                <p className="text-blue-500 animate-pulse mt-2">🔄 Chargement en cours...</p>
                            ) : error ? (
                                <p className="text-red-500 mt-2">❌ {error}</p>
                            ) : data.length > 0 ? (
                                <div className="flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                                    <table className="min-w-full mt-4 table-auto border-collapse bg-gray-100 rounded">
                                        <thead>
                                            <tr>
                                                {isSousCouvert ? (
                                                    <>
                                                        <th className="px-4 py-2 border-b text-left">Société</th>
                                                        <th className="px-4 py-2 border-b text-left">Personne</th>
                                                        <th className="px-4 py-2 border-b text-left">Téléphone</th>
                                                        <th className="px-4 py-2 border-b text-left">Adresse</th>
                                                        <th className="px-4 py-2 border-b text-left">Date</th>
                                                    </>
                                                ) : (
                                                    <th className="px-4 py-2 border-b text-left">Adresse</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item) => (
                                                <tr key={item.id}>
                                                    {isSousCouvertInfo(item) ? (
                                                        <>
                                                            <td className="px-4 py-2 border-b">{item.Nom_societe}</td>
                                                            <td className="px-4 py-2 border-b">{item.Nom_personne}</td>
                                                            <td className="px-4 py-2 border-b">{item.Telephone}</td>
                                                            <td className="px-4 py-2 border-b">{item.Adresse}</td>
                                                        </>
                                                    ) : isLvdInfo(item) ? (
                                                        <td colSpan={5} className="px-4 py-2 border-b">{item.Adresse}</td>
                                                    ) : null}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            ) : (
                                <p className="text-gray-500 mt-2">Aucune donnée disponible.</p>
                            )}
                        </div>

                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}

