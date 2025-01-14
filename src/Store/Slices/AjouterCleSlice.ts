import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MethodePaiement = 'credit' | 'cheque' | 'cash' | 'wallet';
type WalletOptions = 'cac_pay' | 'waafi' | 'd_money' | 'sabapay' | 'dahabplaces';

interface PaymentState {
    isOpen: boolean;
    selectedPaymentMethod: MethodePaiement | null;
    walletOption: WalletOptions | null;
    currentNumber: number;
    recueNumber: string;
    paymentDetails: {
        Montant: number;
        Methode_de_paiement: MethodePaiement | null;
        Wallet: WalletOptions | null;
        Numero_wallet: string;
        Numero_cheque: string;
        Nom_Banque: string;
    } | null;
}

const initialState: PaymentState = {
    isOpen: false,
    selectedPaymentMethod: null,
    walletOption: null,
    currentNumber: 1,
    recueNumber: '',
    paymentDetails: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setIsSummaryOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setPaymentMethod: (state, action: PayloadAction<MethodePaiement>) => {
            state.selectedPaymentMethod = action.payload;
        },
        setWalletOption: (state, action: PayloadAction<WalletOptions>) => {
            state.walletOption = action.payload;
        },
        incrementNumber: (state) => {
            state.currentNumber += 1;
        },
        updateRecueNumber: (state) => {
            const currentDate = new Date().toISOString().split('T')[0];
            state.recueNumber = `ACLE/${String(state.currentNumber).padStart(5, '0')}/${currentDate}`;
        },
        setPaymentDetails: (state, action: PayloadAction<PaymentState['paymentDetails']>) => {
            state.paymentDetails = action.payload;
        },
    },
});

export const {
    setIsSummaryOpen,
    setPaymentMethod,
    setWalletOption,
    incrementNumber,
    updateRecueNumber,
    setPaymentDetails,
} = paymentSlice.actions;

export default paymentSlice.reducer;
