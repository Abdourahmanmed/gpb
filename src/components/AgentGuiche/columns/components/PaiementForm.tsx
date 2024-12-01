"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PaymentFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ isOpen, setIsOpen }) => {
    // Montants fixes pour chaque option
    const paymentOptions = [
        { id: "redevance", label: "Redevance du", year: "2025", amount: 20000 },
        { id: "penalite", label: "Pénalité du", year: "2025", amount: 3000 },
        { id: "achatCle", label: "Achat clé", year: "", amount: 2000 },
        { id: "changementNom", label: "Changement de Nom", year: "", amount: 4000 },
        { id: "livraisonDomicile", label: "Livraison domicile", year: "2025", amount: 10000 },
        { id: "sousCouvert", label: "Sous couverts du", year: "2024", amount: 2000 },
        { id: "timbre", label: "Timbre", year: "", amount: 1000 },
    ];

    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});
    const [selectedDates, setSelectedDates] = useState<{ [key: string]: string }>({});
    const [total, setTotal] = useState<number>(0);
    const [method, setMethod] = useState<string>("");

    // Gère la sélection d'une option
    const handleOptionChange = (id: string, isChecked: boolean) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [id]: isChecked,
        }));

        const option = paymentOptions.find((opt) => opt.id === id);
        if (option) {
            setTotal((prevTotal) => (isChecked ? prevTotal + option.amount : prevTotal - option.amount));
        }
    };

    // Gère la sélection de la date pour une option
    const handleDateChange = (id: string, date: string) => {
        setSelectedDates((prev) => ({
            ...prev,
            [id]: date,
        }));
    };

    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
        setSelectedOptions({});
        setSelectedDates({});
        setTotal(0);
        setMethod("");
    };

    // Fonction pour gérer l'enregistrement
    const handleSave = () => {
        const selectedData = paymentOptions
            .filter(option => selectedOptions[option.id])
            .map(option => ({
                label: option.label,
                amount: option.amount,
                date: selectedDates[option.id] || null, // inclure la date sélectionnée
            }));

        // Afficher les données dans la console
        console.log("Données enregistrées :", {
            selectedData,
            total,
            method,
        });

        // Réinitialiser le formulaire après l'enregistrement
        resetForm();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary text-xl">Enregistrer le paiement</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="space-y-4">
                        {paymentOptions.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={selectedOptions[item.id] || false}
                                    onCheckedChange={(checked) =>
                                        handleOptionChange(item.id, Boolean(checked))
                                    }
                                />
                                <span>{item.label}</span>

                                {/* Sélection de l'année, désactivée si la case n'est pas cochée */}
                                {item.year && (
                                    <Select disabled={!selectedOptions[item.id]}>
                                        <SelectTrigger className="w-20">
                                            <SelectValue placeholder={item.year} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2024">2024</SelectItem>
                                            <SelectItem value="2025">2025</SelectItem>
                                            <SelectItem value="2026">2026</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}

                                <Input
                                    type="number"
                                    value={item.amount}
                                    disabled={!selectedOptions[item.id]}
                                    className="amount-input"
                                    readOnly
                                />
                            </div>
                        ))}

                        <div className="flex items-center space-x-2">
                            <span>Méthode de paiement</span>
                            <Select onValueChange={(value) => setMethod(value)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="credit">Crédit</SelectItem>
                                    <SelectItem value="virement">Virement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between">
                            <span>Total :</span>
                            <span className="font-bold">{total} FDj</span>
                        </div>

                        <Button
                            className="w-full bg-primary text-white"
                            onClick={handleSave}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
