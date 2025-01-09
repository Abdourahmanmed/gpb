"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormSousCOptonal from "./Les_Forms/FormSousCOptonal";



const StepTwoForm = () => {


    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                Enregistrement d'un nouveau client
            </h2>
            <ScrollArea className="h-[45vh]">
               <FormSousCOptonal />
            </ScrollArea>
        </div>
    );
};

export default StepTwoForm;
