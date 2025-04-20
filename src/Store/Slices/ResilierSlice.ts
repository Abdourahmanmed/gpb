import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllResiliation } from "@/actions/FetchAllResiliation";

// Définir le type des clients
interface ResilierManagement {
  id: number,
  Nom: string,
  Email: string,
  Adresse: string,
  TypeClient: string,
  Telephone: string,
  Id_boite_postale: string,
  Date_abonnement: string,
  id_user: string,
  updated_by: string,
  Id_client: string,
  Lettre_recommandation: string,
  Date_resilier: string,
  Resilier_by: string,
  abonnement_status: string,
  abonnement_penalite: string,
  annee_abonnement: string,
  boite_postal_numero: number,
  nombre_sous_couverte: number,
  Adresse_Livraison: number,
  Adresse_Collection: number,
  Agents: string
}

interface ResilierState {
  Resiliers: ResilierManagement[]; // Liste des clients
  loading: boolean; // Indicateur de chargement
  error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: ResilierState = {
  Resiliers: [],
  loading: false,
  error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchResilier = createAsyncThunk(
  "ResilierManagementFetch/fetchResilier",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchAllResiliation(); // Appel à FetchAllClients
      return response; // Retourner les données récupérées
    } catch (error) {
      console.log(error);
      return rejectWithValue("Erreur lors de la récupération des données");

    }
  }
);

// Création du slice avec les actions nécessaires
const ResilierSlice = createSlice({
  name: "ResilierManagementFetch",
  initialState,
  reducers: {}, // Pas de reducers nécessaires pour l'instant
  extraReducers: (builder) => {
    builder
      // Quand la requête est en cours
      .addCase(fetchResilier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Quand la requête réussit
      .addCase(
        fetchResilier.fulfilled,
        (state, action: PayloadAction<ResilierManagement[]>) => {
          state.Resiliers = action.payload; // Mettre à jour la liste des clients
          state.loading = false;
        }
      )
      // Quand la requête échoue
      .addCase(fetchResilier.rejected, (state, action) => {
        state.error = action.payload as string; // Enregistrer l'erreur
        state.loading = false;
      });
  },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default ResilierSlice.reducer;
