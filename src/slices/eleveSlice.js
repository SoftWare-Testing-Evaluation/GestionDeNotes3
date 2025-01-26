// src/slices/eleveSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api.service';

// Thunk pour récupérer tous les élèves
export const fetchEleves = createAsyncThunk('eleves/fetchEleves', async () => {
    const response = await apiClient.get('/eleves');
    return response.data;
});

// Thunk pour récupérer un élève par son ID
export const fetchEleveById = createAsyncThunk('eleves/fetchEleveById', async (id) => {
    const response = await apiClient.get(`/eleves/${id}`);
    return response.data;
});

// Thunk pour ajouter un nouvel élève
export const addEleve = createAsyncThunk('eleves/addEleve', async (eleveData) => {
    const response = await apiClient.post('/eleves', eleveData);
    return response.data;
});

// Thunk pour mettre à jour un élève
export const updateEleve = createAsyncThunk('eleves/updateEleve', async ({ id, eleveData }) => {
    const response = await apiClient.put(`/eleves/${id}`, eleveData);
    return response.data;
});

// Thunk pour supprimer un élève
export const deleteEleve = createAsyncThunk('eleves/deleteEleve', async (id) => {
    await apiClient.delete(`/eleves/${id}`);
    return id; // Retourner l'ID pour supprimer l'élève du state
});

// Thunk pour récupérer les élèves par classe
export const fetchElevesParClasse = createAsyncThunk('eleves/fetchElevesParClasse', async ({ idClasseEtude, annee }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/eleves/classe/${idClasseEtude}/${annee}`);
        return response.data;
    } catch (error) {
        // Retourner une valeur de rejet personnalisée
        return rejectWithValue(error.response ? error.response.data : { message: 'Erreur de connexion au serveur' });
    }
});
// Thunk pour retirer un élève d'une classe
export const removeEleveFromClass = createAsyncThunk('eleves/removeEleveFromClass', async ({ idEleve, idClasse }) => {
    await apiClient.delete(`/eleves/retirer/${idEleve}/${idClasse}`);
    return idEleve; // Retourner l'ID pour supprimer l'élève du state
});


// Création du slice
const eleveSlice = createSlice({
    name: 'eleves',
    initialState: {
        eleves: [],
        elevesParClasse: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEleves.fulfilled, (state, action) => {
                state.eleves = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchEleveById.fulfilled, (state, action) => {
                const index = state.eleves.findIndex(eleve => eleve.id === action.payload.id);
                if (index === -1) {
                    state.eleves.push(action.payload);
                }
            })
            .addCase(addEleve.fulfilled, (state, action) => {
                state.eleves.push(action.payload);
            })
            .addCase(updateEleve.fulfilled, (state, action) => {
                const index = state.eleves.findIndex(eleve => eleve.id === action.payload.id);
                if (index !== -1) {
                    state.eleves[index] = action.payload;
                }
            })
            .addCase(deleteEleve.fulfilled, (state, action) => {
                state.eleves = state.eleves.filter(eleve => eleve.id !== action.payload);
            })
            
            .addCase(fetchElevesParClasse.fulfilled, (state, action) => {
                state.elevesParClasse[action.meta.arg.idClasseEtude] = action.payload.length;
                state.eleves = action.payload; // Mettre à jour les élèves
                state.status = 'succeeded';
                state.error = null; // Réinitialiser l'erreur
            })
            .addCase(fetchElevesParClasse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message; // Utiliser le message d'erreur personnalisé
                // Réinitialiser les élèves si aucune donnée n'est trouvée
                state.eleves = []; 
                state.elevesParClasse[action.meta.arg.idClasseEtude] = 0; // Mettre à jour le compteur d'élèves
            })
            .addCase(removeEleveFromClass.fulfilled, (state, action) => {
                // Filtrer l'élève retiré de l'état
                state.eleves = state.eleves.filter(eleve => eleve.id !== action.payload);
            }).addCase('UPDATE_ALL_ELEVES', (state, action) => {
                state.eleves = action.payload; // Mettre à jour l'état avec tous les élèves
            })
            
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    },
});

// Exporter le reducer
export default eleveSlice.reducer;