"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ChangeNameFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const ResilierForm: React.FC<ChangeNameFormProps> = ({ isOpen, setIsOpen }) => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Corrigez l'orthographe de "preventDefault"
        // Remplacez par votre logique
        console.log("Form submitted");
    };


    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary text-xl">Resiliation d&#39;un abonne</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">

                    <form onSubmit={onSubmit} className="space-y-4">
                        <p>Vous voulez vraiment resilier ?</p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                className="bg-slate-500 text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" className="bg-red-500 text-white">
                                Oui
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
