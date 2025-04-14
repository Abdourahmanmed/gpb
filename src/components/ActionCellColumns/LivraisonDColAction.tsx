"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { LivreDoForm } from '../AgentGuiche/components/LivreDoForm';

interface Lvdpropos {
    ClientId: string;
    Np: string;
}

const LivraisonDColAction = ({ ClientId, Np }: Lvdpropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Ajouter livraison domicile
            </Button>
            <LivreDoForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} Np={Np} />
        </div>
    );
}

export default LivraisonDColAction