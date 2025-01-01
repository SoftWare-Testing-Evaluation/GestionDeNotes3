import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient,updateUserProfile } from '../services/api.service';

export const authenticatePrefet = createAsyncThunk(
    'auth/authenticatePrefet',
    async ({ login, email, password }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/auth', { login, email, password });
            // Retournez le token et les informations de l'utilisateur
            return {
                token: response.data.token,
                user: response.data.user, // Assurez-vous que le backend renvoie les données de l'utilisateur
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// Nouvelle action pour mettre à jour le profil
export const updateProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async ({ userId, userData },{ rejectWithValue }) => {
        try {
          
            const response = await updateUserProfile(userId,userData);
            
            return response.data; // Retourne les données mises à jour
        } catch (error) {
            return rejectWithValue(error.response.data); // Gère l'erreur
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token'); // Supprime le token du localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticatePrefet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authenticatePrefet.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token; // Stocke le token
                state.user = action.payload.user; // Stocke les informations de l'utilisateur
                localStorage.setItem('token', action.payload.token); // Stocke le token dans le localStorage
            })
            .addCase(authenticatePrefet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Met à jour les données de l'utilisateur
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gère l'erreur
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
