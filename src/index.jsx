// src/index.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AlertProvider } from 'react-alert-with-buttons';
import { Provider } from 'react-redux'; // Importez le Provider
import store from './store/store'; // Importez votre store

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> {/* Enveloppez votre application avec le Provider */}
        <AlertProvider
            containerStyle={{ backgroundColor: "white", color: "black", textAlign: "center" }}
            defaultConfirmText="Yes"
            buttonStyle={{ backgroundColor: "red", color: "black" }}
        >
            <App />
        </AlertProvider>
    </Provider>
);