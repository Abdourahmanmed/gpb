import { createSlice } from "@reduxjs/toolkit";

// Interface pour représenter un fichier sérialisable
interface SerializableFile {
  name: string;
  size: number;
  type: string;
}

interface SousCouverture {
  societe: string;
  personne: string;
  adresse: string;
  telephone: string;
}

interface MultiFormState {
  BoitePostale: string;
  Nom: string;
  Email: string;
  Telephone: string;
  Adresse: string;
  Role: string;
  sousCouvertures: SousCouverture[];
  Methode_de_paiement: string;
  wallet: undefined | string;
  Numero_wallet: string;
  Numero_cheque: string;
  Nom_Banque: string;
  Abonnement: File | undefined; // Remplace `File` par un objet sérialisable
  patent_quitance: File | undefined;
  Identiter: File | undefined;
  step: number;
  totalMontant: string;
  Adresse_Livraison_Domicile: string;
  Adresse_collection: string;
  TypeClient: boolean;
}

const initialState: MultiFormState = {
  BoitePostale: "",
  Nom: "",
  Email: "",
  Telephone: "",
  Adresse: "",
  Role: "",
  sousCouvertures: [
    {
      societe: "",
      personne: "",
      adresse: "",
      telephone: "",
    },
  ],
  Methode_de_paiement: "",
  wallet: undefined,
  Numero_wallet: "",
  Numero_cheque: "",
  Nom_Banque: "",
  Abonnement: undefined,
  patent_quitance: undefined,
  Identiter: undefined,
  step: 1,
  totalMontant: "",
  Adresse_Livraison_Domicile: "",
  Adresse_collection: "",
  TypeClient: false,
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

const MultiFormSlice = createSlice({
  name: "multiForm",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      if (value instanceof File) {
        // Sérialiser le fichier
        (state as any)[field] = {
          name: value.name,
          size: value.size,
          type: value.type,
        };
      } else {
        (state as any)[field] = value;
      }
      saveToLocalStorage("multiFormData", state);
    },
    saveAndReset(state) {
      console.log("Données sauvegardées :", state);
      localStorage.removeItem("multiFormData");
      Object.assign(state, initialState);
    },
    nextStep(state) {
      if (state.step < 4) {
        state.step += 1;
        saveToLocalStorage("multiFormData", state);
      }
    },
    previousStep(state) {
      if (state.step > 1) {
        state.step -= 1;
        saveToLocalStorage("multiFormData", state);
      }
    },
    loadFromStorage(state) {
      const storedData = loadFromLocalStorage("multiFormData");
      if (storedData) {
        Object.assign(state, storedData);
      }
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    // Nouvelle action pour définir TypeClient avec une valeur ou une valeur par défaut
    setTypeClient(state, action) {
      state.TypeClient = action.payload ?? false; // Prend la valeur donnée ou utilise "true" par défaut
      saveToLocalStorage("multiFormData", state); // Sauvegarde dans localStorage
    },
  },
});

export const {
  updateField,
  saveAndReset,
  nextStep,
  previousStep,
  loadFromStorage,
  setTypeClient, // Nouvelle action
} = MultiFormSlice.actions;

export default MultiFormSlice.reducer;
