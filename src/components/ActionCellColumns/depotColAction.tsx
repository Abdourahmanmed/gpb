import React, { useState } from 'react'
import { Button } from '../ui/button';
import { DepotResilierForm } from '../Superviseur/Models/DepotModels';

interface depotactionpropo {
    userId: string;
}
const DepotColAction = ({ userId }: depotactionpropo) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Button className="bg-primary" onClick={() => setIsDialogOpen(true)}>
                Deposer un resiliation
            </Button>
            <DepotResilierForm isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} UserId={userId} />
        </div>
    );
}

export default DepotColAction