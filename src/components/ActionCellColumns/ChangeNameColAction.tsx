import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChangeNameForm } from '../AgentGuiche/components/ChangeNameForùe';
interface DataClient {
    Redevance: number,
    Nom: string,
    TypeClient: string
}
interface Changenamepropos {
    ClientId: string;
    dataClient: DataClient;
}

const ChangeNameColAction = ({ ClientId, dataClient }: Changenamepropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Changer
            </Button>
            <ChangeNameForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} dataClient={dataClient} />
        </div>
    );
}

export default ChangeNameColAction