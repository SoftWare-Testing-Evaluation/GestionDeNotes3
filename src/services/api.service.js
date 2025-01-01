// src/services/api.service.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gestion des erreurs
const handleError = (error) => {
    if (error.response) {
        return error.response.data || 'Erreur de serveur';
    } else if (error.request) {
        return 'Aucune réponse du serveur';
    } else {
        return error.message;
    }
};

// --- Authentification ---

/**
 * Authentifie un préfet d'étude et retourne un token.
 * @param {string} login - Le login du préfet.
 * @param {string} email - L'email du préfet.
 * @param {string} password - Le mot de passe du préfet.
 * @returns {Promise<Object>} - Les données de réponse contenant le token.
 */

// --- Classes d'Étude ---

/**
 * Récupère toutes les classes d'étude.
 * @returns {Promise<Array>} - Les données des classes d'étude.
 */
const fetchClassesEtude = async () => {
    try {
        const response = await apiClient.get('/classeEtude');
        return response.data; // Retourne les données des classes
    } catch (error) {
        throw new Error(handleError(error));
    }
};

// --- Intercepteur Axios ---

// Exemple d'intercepteur Axios
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Récupérer le token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Ajouter le token aux en-têtes
    }
    return config;
});

const createPrefetEtude = async (prefetData) => {
    try {
        const response = await apiClient.post('/prefetEtudes', prefetData);
        return response.data; // Retourne les données du préfet créé
    } catch (error) {
        throw new Error(handleError(error)); // Gère les erreurs
    }
};

// Nouvelle action pour mettre à jour le profil
const updateUserProfile = async (userId,userData) => {
        try {
            console.log(userData);
            const response = await apiClient.put(`/prefetEtudes/${userId}`, userData);
            
            return response.data; // Retourne les données mises à jour
        } catch (error) {
            throw new Error(handleError(error)); // Gère les erreurs
        }
    }
// Exporter les fonctions API
export {
    fetchClassesEtude,
    apiClient, // Exporter apiClient pour une utilisation dans d'autres fichiers
    createPrefetEtude,
    updateUserProfile,
};
