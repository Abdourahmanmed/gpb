import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChangeNameForm } from '../AgentGuiche/components/ChangeNameForùe';

interface Changenamepropos {
    ClientId: string;
}

const ChangeNameColAction = ({ ClientId }: Changenamepropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Changer
            </Button>
            <ChangeNameForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} ClientId={ClientId} />
        </div>
    );
}

export default ChangeNameColAction