import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import AppLayout from './components/AppLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/registration-form" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
