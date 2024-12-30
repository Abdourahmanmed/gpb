import { configureStore } from "@reduxjs/toolkit";
import MultiFormSlice from "./Slices/Multi-formSlice";


const store = configureStore({
    reducer: {
        //slices
        multiForm:MultiFormSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store


//monitor counter slice