import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllBp } from "@/actions/FetListBp";

// Définir le type des clients
interface ListeBpManagement {
  id: string;
  type: string;
  numero: string;
  cle: string;
}

interface ListeBpState {
  ListBp: ListeBpManagement[]; // Liste des clients
  loading: boolean; // Indicateur de chargement
  error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: ListeBpState = {
  ListBp: [],
  loading: false,
  error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchListBp = createAsyncThunk(
  "ListeBpManagementFetch/fetchListBp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchAllBp(); // Appel à FetchAllClients
      return response; // Retourner les données récupérées
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur lors de la récupération des données");
    }
  }
);

// Création du slice avec les actions nécessaires
const ListeSlice = createSlice({
  name: "ListManagementFetch",
  initialState,
  reducers: {}, // Pas de reducers nécessaires pour l'instant
  extraReducers: (builder) => {
    builder
      // Quand la requête est en cours
      .addCase(fetchListBp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Quand la requête réussit
      .addCase(
        fetchListBp.fulfilled,
        (state, action: PayloadAction<ListeBpManagement[]>) => {
          state.ListBp = action.payload; // Mettre à jour la liste des clients
          state.loading = false;
        }
      )
      // Quand la requête échoue
      .addCase(fetchListBp.rejected, (state, action) => {
        state.error = action.payload as string; // Enregistrer l'erreur
        state.loading = false;
      });
  },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default ListeSlice.reducer;
