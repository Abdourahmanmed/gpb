import { usePathname } from 'next/navigation';
import React from 'react';

interface ImprimeryProps<T> {
    donnees: T; // Type des données basé sur le schéma
    recueNumber: string;
    NomRecue: string;
    totalMontant?: number; // Prop facultative
}

const Imprimery = <T,>({ donnees, recueNumber, NomRecue, totalMontant }: ImprimeryProps<T>) => {
    const path = usePathname();

    return (
        <div className="h-max w-full p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Reçue du paiement {NomRecue}</h1>
            {/* Numéro de reçu */}
            <div className="mt-4 text-xl py-4 font-semibold">
                <span>Numéro de reçu : </span>
                <span className="text-blue-700">{recueNumber}</span>
            </div>

            {/* Section conditionnelle */}
            {path === "/Agent_guiche/Ajout_sous_couverte" && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700">Sous-Couvertures</h3>
                    <ul className="list-disc pl-5 space-y-3">
                        {(donnees as any).sousCouvertures.map((item: any, index: number) => (
                            <li key={index} className="text-gray-600">
                                <div>
                                    <strong className="text-gray-800">Société :</strong> <span>{item.societe}</span>
                                </div>
                                <div>
                                    <strong className="text-gray-800">Personne :</strong> <span>{item.personne}</span>
                                </div>
                                <div>
                                    <strong className="text-gray-800">Adresse :</strong> <span>{item.adresse}</span>
                                </div>
                                <div>
                                    <strong className="text-gray-800">Téléphone :</strong> <span>{item.telephone}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Contenu du paiement */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="text-lg font-semibold text-gray-700">
                        <strong>Méthode de paiement :</strong> {(donnees as any).Methode_de_paiement}
                    </div>
                    {(donnees as any).Wallet ? (
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
                            <div className="text-sm text-gray-800">
                                <strong>Wallet :</strong> {(donnees as any).Wallet}
                            </div>
                            <div className="text-sm text-gray-800">
                                <strong>Numéro téléphone :</strong> {(donnees as any).Numero_wallet}
                            </div>
                            <div className="text-sm text-gray-800">
                                <strong>Montant :</strong>{" "}
                                {path === "/Agent_guiche/Ajout_sous_couverte" && totalMontant
                                    ? `${totalMontant} Djf`
                                    : `${(donnees as any).Montant} Djf`}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
                            <div className="text-sm text-gray-800">
                                <strong>Montant :</strong>{" "}
                                {path === "/Agent_guiche/Ajout_sous_couverte" && totalMontant
                                    ? `${totalMontant} Djf`
                                    : `${(donnees as any).Montant} Djf`}
                            </div>
                            {(donnees as any).Methode_de_paiement === "cheque" && (
                                <>
                                    <div className="text-sm text-gray-800">
                                        <strong>Numéro chèque :</strong> {(donnees as any).Numero_cheque}
                                    </div>
                                    <div className="text-sm text-gray-800">
                                        <strong>Banque :</strong> {(donnees as any).Nom_Banque}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Imprimery;
