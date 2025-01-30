import { configureStore } from "@reduxjs/toolkit";
import MultiFormSlice from "./Slices/Multi-formSlice";
import paymentReducer from './Slices/AjouterCleSlice';
import clientsReducer from './Slices/GlobalManagementClient';
import AgentsReducer from './Slices/AgentManagement';
import BoitPostalReducer from './Slices/ListeBpSlice';
import crudUserReducer from './Slices/CrudUserManagement';


const store = configureStore({
  reducer: {
    //slices
    multiForm: MultiFormSlice,
    payment: paymentReducer,
    clients: clientsReducer,
    Agents: AgentsReducer,
    BoitPostal: BoitPostalReducer,
    UsersCrud: crudUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["multiForm/updateField"],
        ignoredPaths: ["multiForm.Abonnement", "multiForm.patent_quitance", "multiForm.Identiter"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>; // Type du state global
export type AppDispatch = typeof store.dispatch; // Type du dispatch
export default store;


//monitor counter slice