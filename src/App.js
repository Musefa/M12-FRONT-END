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
            <Route path="/plantillas" element={<PlantillaPage />} />
            <Route path="/plantillas/edit/:id" element={<PlantillaEdit />} />
            <Route path="/plantillas/create" element={<PlantillaCreate />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}
