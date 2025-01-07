// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // Assurez-vous d'importer votre slice
import prefetReducer from '../slices/prefetSlice'; // Nouveau slice pour le préfet
import enseignantReducer from '../slices/enseignantSlice'; // Importez le slice des enseignants
import classReducer from '../slices/classSlice';
import eleveReducer from '../slices/eleveSlice'//Importez le slice des eleves
import matiereReducer from '../slices/matiereSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        prefet: prefetReducer,
        classes: classReducer,
        enseignants: enseignantReducer, // Ajoutez le reducer des enseignants
        eleves:eleveReducer,
        matieres:matiereReducer,
        // Ajoutez d'autres reducers ici
    },
});

export default store;
