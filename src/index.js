import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

serviceWorkerRegistration.register();

reportWebVitals();
