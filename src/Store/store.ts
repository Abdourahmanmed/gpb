import { configureStore } from "@reduxjs/toolkit";
import MultiFormSlice from "./Slices/Multi-formSlice";
import paymentReducer from './Slices/AjouterCleSlice';


const store = configureStore({
    reducer: {
        //slices
        multiForm: MultiFormSlice,
        payment: paymentReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store


//monitor counter slice