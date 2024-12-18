"use client";
import React, { useState } from 'react';

const LinksDecoration: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'StepOne' | 'StepTwo' | 'StepThree'>('StepOne');

    // Définition des étapes avec des types spécifiques
    const steps: { id: 'StepOne' | 'StepTwo' | 'StepThree'; label: string }[] = [
        { id: 'StepOne', label: '1' },
        { id: 'StepTwo', label: '2' },
        { id: 'StepThree', label: '3' },
    ];

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex space-x-4 mb-6">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <button
                            className={`w-[5rem] h-[5rem] flex items-center justify-center border rounded-full ${currentStep === step.id ? 'bg-blue-500 text-white' : 'border-blue-800 text-gray-700'} hover:bg-blue-400 hover:text-white transition-all`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            {step.label}
                        </button>
                        {/* Ajouter la ligne entre les boutons sauf après le dernier */}
                        {index < steps.length - 1 && (
                            <span className="w-[15rem] h-[1px] bg-blue-700 self-center"></span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default LinksDecoration;
