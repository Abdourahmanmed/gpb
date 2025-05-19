"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { LivreDoForm } from '../AgentGuiche/components/LivreDoForm';
interface DataClient {
    Redevance: number,
    Nom: string,
    TypeClient: string
}
interface Lvdpropos {
    ClientId: string;
    Np: string;
    dataClient: DataClient;
}

const LivraisonDColAction = ({ ClientId, Np, dataClient }: Lvdpropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Ajouter livraison domicile
            </Button>
            <LivreDoForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} Np={Np} dataClient={dataClient} />
        </div>
    );
}

export default LivraisonDColAction