import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChangeNameForm } from '../AgentGuiche/components/ChangeNameForùe';

interface Changenamepropos {
    userId: string;
}

const ChangeNameColAction = ({ userId }: Changenamepropos) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Changer
            </Button>
            <ChangeNameForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} UserId={userId} />
        </div>
    );
}

export default ChangeNameColAction