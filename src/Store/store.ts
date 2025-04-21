import { configureStore } from "@reduxjs/toolkit";
import MultiFormSlice from "./Slices/Multi-formSlice";
import paymentReducer from "./Slices/AjouterCleSlice";
import clientsReducer from "./Slices/GlobalManagementClient";
import AgentsReducer from "./Slices/AgentManagement";
import BoitPostalReducer from "./Slices/ListeBpSlice";
import crudUserReducer from "./Slices/CrudUserManagement";
import ResilieReducer from "./Slices/ResilierSlice";
import ExonorerReducer from "./Slices/ExonoreSlice";
import ChangementNameReducer from "./Slices/NameChangeSlice";
import LvdReducer from "./Slices/LvdSlice";
import ChangementCleReducer from "./Slices/ChangementCleSlice";

const store = configureStore({
  reducer: {
    //slices
    multiForm: MultiFormSlice,
    payment: paymentReducer,
    clients: clientsReducer,
    Agents: AgentsReducer,
    BoitPostal: BoitPostalReducer,
    UsersCrud: crudUserReducer,
    Resilier: ResilieReducer,
    Exonorer: ExonorerReducer,
    ChangementName: ChangementNameReducer,
    Lvd: LvdReducer,
    ChangementCle: ChangementCleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["multiForm/updateField"],
        ignoredPaths: [
          "multiForm.Abonnement",
          "multiForm.patent_quitance",
          "multiForm.Identiter",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>; // Type du state global
export type AppDispatch = typeof store.dispatch; // Type du dispatch
export default store;

//monitor counter slice
