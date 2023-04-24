import React from 'react';
import VidalImg from "../resources/images/kellogsFPD.jpg";

export default function HomePage() {
  return (
    <div>
      <h1>Gestión de reuniones</h1>
      <img src={VidalImg} alt="Home" style={{ width: '50%' }} />
      {/* Aquí puedes agregar más contenido a tu página principal */}
    </div>
  );
}
