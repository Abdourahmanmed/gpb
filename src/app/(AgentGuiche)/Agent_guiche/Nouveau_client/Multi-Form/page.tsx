"use client";
import StepFourForme from '@/components/AgentGuiche/Multiforme/StepFourForme';
import StepOneForm from '@/components/AgentGuiche/Multiforme/StepOneForm';
import StepThreeForm from '@/components/AgentGuiche/Multiforme/StepThreeForm';
import StepTwoForm from '@/components/AgentGuiche/Multiforme/StepTwoForm';
import {RootState } from '@/Store/store';
import { useSelector } from 'react-redux';

export default function page() {
    const current = useSelector((state: RootState) => state.multiForm.step);



    switch (current) {
        case 1:
            return <StepOneForm />;
        case 2:
            return <StepTwoForm />;
        case 3:
            return <StepThreeForm />;
        case 4:
            return <StepFourForme />;
        default:
            return <div>Invalid step</div>;
    }
}
