"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { nextStep, previousStep } from "@/Store/Slices/Multi-formSlice";

const LinksDecoration: React.FC = () => {
    const current = useSelector((state: RootState) => state.multiForm.step);
    const dispatch = useDispatch<AppDispatch>();

    // Définir les étapes
    const steps = [
        { id: 1, label: "Étape 1" },
        { id: 2, label: "Étape 2" },
        { id: 3, label: "Étape 3" },
        { id: 4, label: "Étape 4" },
    ];

    // Action pour gérer le changement d'étape
    const handleStepChange = (stepId: number) => {
        if (stepId > current) {
            dispatch(nextStep()); // Incrémenter l'étape si on va plus loin
        } else if (stepId < current) {
            dispatch(previousStep()); // Décrémenter l'étape si on revient en arrière
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex space-x-4 mb-6">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <button
                            className={`w-[5rem] h-[5rem] flex items-center justify-center border rounded-full ${
                                current === step.id
                                    ? "bg-blue-500 text-white"
                                    : "border-blue-800 text-gray-700"
                            } hover:bg-blue-400 hover:text-white transition-all`}
                            onClick={() => handleStepChange(step.id)}
                        >
                            {step.label}
                        </button>
                        {/* Ligne entre les étapes sauf après la dernière */}
                        {index < steps.length - 1 && (
                            <span className="w-[10rem] h-[1px] bg-blue-700 self-center"></span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* <div className="flex justify-between w-full mt-6">
                
                <button
                    onClick={() => dispatch(previousStep())}
                    className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
                    disabled={current === 1}
                >
                    Précédent
                </button>
                <button
                    onClick={() => dispatch(nextStep())}
                    className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
                    disabled={current === steps.length}
                >
                    Suivant
                </button>
            </div> */}
            
        </div>
    );
};

export default LinksDecoration;
