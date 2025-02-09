import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ResilierForm } from '../AgentGuiche/components/ResilierDialog';

interface ResilierColAction {
    clientid: string,
    clientname: string,
    numerobp: string,
    etat: string,
}

const ResilierColAction = ({ clientid, clientname, numerobp, etat }: ResilierColAction) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Resilier
            </Button>
            <ResilierForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={clientid} ClientName={clientname} NumeroBp={numerobp} Etat={etat} />
        </div>
    );
}

export default ResilierColAction