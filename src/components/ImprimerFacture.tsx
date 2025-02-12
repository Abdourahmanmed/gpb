"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { DetailType } from "./AgentGuiche/columns/colonDetail";
import HeaderImprimary from "./AgentGuiche/components/HeaderImprimary";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

type ImprimerClientFactureProps = {
    ClientFacture: DetailType;
};

const ImprimerClientFacture: React.FC<ImprimerClientFactureProps> = ({ ClientFacture }) => {
    const [PrintJS, setPrintJS] = useState<any>(null); // Référence à printJS
    const printAreaRef = useRef<HTMLDivElement>(null); // Référence pour l'impression

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
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <span className="flex items-center cursor-pointer"><Printer className="w-4 h-4 mr-2" />{ClientFacture.reference}</span>
                </DialogTrigger>
                <DialogContent className=" p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
                    <ScrollArea className="max-h-[70vh] w-full">
                        <DialogHeader className="border-b-2 pb-4 mb-6">
                            <DialogTitle className="text-2xl font-bold text-gray-800">Imprimer</DialogTitle>
                        </DialogHeader>

                        {/* Section à imprimer */}
                        <div
                            id="print-area"
                            ref={printAreaRef}
                            className="rounded-md border border-gray-300 p-4 flex flex-col items-center w-full mt-2"
                        >
                            <HeaderImprimary />
                            {/* Zone cachée contenant les détails de la facture */}
                            <div ref={printAreaRef}>
                                <div className="mt-4 text-xl py-4 font-semibold flex justify-between gap-4 items-center border-b">
                                    <h2 className="text-2xl font-bold text-gray-800">Résumé</h2>
                                    <div>
                                        <span className="text-gray-600">Numéro de reçu :</span>
                                        <span className="text-blue-700 font-medium ml-2">
                                            {ClientFacture.reference}
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-lg font-bold mt-3 pb-2">Détails de la Facture</h2>
                                <p><strong>Catégorie :</strong> {ClientFacture.categorie}</p>
                                <p><strong>Montant :</strong> {ClientFacture.montant}</p>
                                <p><strong>Méthode de Paiement :</strong> {ClientFacture.methode_payment}</p>
                                <p><strong>Type Wallet :</strong> {ClientFacture.type_wallet ?? "N/A"}</p>
                                <p><strong>Numéro Wallet :</strong> {ClientFacture.numero_wallet}</p>
                                {ClientFacture.numero_cheque && <p><strong>Numéro Chèque :</strong> {ClientFacture.numero_cheque}</p>}
                                {ClientFacture.nom_banque && <p><strong>Banque :</strong> {ClientFacture.nom_banque}</p>}
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="flex justify-end space-y-2">
                        <Button onClick={handleImprimary} type="submit">Imprimer</Button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImprimerClientFacture;
