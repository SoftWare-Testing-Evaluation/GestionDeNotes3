// src/slices/matiereSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api.service';

// Thunk pour charger toutes les matières
export const loadMatieres = createAsyncThunk(
    'matieres/loadMatieres',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/matieres');
            return response.data; // Retourne les matières
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour charger les matières par classe
export const loadMatieresByClasse = createAsyncThunk(
    'matieres/loadMatieresByClasse',
    async ({ idClasseEtude, annee }, { rejectWithValue }) => {
        console.log(`id de la classe:${idClasseEtude}`,`annee:${annee}`);
        try {
            const response = await apiClient.get(`/matieres/classe/${idClasseEtude}/${annee}`);
            console.log(response.data)
            return response.data; // Retourne les matières de la classe

        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour charger les matières par enseignant
export const loadMatieresByEnseignant = createAsyncThunk(
    'matieres/loadMatieresByEnseignant',
    async ({ idEnseignant, annee }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/matieres/enseignant/${idEnseignant}/${annee}`);
            return response.data; // Retourne les matières de l'enseignant
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour ajouter une nouvelle matière
export const addMatiere = createAsyncThunk(
    'matieres/addMatiere',
    async (matiereData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/matieres', matiereData);
            return response.data; // Retourne la matière ajoutée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour mettre à jour une matière
export const updateMatiere = createAsyncThunk(
    'matieres/updateMatiere',
    async ({ id, matiereData }, { rejectWithValue }) => {
        console.log(matiereData);
        try {
            const response = await apiClient.put(`/matieres/${id}`, matiereData);
            return response.data; // Retourne la matière mise à jour
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour supprimer une matière
export const deleteMatiere = createAsyncThunk(
    'matieres/deleteMatiere',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/matieres/${id}`);
            return id; // Retourne l'ID de la matière supprimée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Création du slice
const matiereSlice = createSlice({
    name: 'matieres',
    initialState: {
        matieres: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMatieres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMatieres.fulfilled, (state, action) => {
                state.loading = false;
                state.matieres = action.payload; // Stocke les matières
            })
            .addCase(loadMatieres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(loadMatieresByClasse.fulfilled, (state, action) => {
                state.loading = false;
                state.matieres = action.payload; // Stocke les matières de la classe
            })
            .addCase(loadMatieresByEnseignant.fulfilled, (state, action) => {
                state.loading = false;
                state.matieres = action.payload; // Stocke les matières de l'enseignant
            })
            .addCase(addMatiere.fulfilled, (state, action) => {
                state.matieres.push(action.payload); // Ajoute la nouvelle matière
            })
            .addCase(updateMatiere.fulfilled, (state, action) => {
                const index = state.matieres.findIndex(matiere => matiere.id === action.payload.id);
                if (index !== -1) {
                    // Conservez les dispensers existants
                    const existingDispensers = state.matieres[index].Dispensers || [];
                    state.matieres[index] = {
                        ...state.matieres[index],
                        ...action.payload,
                        Dispensers: existingDispensers // Conservez les dispensers
                    };
                }
            })
            .addCase(deleteMatiere.fulfilled, (state, action) => {
                state.matieres = state.matieres.filter(matiere => matiere.id !== action.payload); // Supprime la matière
            });
    },
});

// Exporter le reducer
export default matiereSlice.reducer;
