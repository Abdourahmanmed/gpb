"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { CollectForm } from '../AgentGuiche/components/CollectionForm';

interface collectiopropos {
    ClientId: string;
    Nbp: string;
}

const CollectionColAction = ({ ClientId, Nbp }: collectiopropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Ajouter une collection
            </Button>
            <CollectForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} Nbp={Nbp} />
        </div>
    );
}

export default CollectionColAction