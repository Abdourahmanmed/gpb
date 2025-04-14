import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchAllUsers } from "@/actions/FetchAllUsers";
import { FetchAllUserAdminCrud } from "@/actions/FetchAdminUser";

// Définir le type des clients
interface CrudUserManagement {
    id: string;
    Nom: string;
    Email: string;
    Telephone: string;
    Adresse: string;
    password: string;
    Role: string;
}

interface CrudUserState {
    users: CrudUserManagement[]; // Liste des clients
    loading: boolean; // Indicateur de chargement
    error: string | null; // Erreur éventuelle
}

// Définir l'état initial
const initialState: CrudUserState = {
    users: [],
    loading: false,
    error: null,
};

// Créer un thunk pour appeler FetchAllClients
export const fetchCrudUsers = createAsyncThunk(
    "CrudUserManagementFetch/fetchCrudUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await FetchAllUsers(); // Appel à FetchAllClients
            return response; // Retourner les données récupérées
        } catch (error) {
            console.log(error);
            return rejectWithValue("Erreur lors de la récupération des données");
        }
    }
);

// Créer un thunk pour appeler Fetch 
export const fetchUserAdmin = createAsyncThunk(
    "CrudUserManagementFetch/fetchCrudUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await FetchAllUserAdminCrud(); // Appel à FetchAllClients
            return response; // Retourner les données récupérées
        } catch (error) {
            console.log(error);
            return rejectWithValue("Erreur lors de la récupération des données");
        }
    }
);

// Création du slice avec les actions nécessaires
const UsersCrudSlice = createSlice({
    name: "CrudUserManagementFetch",
    initialState,
    reducers: {
        addUserSuccess: (state, action: PayloadAction<CrudUserManagement>) => {
            state.users.push(action.payload); // ✅ Ajouter immédiatement dans Redux
        },
        deleteUserSuccess: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload); // ✅ Supprimer
        },
        updateUserSuccess: (state, action: PayloadAction<CrudUserManagement>) => {
            state.users = state.users.map(user =>
                user.id === action.payload.id ? action.payload : user
            ); // ✅ Mettre à jour
        }
    },
    extraReducers: (builder) => {
        builder
            // Quand la requête est en cours
            .addCase(fetchCrudUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Quand la requête réussit
            .addCase(
                fetchCrudUsers.fulfilled,
                (state, action: PayloadAction<CrudUserManagement[]>) => {
                    state.users = action.payload; // Mettre à jour la liste des clients
                    state.loading = false;
                }
            )
            // Quand la requête échoue
            .addCase(fetchCrudUsers.rejected, (state, action) => {
                state.error = action.payload as string; // Enregistrer l'erreur
                state.loading = false;
            });
    },
});

export const { addUserSuccess, deleteUserSuccess, updateUserSuccess } = UsersCrudSlice.actions; // Exporter l'action
// Exporter uniquement le reducer (pas les actions, car `fetchClients` est un thunk)
export default UsersCrudSlice.reducer;
