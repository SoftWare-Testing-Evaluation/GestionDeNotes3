import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { AlertProvider } from 'react-alert-with-buttons';

const root = createRoot(document.getElementById('root'));
root.render(
    <AlertProvider
        containerStyle={{ backgroundColor: "white", color: "black", textAlign: "center" }}
        defaultConfirmText="Yes"
        buttonStyle={{ backgroundColor: "red", color: "black" }}
    >
        <App />
    </AlertProvider>);