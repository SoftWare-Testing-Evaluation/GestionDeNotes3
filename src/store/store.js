// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // Assurez-vous d'importer votre slice
import prefetReducer from '../slices/prefetSlice'; // Nouveau slice pour le préfet

const store = configureStore({
    reducer: {
        auth: authReducer,
        prefet: prefetReducer,
        // Ajoutez d'autres reducers ici
    },
});

export default store;
