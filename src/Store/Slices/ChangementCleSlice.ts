import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllChangeCle } from "@/actions/FetchAllChangementCle";

// Définir le type des clients
interface ChangedManagement {
  id: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  client_adresse: string;
  montant_achats_cle: string;
  reference_achat_cle: string;
}

interface ChangedCleState {
  Allchangementcle: ChangedManagement[]; // Liste des clients
  loading: boolean; // Indicateur de chargement
  error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: ChangedCleState = {
  Allchangementcle: [],
  loading: false,
  error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchChangedCle = createAsyncThunk(
  "ChangedManagementFetch/fetchCleChanged",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchAllChangeCle(); // Appel à FetchAllClients
      return response; // Retourner les données récupérées
    } catch (error) {
      return rejectWithValue("Erreur lors de la récupération des données");
    }
  }
);

// Création du slice avec les actions nécessaires
const ChangedCleSlice = createSlice({
  name: "ChangedCleManagementFetch",
  initialState,
  reducers: {}, // Pas de reducers nécessaires pour l'instant
  extraReducers: (builder) => {
    builder
      // Quand la requête est en cours
      .addCase(fetchChangedCle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Quand la requête réussit
      .addCase(
        fetchChangedCle.fulfilled,
        (state, action: PayloadAction<ChangedManagement[]>) => {
          state.Allchangementcle = action.payload; // Mettre à jour la liste des clients
          state.loading = false;
        }
      )
      // Quand la requête échoue
      .addCase(fetchChangedCle.rejected, (state, action) => {
        state.error = action.payload as string; // Enregistrer l'erreur
        state.loading = false;
      });
  },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default ChangedCleSlice.reducer;
