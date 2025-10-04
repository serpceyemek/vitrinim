import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Dosyanız App.js ise .jsx yerine .js yazın

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// Minimal service worker kaydı
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW register failed', err));
  });
}
