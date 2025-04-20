import React, { useState } from 'react'
import { AllResilier } from './columns/AllResilierCol';

const Resilier = () => {
    const [resilier, SetResilier] = useState<AllResilier[]>([]);
    return (
        <div>Resilier</div>
    )
}

export default Resilier