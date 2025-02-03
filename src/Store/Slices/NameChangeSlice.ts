import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllChangeName } from "@/actions/FetchAllChangeName";

// Définir le type des clients
interface ChangedManagement {
  id: string;
  client_nom: string;
  client_email: string;
  client_telephone: string;
  client_adresse: string;
  montant_changement_nom: string;
  reference_changer_nom: string;
}

interface ChangedNameState {
  AllchangementName: ChangedManagement[]; // Liste des clients
  loading: boolean; // Indicateur de chargement
  error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: ChangedNameState = {
  AllchangementName: [],
  loading: false,
  error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchChangedName = createAsyncThunk(
  "ChangedManagementFetch/fetchNameChanged",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchAllChangeName(); // Appel à FetchAllClients
      return response; // Retourner les données récupérées
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur lors de la récupération des données");
    }
  }
);

// Création du slice avec les actions nécessaires
const ChangedNameSlice = createSlice({
  name: "ChangedManagementFetch",
  initialState,
  reducers: {}, // Pas de reducers nécessaires pour l'instant
  extraReducers: (builder) => {
    builder
      // Quand la requête est en cours
      .addCase(fetchChangedName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Quand la requête réussit
      .addCase(
        fetchChangedName.fulfilled,
        (state, action: PayloadAction<ChangedManagement[]>) => {
          state.AllchangementName = action.payload; // Mettre à jour la liste des clients
          state.loading = false;
        }
      )
      // Quand la requête échoue
      .addCase(fetchChangedName.rejected, (state, action) => {
        state.error = action.payload as string; // Enregistrer l'erreur
        state.loading = false;
      });
  },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default ChangedNameSlice.reducer;
