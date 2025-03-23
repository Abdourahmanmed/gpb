"use client";
import React from "react";

import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./animated-modal";
import { motion } from "motion/react";

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

const PlaneIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
        </svg>
    );
};

const VacationIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
            <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
            <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
            <path d="M15 9l-3 5.196" />
            <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
        </svg>
    );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
            <path d="M10 10l2 -2l2 2" />
            <path d="M10 14l2 2l2 -2" />
        </svg>
    );
};

const FoodIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
        </svg>
    );
};

const MicIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
            <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
        </svg>
    );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M22 12a10 10 0 1 0 -20 0" />
            <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
            <path d="M2 12l10 10l-3.5 -10" />
            <path d="M15.5 12l-3.5 10l10 -10" />
        </svg>
    );
};
