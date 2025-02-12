"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles de react-toastify
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { DetailsColumns, DetailType } from "./AgentGuiche/columns/colonDetail";
import { NoFilterDataTable } from "./Tables/NoFilterData";

interface DetailProps {
    IdClient: string;
    Nom: string;
}



const Detail = ({ IdClient, Nom }: DetailProps) => {
    const [detail, setDetail] = useState<DetailType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetail = async () => {
            const api = `http://localhost/gbp_backend/api.php?method=GetDetailsPaiement&id=${IdClient}`;

            try {
                const response = await fetch(api, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Erreur de réponse du serveur");
                }

                const responseData: DetailType[] = await response.json();

                if (!responseData || responseData.length === 0) {
                    toast.error("Aucune donnée trouvée");
                    return;
                }

                setDetail(responseData);
            } catch (error) {
                console.error(error);
                toast.error("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [IdClient]);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Voir les détails</Button>
                </DialogTrigger>
                <DialogContent className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl py-2">
                            Les détails paiements du client : <span className="text-blue-500">{Nom}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] max-w-[600px]">
                        <hr />
                        <div className="p-4">
                            {loading ? (
                                <p className="text-center text-blue-500">Chargement des données...</p>
                            ) : detail.length > 0 ? (
                                <NoFilterDataTable data={detail} columns={DetailsColumns} typeName="categorie" />
                            ) : (
                                <p className="text-center text-gray-500">Aucune information disponible</p>
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <ToastContainer />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Detail;