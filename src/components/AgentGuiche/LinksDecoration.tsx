"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const PATH = [
    "Agent_guiche/Nouveau_client/StepOneForm",
    "Agent_guiche/Nouveau_client/StepTwoForm",
    "Agent_guiche/Nouveau_client/StepThreeForm",
    "Agent_guiche/Nouveau_client/StepFourForm",
];

const LinksDecoration: React.FC = () => {
    const router = useRouter();
    const currentPath = usePathname();

    // Identifier l'étape active en fonction du chemin actuel
    const currentStepIndex = PATH.findIndex((path) => currentPath.includes(path));

    // Étapes avec leur label et index
    const steps = PATH.map((path, index) => ({
        id: path,
        label: (index + 1).toString(),
        active: currentStepIndex === index,
    }));

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex space-x-4 mb-6">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <button
                            className={`w-[5rem] h-[5rem] flex items-center justify-center border rounded-full ${step.active
                                    ? "bg-blue-500 text-white"
                                    : "border-blue-800 text-gray-700"
                                } hover:bg-blue-400 hover:text-white transition-all`}
                            onClick={() => router.push(`/${step.id}`)}
                        >
                            {step.label}
                        </button>
                        {/* Ajouter une ligne entre les étapes sauf après la dernière */}
                        {index < steps.length - 1 && (
                            <span className="w-[10rem] h-[1px] bg-blue-700 self-center"></span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default LinksDecoration;
