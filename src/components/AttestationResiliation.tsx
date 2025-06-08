'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type AttestationProps = {
    nom: string;
    numeroBoite: number;
    dateResiliation: string;
};

const AttestationResiliation: React.FC<AttestationProps> = ({
    nom,
    numeroBoite,
    dateResiliation,
}) => {
    const attestationRef = useRef<HTMLDivElement>(null);
    const [PrintJS, setPrintJS] = useState<any>(null);  // Référence à printJS

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Importer printJS uniquement côté client
            import("print-js").then((module) => {
                setPrintJS(() => module.default);
            });
        }
    }, []);

    const handlePrint = () => {
        // Vérification que PrintJS est chargé et que l'élément à imprimer est bien disponible
        // Vérification que PrintJS est chargé et que le DOM est prêt
        if (PrintJS && attestationRef.current) {
            PrintJS({
                printable: attestationRef.current,
                type: "html",
                targetStyles: ["*"],
            });
        }
    };

    return (
        <div className="w-full">
            <div ref={attestationRef} className='w-full'>
                <div className="w-full">
                    {/* Texte principal */}
                    <div className="flex-1 text-center">
                        <div className="text-lg font-bold">
                            REPUBLIQUE DE DJIBOUTI
                        </div>
                        <div className="text-sm italic my-1">
                            Unité - Égalité - Paix
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-center flex-col">
                            {/* Logo à gauche */}
                            <div className="w-max h-max rounded-full flex items-center justify-center overflow-hidden pt-4 gap-2">
                                <Image
                                    src="/logoposte.png"
                                    alt="Logo"
                                    width={70} // Largeur de 64px
                                    height={70} // Hauteur de 64px
                                    className="object-cover"
                                />
                            </div>
                            <div className="">
                                <div className="text-blue-500 font-bold mt-4 text-lg">
                                    LA POSTE DE DJIBOUTI S.A
                                </div>
                                <div className="text-sm uppercase">
                                    DIRECTION COMMERCIALE
                                </div>
                            </div>
                        </div>




                        {/* Colonne de droite : Date et numéro de reçu */}
                        <div className="text-left text-gray-700 dark:text-gray-300 space-y-2 w-[300px] mt-24">
                            <p className="italic">Djibouti, le {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-4 mb-2 text-gray-700 dark:text-gray-300 w-full ">
                    <strong className="text-[0.4rem]">Boulevard de la République</strong>
                    <span className="text-[0.4rem] mt-2"><strong>Tél :</strong> +253 21 35 48 02 / +253 21 25 03 12</span>
                    <span className="text-[0.4rem] mt-2"><strong>Email :</strong> <a href="mailto:contact@laposte.dj" className="underline">contact@laposte.dj</a></span>
                    <span className="text-[0.4rem] mt-2"><strong>Site web :</strong> <a href="http://www.laposte.dj" className="underline" target="_blank" rel="noopener noreferrer">www.laposte.dj</a></span>
                </div>
                <div className="w-full mx-auto p-6 bg-white  rounded-md">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">Attestation de Résiliation</h2>
                        <p className="text-justify leading-relaxed">
                            Je soussigné(e) <strong>{nom}</strong>, atteste par la présente avoir résilié la boîte
                            postale numéro <strong>{numeroBoite}</strong> à la date du{' '}
                            <strong>{new Date(dateResiliation).toLocaleDateString()}</strong>.
                        </p>
                        <p className="mt-4">Fait pour servir et valoir ce que de droit.</p>
                        <p className="mt-6">Signature : ____________________________</p>
                    </div>


                </div>
            </div>
            <button
                onClick={handlePrint}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Imprimer
            </button>
        </div>
    );
};

export default AttestationResiliation;
