// src/slices/enseignantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api.service';

// Thunk pour charger tous les enseignants
export const loadEnseignants = createAsyncThunk(
    'enseignants/loadEnseignants',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/enseignants'); // Endpoint pour récupérer les enseignants
            return response.data; // Retourne les enseignants
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour charger les enseignants par classe
export const loadEnseignantsParClasse = createAsyncThunk(
    'enseignants/loadEnseignantsParClasse',
    async ({ idClasseEtude, annee }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/enseignants/classe/${idClasseEtude}/${annee}`); // Endpoint pour récupérer les enseignants par classe
            return response.data; // Retourne les enseignants par classe
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour créer un nouvel enseignant
export const createEnseignant = createAsyncThunk(
    'enseignants/createEnseignant',
    async (enseignantData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/enseignants', enseignantData); // Endpoint pour créer un enseignant
            return response.data; // Retourne l'enseignant créé
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour mettre à jour un enseignant
export const updateEnseignant = createAsyncThunk(
    'enseignants/updateEnseignant',
    async ({ id, enseignantData }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/enseignants/${id}`, enseignantData); // Endpoint pour mettre à jour un enseignant
            return response.data; // Retourne l'enseignant mis à jour
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour supprimer un enseignant
export const deleteEnseignant = createAsyncThunk(
    'enseignants/deleteEnseignant',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/enseignants/${id}`); // Endpoint pour supprimer un enseignant
            return id; // Retourne l'id de l'enseignant supprimé
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message); // Gère l'erreur
        }
    }
);

const enseignantSlice = createSlice({
    name: 'enseignants',
    initialState: {
        enseignants: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadEnseignants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadEnseignants.fulfilled, (state, action) => {
                state.loading = false;
                state.enseignants = action.payload; // Stocke les enseignants
            })
            .addCase(loadEnseignants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(loadEnseignantsParClasse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadEnseignantsParClasse.fulfilled, (state, action) => {
                state.loading = false;
                state.enseignants = action.payload; // Stocke les enseignants par classe
            })
            .addCase(loadEnseignantsParClasse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(createEnseignant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEnseignant.fulfilled, (state, action) => {
                state.loading = false;
                state.enseignants.push(action.payload); // Ajoute l'enseignant créé à la liste
            })
            .addCase(createEnseignant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(updateEnseignant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEnseignant.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.enseignants.findIndex(enseignant => enseignant.id === action.payload.id);
                if (index !== -1) {
                    state.enseignants[index] = action.payload; // Met à jour l'enseignant
                }
            })
            .addCase(updateEnseignant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(deleteEnseignant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEnseignant.fulfilled, (state, action) => {
                state.loading = false;
                state.enseignants = state.enseignants.filter(enseignant => enseignant.id !== action.payload); // Supprime l'enseignant
            })
            .addCase(deleteEnseignant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            });
    },
});

export default enseignantSlice.reducer;
