import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {BrowserRouter} from "react-router-dom";
import {TransactionsProvider} from "./contexts/TransactionsContext.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
              <AuthProvider>
                  <TransactionsProvider>
                      <App />
                  </TransactionsProvider>
              </AuthProvider>
      </BrowserRouter>
  </StrictMode>
)
