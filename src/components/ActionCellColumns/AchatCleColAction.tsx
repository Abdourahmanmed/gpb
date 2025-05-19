"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChangeCleForm } from '../AgentGuiche/components/ChangeCleForm';
interface DataClient {
    Redevance: number,
    Nom: string,
}
interface Clepropos {
    ClientId: string;
    TypeClient: string;
    dataClient: DataClient;
}

const AchatCleColAction = ({ ClientId, TypeClient, dataClient }: Clepropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Changement cle
            </Button>
            <ChangeCleForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} TypeClient={TypeClient} dataClient={dataClient} />
        </div>
    );
}

export default AchatCleColAction