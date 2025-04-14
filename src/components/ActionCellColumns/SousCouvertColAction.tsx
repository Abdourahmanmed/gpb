"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import SousCouverteForm from '../AgentGuiche/components/SousCouverteForm';

interface SouscouvertPropos {
    ClientId: string,
    Nbp: string
    TypeClient: string
}

const SousCouvertColAction = ({ ClientId, Nbp, TypeClient }: SouscouvertPropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Ajouter un sous couverte
            </Button>
            <SousCouverteForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} IdClient={ClientId} Nbp={Nbp} TypeClient={TypeClient} />
        </div>
    );
}

export default SousCouvertColAction