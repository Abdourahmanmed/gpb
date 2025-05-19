"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { CollectForm } from '../AgentGuiche/components/CollectionForm';
interface DataClient {
    Redevance: number,
    Nom: string,
    TypeClient: string
}
interface collectiopropos {
    ClientId: string;
    Nbp: string;
    dataClient: DataClient;
}

const CollectionColAction = ({ ClientId, Nbp, dataClient }: collectiopropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Ajouter une collection
            </Button>
            <CollectForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} Nbp={Nbp} dataClient={dataClient} />
        </div>
    );
}

export default CollectionColAction