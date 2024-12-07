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
const authenticatePrefet = async (login, email, password) => {
    try {
        const response = await apiClient.post('/auth', { login, email, password });
        return response.data; // Retourne le token
    } catch (error) {
        throw new Error(handleError(error));
    }
};

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

// Exporter les fonctions API
export {
    authenticatePrefet,
    fetchClassesEtude,
    apiClient, // Exporter apiClient pour une utilisation dans d'autres fichiers
};
