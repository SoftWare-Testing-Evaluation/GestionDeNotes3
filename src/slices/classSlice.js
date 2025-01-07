import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api.service';

// Thunk pour charger toutes les classes d'études
export const loadClasses = createAsyncThunk(
    'classes/loadClasses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/classeEtude');
            return response.data; // Retourne les classes
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour ajouter une nouvelle classe d'étude
export const addClasse = createAsyncThunk(
    'classes/addClasse',
    async (classeData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/classeEtude', classeData);
            return response.data; // Retourne la classe ajoutée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour mettre à jour une classe d'étude
export const updateClasse = createAsyncThunk(
    'classes/updateClasse',
    async ({ id, classeData }, { rejectWithValue }) => {
        console.log(classeData);
        try {
            const response = await apiClient.put(`/classeEtude/${id}`, classeData);
            return response.data; // Retourne la classe mise à jour
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour supprimer une classe d'étude
export const deleteClasse = createAsyncThunk(
    'classes/deleteClasse',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/classeEtude/${id}`);
            return id; // Retourne l'ID de la classe supprimée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Création du slice
const classSlice = createSlice({
    name: 'classes',
    initialState: {
        classes: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadClasses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.classes = action.payload; // Stocke les classes
            })
            .addCase(loadClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(addClasse.fulfilled, (state, action) => {
                state.classes.push(action.payload); // Ajoute la nouvelle classe
            })
            .addCase(updateClasse.fulfilled, (state, action) => {
                const index = state.classes.findIndex(classe => classe.id === action.payload.id);
                if (index !== -1) {
                    state.classes[index] = action.payload; // Met à jour la classe
                }
            })
            .addCase(deleteClasse.fulfilled, (state, action) => {
                state.classes = state.classes.filter(classe => classe.id !== action.payload); // Supprime la classe
            });
    },
});

// Exporter le reducer
export default classSlice.reducer;
