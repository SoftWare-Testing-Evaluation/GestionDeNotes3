// src/slices/noteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../services/api.service';

// Thunk pour charger les notes par matière et classe
export const loadNotesByMatiereAndClasse = createAsyncThunk(
    'notes/loadNotesByMatiereAndClasse',
    async ({ idMatiere, idClasseEtude, annee }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/notes/matiere-classe/${idMatiere}/${idClasseEtude}?annee=${annee}`);
            console.log(response.data);
            return response.data; // Retourne les notes

        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour ajouter une nouvelle note
export const addNote = createAsyncThunk(
    'notes/addNote',
    async (noteData, { rejectWithValue }) => {
        console.log(noteData);
        try {
            const response = await apiClient.post('/notes', noteData);
            return response.data; // Retourne la note ajoutée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour mettre à jour une note
export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, noteData }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/notes/${id}`, noteData);
            return response.data; // Retourne la note mise à jour
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Thunk pour supprimer une note
export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/notes/${id}`);
            return id; // Retourne l'ID de la note supprimée
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

// Création du slice
const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadNotesByMatiereAndClasse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadNotesByMatiereAndClasse.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload; // Stocke les notes
            })
            .addCase(loadNotesByMatiereAndClasse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.notes.push(action.payload); // Ajoute la nouvelle note
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.notes.findIndex(note => note.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = action.payload; // Met à jour la note
                }
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note.id !== action.payload); // Supprime la note
            });
    },
});

// Exporter le reducer
export default noteSlice.reducer;
