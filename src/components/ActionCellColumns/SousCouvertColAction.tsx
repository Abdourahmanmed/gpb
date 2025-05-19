"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import SousCouverteForm from '../AgentGuiche/components/SousCouverteForm';
interface DataClient {
    Redevance: number,
    Nom: string,
}
interface SouscouvertPropos {
    ClientId: string,
    Nbp: string,
    TypeClient: string,
    dataClient: DataClient,
}

const SousCouvertColAction = ({ ClientId, Nbp, TypeClient, dataClient }: SouscouvertPropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Ajouter un sous couverte
            </Button>
            <SousCouverteForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} IdClient={ClientId} Nbp={Nbp} TypeClient={TypeClient} dataClient={dataClient} />
        </div>
    );
}

export default SousCouvertColAction