
import { MultiFormeSchema } from "@/Schema/schema";
import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

// Utiliser `z.infer` pour dériver le type à partir du schéma
type MultiFormState = z.infer<typeof MultiFormeSchema>;

// Initialisation de l'état par défaut
const initialState: MultiFormState = {
    BoitePostale: "",
    Nom: "",
    Email: "",
    Telephone: "",
    Adresse: "",
    Role: "",
    sousCouvertures: [{ societe: "", personne: "", adresse: "", telephone: "" },], // Tableau vide pour sousCouvertures
    Methode_de_paiement: "",
    wallet: undefined,
    Numero_wallet: "",
    Numero_cheque: "",
    Nom_Banque: "",
    Abonnement: new File([], ""), // Valeur par défaut pour un fichier
    patent_quitance: new File([], ""), // Valeur par défaut pour un fichier
    Identiter: new File([], ""), // Valeur par défaut pour un fichier
    step: 1, // Étape initiale
    totalMontant: ""
};

// Fonction utilitaire pour sauvegarder dans le localStorage
const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Fonction utilitaire pour charger depuis le localStorage
const loadFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

// Création du slice Redux
const MultiFormSlice = createSlice({
    name: "multiForm",
    initialState,
    reducers: {
        // Action pour mettre à jour les données saisies
        updateField(state, action) {
            const { field, value } = action.payload;
            // Si c'est un fichier, stockez uniquement ses métadonnées
            if (value instanceof File) {
                (state as any)[field] = {
                    name: value.name,
                    size: value.size,
                    type: value.type,
                };
            } else {
                (state as any)[field] = value;
            }
            saveToLocalStorage("multiFormData", state); // Sauvegarde dans le localStorage
        },

        // Action pour sauvegarder toutes les données et réinitialiser
        saveAndReset(state) {
            console.log("Données sauvegardées :", state);
            localStorage.removeItem("multiFormData"); // Réinitialisation du localStorage
            Object.assign(state, initialState); // Réinitialisation de l'état
        },

        // Action pour incrémenter l'étape
        nextStep(state) {
            if (state.step < 4) { // Par exemple, 3 étapes maximum
                state.step += 1;
                saveToLocalStorage("multiFormData", state); // Sauvegarde dans le localStorage
            }
        },

        // Action pour décrémenter l'étape
        previousStep(state) {
            if (state.step > 1) {
                state.step -= 1;
                saveToLocalStorage("multiFormData", state); // Sauvegarde dans le localStorage
            }
        },

        // Charger les données depuis le localStorage
        loadFromStorage(state) {
            const storedData = loadFromLocalStorage("multiFormData");
            if (storedData) {
                Object.assign(state, storedData); // Charger les données dans le state
            }
        },
    },
});

export const {
    updateField,
    saveAndReset,
    nextStep,
    previousStep,
    loadFromStorage,
} = MultiFormSlice.actions;

export default MultiFormSlice.reducer;
