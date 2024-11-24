import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Prevent React double rendering in development
const strictMode = false;

const root = ReactDOM.createRoot(document.getElementById('root'));

if (strictMode) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(<App />);
}
