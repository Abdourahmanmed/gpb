import { PaiementSchema } from '@/Schema/schema';
import React from 'react'
import { z } from 'zod';

// Typage du formulaire
type PaiementFormValues = z.infer<typeof PaiementSchema>;

interface ImprimeryPrpos {
    donnees: PaiementFormValues,
    recueNumber: string
    NomRecue: string
}

const Imprimery = ({ donnees, recueNumber, NomRecue }: ImprimeryPrpos) => {
    return (
        <div className="h-max w-full  p-4 ">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Reçue du paiement {NomRecue}</h1>
            {/* Numéro de reçu */}
            <div className="mt-4 text-xl py-4 font-semibold">
                <span>Numéro de reçu : </span>
                <span className="text-blue-700">{recueNumber}</span>
            </div>
            <div className="space-y-6">
                {/* Méthode de Paiement */}
                <div className="space-y-2">
                    <div className="text-lg font-semibold text-gray-700">
                        <strong>Méthode de paiement :</strong> {donnees.Methode_de_paiement}
                    </div>
                    {donnees.Wallet ? (
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
                            <div className="text-sm text-gray-800">
                                <strong>Wallet :</strong> {donnees.Wallet}
                            </div>
                            <div className="text-sm text-gray-800">
                                <strong>Numero telephone :</strong> {donnees.Numero_wallet}
                            </div>
                            <div className="text-sm text-gray-800">
                                <strong>Montant :</strong> {donnees.Montant}  Djf
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md">
                            <div className="text-sm text-gray-800">
                                <strong>Montant :</strong> {donnees.Montant} Djf
                            </div>
                            {donnees.Methode_de_paiement === "cheque" && (
                                <>
                                    <div className="text-sm text-gray-800">
                                        <strong>Numero cheque :</strong> {donnees.Numero_cheque}
                                    </div>
                                    <div className="text-sm text-gray-800">
                                        <strong>Banque :</strong> {donnees.Nom_Banque} 
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Imprimery