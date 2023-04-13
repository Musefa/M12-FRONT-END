import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { UserProvider } from './contexts/UserContext';
import PlantillaPage, { PlantillaCreate } from "./pages/PlantillaPage";
import PlantillaEdit from "./components/PlantillaEdit";
import ProtectedRoute from './components/ProtectedRoute';
import GrupPage from "./pages/GrupPage"; // Importa GrupCreate aquí
import GrupEdit from "./components/GrupEdit";
import GrupCreatePage from "./pages/GrupCreatePage";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/plantillas" element={<ProtectedRoute roles={['administrador', 'directivo']}><PlantillaPage /></ProtectedRoute>} />
            <Route path="/plantillas/edit/:id" element={<ProtectedRoute roles={['administrador', 'directivo']}><PlantillaEdit /></ProtectedRoute>} />
            <Route path="/plantillas/create" element={<ProtectedRoute roles={['administrador', 'directivo']}><PlantillaCreate /></ProtectedRoute>} />
            <Route path="/grups" element={<ProtectedRoute roles={['administrador', 'directivo']}><GrupPage /></ProtectedRoute>} />
            <Route path="/grups/edit/:id" element={<ProtectedRoute roles={['administrador', 'directivo']}><GrupEdit /></ProtectedRoute>} />
            <Route path="/grups/create" element={<ProtectedRoute roles={['administrador', 'directivo']}><GrupCreatePage /></ProtectedRoute>} /> {/* Agrega esta línea para GrupCreate */}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
