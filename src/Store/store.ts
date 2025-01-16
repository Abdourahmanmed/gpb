import { configureStore } from "@reduxjs/toolkit";
import MultiFormSlice from "./Slices/Multi-formSlice";
import paymentReducer from './Slices/AjouterCleSlice';
import clientsReducer from './Slices/GlobalManagementClient';


const store = configureStore({
    reducer: {
        //slices
        multiForm: MultiFormSlice,
        payment: paymentReducer,
        clients: clientsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>; // Type du state global
export type AppDispatch = typeof store.dispatch; // Type du dispatch
export default store;


//monitor counter slice