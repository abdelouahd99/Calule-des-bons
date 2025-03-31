import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// main.jsx or index.jsx (whichever file is your entry point)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
