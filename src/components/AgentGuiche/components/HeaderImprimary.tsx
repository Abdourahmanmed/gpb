import { Span } from 'next/dist/trace';
import Image from 'next/image'
import React from 'react'
interface ReferencePropos {
    Reference: string | undefined;
    NameOfFacture?: string; // propriété optionnelle
}
const HeaderImprimary = ({ Reference, NameOfFacture }: ReferencePropos) => {
    return (
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
                    <p className="font-semibold text-lg">N° {NameOfFacture ? (<span>{NameOfFacture}</span>) : "Reçue"} : <span className="text-primary text-[0.8rem]">{Reference}</span></p>
                </div>
            </div>
        </div>
    )
}

export default HeaderImprimary