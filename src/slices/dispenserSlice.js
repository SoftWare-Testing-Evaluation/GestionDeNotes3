// src/slices/dispenserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api.service';

// Thunk pour charger toutes les dispensations
export const loadDispensations = createAsyncThunk(
    'dispensations/loadDispensations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/dispensations');
            return response.data; // Retourne les dispensations
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour ajouter une nouvelle dispensation
export const addDispenser = createAsyncThunk(
    'dispensations/addDispenser',
    async (dispenserData, { rejectWithValue }) => {
        console.log(dispenserData);
        try {
            const response = await apiClient.post('/dispensations', dispenserData);
            return response.data; // Retourne la dispensation ajoutée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour mettre à jour une dispensation
export const updateDispenser = createAsyncThunk(
    'dispensations/updateDispenser',
    async ({ id, dispenserData }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/dispensations/${id}`, dispenserData);
            return response.data; // Retourne la dispensation mise à jour
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour supprimer une dispensation
export const deleteDispenser = createAsyncThunk(
    'dispensations/deleteDispenser',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/dispensations/${id}`);
            return id; // Retourne l'ID de la dispensation supprimée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Création du slice
const dispenserSlice = createSlice({
    name: 'dispensations',
    initialState: {
        dispensations: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadDispensations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadDispensations.fulfilled, (state, action) => {
                state.loading = false;
                state.dispensations = action.payload; // Stocke les dispensations
            })
            .addCase(loadDispensations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(addDispenser.fulfilled, (state, action) => {
                state.dispensations.push(action.payload); // Ajoute la nouvelle dispensation
            })
            .addCase(updateDispenser.fulfilled, (state, action) => {
                const index = state.dispensations.findIndex(disp => disp.id === action.payload.id);
                if (index !== -1) {
                    state.dispensations[index] = action.payload; // Met à jour la dispensation
                }
            })
            .addCase(deleteDispenser.fulfilled, (state, action) => {
                state.dispensations = state.dispensations.filter(disp => disp.id !== action.payload); // Supprime la dispensation
            });
    },
});

// Exporter le reducer
export default dispenserSlice.reducer;
