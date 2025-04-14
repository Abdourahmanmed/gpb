import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllClients } from "@/actions/FetchClient"; // Assurez-vous que cette fonction existe et fonctionne

// Définir le type des clients
interface ClientsManagement {
    id: number;
    Nom: string;
    Email: string;
    Adresse: string;
    TypeClient: string;
    Telephone: string;
    Id_boite_postale: number;
    Date_abonnement: string;
    id_user: number;
    updated_by: number;
    abonnement_status: string;
    abonnement_penalite: number;
    Annee_abonnement: number;
    boite_postal_numero: string;
    nombre_sous_couverte: number;
    Adresse_Livraison: number;
    Adresse_Collection: number;
}

interface ClientsState {
    clients: ClientsManagement[]; // Liste des clients
    loading: boolean; // Indicateur de chargement
    error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: ClientsState = {
    clients: [],
    loading: false,
    error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchClients = createAsyncThunk(
    "clientManagementFetch/fetchClients",
    async (_, { rejectWithValue }) => {
        try {
            const response = await FetchAllClients(); // Appel à FetchAllClients
            return response; // Retourner les données récupérées
        } catch (error) {
            console.log(error);
            return rejectWithValue("Erreur lors de la récupération des données");
        }
    }
);

// Création du slice avec les actions nécessaires
const ClientsSlice = createSlice({
    name: "clientManagementFetch",
    initialState,
    reducers: {}, // Pas de reducers nécessaires pour l'instant
    extraReducers: (builder) => {
        builder
            // Quand la requête est en cours
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Quand la requête réussit
            .addCase(
                fetchClients.fulfilled,
                (state, action: PayloadAction<ClientsManagement[]>) => {
                    state.clients = action.payload; // Mettre à jour la liste des clients
                    state.loading = false;
                }
            )
            // Quand la requête échoue
            .addCase(fetchClients.rejected, (state, action) => {
                state.error = action.payload as string; // Enregistrer l'erreur
                state.loading = false;
            });
    },
});

// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default ClientsSlice.reducer;
