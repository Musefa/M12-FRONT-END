import React from "react";
import Slider from "../components/Slider.js";
/*import VidalImg from "../resources/images/kellogsFPD.jpg";*/

export default function HomePage() {
  return (
    <div>
      <h1>Gestió de reunions</h1>
      {/* <img src={VidalImg} alt="Home" style={{ width: '50%' }} /> */}
      <Slider />
    </div>
  );
}
