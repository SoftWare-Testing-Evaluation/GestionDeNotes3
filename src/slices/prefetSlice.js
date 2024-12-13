//src/slices/prefetSlice.js
// src/slices/prefetSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPrefetEtude } from '../services/api.service';

export const registerPrefet = createAsyncThunk(
    'prefet/register',
    async (prefetData, { rejectWithValue }) => {
        try {
            const response = await createPrefetEtude(prefetData);
            return response; // Retourne les données du préfet créé
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

const prefetSlice = createSlice({
    name: 'prefet',
    initialState: {
        prefet: null,
        error: null,
        loading: false,
    },
    reducers: {
        clearPrefet: (state) => {
            state.prefet = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerPrefet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerPrefet.fulfilled, (state, action) => {
                state.loading = false;
                state.prefet = action.payload; // Stocke les données du préfet
            })
            .addCase(registerPrefet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            });
    },
});

export const { clearPrefet } = prefetSlice.actions;
export default prefetSlice.reducer;
