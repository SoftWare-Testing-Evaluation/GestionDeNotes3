import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClassesEtude } from '../services/api.service';

export const loadClasses = createAsyncThunk(
    'classes/loadClasses',
    async (_, { rejectWithValue }) => {
        try {
            const classesData = await fetchClassesEtude();
            return classesData; // Retourne les classes
        } catch (error) {
            return rejectWithValue(error.message); // Gère l'erreur
        }
    }
);

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
            });
    },
});

export default classSlice.reducer;
