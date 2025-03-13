"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChangeCleForm } from '../AgentGuiche/components/ChangeCleForm';

interface Clepropos {
    ClientId: string;
}

const AchatCleColAction = ({ ClientId }: Clepropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Changement cle
            </Button>
            <ChangeCleForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} />
        </div>
    );
}

export default AchatCleColAction