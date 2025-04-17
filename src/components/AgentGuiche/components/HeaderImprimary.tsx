import Image from 'next/image'
import React from 'react'

const HeaderImprimary = () => {
    return (
        <div className="flex items-center gap">
            <div className="flex items-center">
                {/* Logo à gauche */}
                <div className="w-max h-max rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                        src="/logoposte.png"
                        alt="Logo"
                        width={100} // Largeur de 64px
                        height={100} // Hauteur de 64px
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

            {/* Texte principal */}
            <div className="flex-1 text-center">
                <div className="text-lg font-bold">
                    REPUBLIQUE DE DJIBOUTI
                </div>
                <div className="text-sm italic my-1">
                    Unité - Égalité - Paix
                </div>
            </div>
        </div>
    )
}

export default HeaderImprimary