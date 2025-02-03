import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllAgents } from "@/actions/FetchAgents";

// Définir le type des clients
interface AgentsManagement {
    id: string;
    nom: string;
    email: string;
    password: string;
    Telephone: string;
    Adresse: string;
}

interface AgentsState {
    agents: AgentsManagement[]; // Liste des clients
    loading: boolean; // Indicateur de chargement
    error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: AgentsState = {
    agents: [],
    loading: false,
    error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchAgents = createAsyncThunk(
    "AgentsManagementFetch/fetchAgents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await FetchAllAgents(); // Appel à FetchAllClients
            return response; // Retourner les données récupérées
        } catch (error) {
            console.log(error);
            return rejectWithValue("Erreur lors de la récupération des données");
        }
    }
);

// Création du slice avec les actions nécessaires
const AgentsSlice = createSlice({
    name: "AgentsManagementFetch",
    initialState,
    reducers: {}, // Pas de reducers nécessaires pour l'instant
    extraReducers: (builder) => {
        builder
            // Quand la requête est en cours
            .addCase(fetchAgents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Quand la requête réussit
            .addCase(
                fetchAgents.fulfilled,
                (state, action: PayloadAction<AgentsManagement[]>) => {
                    state.agents = action.payload; // Mettre à jour la liste des clients
                    state.loading = false;
                }
            )
            // Quand la requête échoue
            .addCase(fetchAgents.rejected, (state, action) => {
                state.error = action.payload as string; // Enregistrer l'erreur
                state.loading = false;
            });
    },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default AgentsSlice.reducer;
