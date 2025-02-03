import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllLiv } from "@/actions/FetchAllLivraisonAdd";

// Définir le type des clients
interface ChangedManagement {
  id: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  client_adresse: string;
  montant_livraison_a_domicile: string;
  reference_livraison_domicile: string;
}

interface LivraisonState {
  Livraison: ChangedManagement[]; // Liste des clients
  loading: boolean; // Indicateur de chargement
  error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: LivraisonState = {
  Livraison: [],
  loading: false,
  error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchLivraison = createAsyncThunk(
  "ChangedManagementFetch/fetchLivraison",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchAllLiv(); // Appel à FetchAllClients
      return response; // Retourner les données récupérées
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur lors de la récupération des données");
    }
  }
);

// Création du slice avec les actions nécessaires
const LvdSlice = createSlice({
  name: "ChangedLvdManagementFetch",
  initialState,
  reducers: {}, // Pas de reducers nécessaires pour l'instant
  extraReducers: (builder) => {
    builder
      // Quand la requête est en cours
      .addCase(fetchLivraison.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Quand la requête réussit
      .addCase(
        fetchLivraison.fulfilled,
        (state, action: PayloadAction<ChangedManagement[]>) => {
          state.Livraison = action.payload; // Mettre à jour la liste des clients
          state.loading = false;
        }
      )
      // Quand la requête échoue
      .addCase(fetchLivraison.rejected, (state, action) => {
        state.error = action.payload as string; // Enregistrer l'erreur
        state.loading = false;
      });
  },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default LvdSlice.reducer;
