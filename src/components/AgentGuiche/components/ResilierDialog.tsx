"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChangeNameFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    ClientId:string;
    ClientName:string;
    NumeroBp:string;
    Etat:string;
}

export const ResilierForm: React.FC<ChangeNameFormProps> = ({ isOpen, setIsOpen,ClientId,ClientName,NumeroBp,Etat}) => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Corrigez l'orthographe de "preventDefault"
        // Remplacez par votre logique
        console.log("Form submitted");
    };


    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl">Resiliation d&#39;un abonne</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">

                    <form onSubmit={onSubmit} className="space-y-4">
                        <p className="text-xl">Vous voulez vraiment resilier ?</p>
                        <p className="text-md spase-y-2">Numero Boite Postal : <span className="font-semibold">{NumeroBp}</span></p>
                        <p className="text-md spase-y-2">Etat du Boite postale : <span className="font-semibold">{Etat}</span></p>
                        <div className="spase-y-2">
                            <Label>La lettre de demande</Label>
                            <Input type="file" />
                        </div>
                        <div className="spase-y-2">
                            <Label>Nom du demandeur</Label>
                            <Input type="text" value={ClientName}/>
                        </div>
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
