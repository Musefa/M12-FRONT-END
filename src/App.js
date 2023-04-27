import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { UserProvider } from './contexts/UserContext';
import PlantillaPage, { PlantillaCreate } from "./pages/PlantillaPage";
import PlantillaEdit from "./components/Plantilles/PlantillaEdit";
import ProtectedRoute from './components/ProtectedRoute';
import GrupPage from "./pages/GrupPage";
import GrupEdit from "./components/Grups/GrupEdit";
import GrupCreatePage from "./pages/GrupCreatePage";
import ConvocatoriaPage from "./pages/ConvocatoriaPage";
import ConvocatoriaEdit from "./components/Convocatorias/ConvocatoriaEdit";
import ConvocatoriaCreatePage from "./pages/ConvocatoriaCreatePage";
import ActaPage from "./pages/ActaPage";
import ActaEdit from "./components/Actas/ActaEdit";
import ActaCreatePage from "./pages/ActaCreatePage";
import AcordPage from "./pages/AcordPage";
import AcordEdit from "./components/Acords/AcordEdit";
import AcordCreatePage from "./pages/AcordCreatePage";
import UserEdit from "./components/Users/UserEdit";
import UserList from "./components/Users/UserList";

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
            <Route path="/plantillas" element={<ProtectedRoute roles={['administrador', 'directiu']}><PlantillaPage /></ProtectedRoute>} />
            <Route path="/plantillas/edit/:id" element={<ProtectedRoute roles={['administrador', 'directiu']}><PlantillaEdit /></ProtectedRoute>} />
            <Route path="/plantillas/create" element={<ProtectedRoute roles={['administrador', 'directiu']}><PlantillaCreate /></ProtectedRoute>} />
            <Route path="/grups" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><GrupPage /></ProtectedRoute>} />
            <Route path="/grups/edit/:id" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><GrupEdit /></ProtectedRoute>} />
            <Route path="/grups/create" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><GrupCreatePage /></ProtectedRoute>} />
            <Route path="/convocatorias" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><ConvocatoriaPage /></ProtectedRoute>} /> {/* Añade esta línea */}
            <Route path="/convocatorias/edit/:id" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><ConvocatoriaEdit /></ProtectedRoute>} />
            <Route path="/convocatorias/create" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><ConvocatoriaCreatePage /></ProtectedRoute>} />
            <Route path="/actas" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><ActaPage /></ProtectedRoute>} />
            <Route path="/actas/edit/:id" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><ActaEdit /></ProtectedRoute>} />
            <Route path="/actas/create" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><ActaCreatePage /></ProtectedRoute>} />
            <Route path="/acords" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><AcordPage /></ProtectedRoute>} />
            <Route path="/acords/edit/:id" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><AcordEdit /></ProtectedRoute>} />
            <Route path="/acords/create" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><AcordCreatePage /></ProtectedRoute>} />
            <Route path="/user/edit/:id" element={<ProtectedRoute roles={['administrador', 'directiu', 'professor']}><UserEdit /></ProtectedRoute>} />
            <Route path="/admin/panel" element={<ProtectedRoute roles={['administrador']}><UserList /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
