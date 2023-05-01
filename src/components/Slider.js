import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    {
      url: "https://i.imgur.com/aZlear3.jpg",
    },
    {
      url: "https://i.imgur.com/Wwm5bw6.jpg",
    },
    {
      url: "https://i.imgur.com/3swuefv.jpeg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const styles = {
    maxWidth: "60%",
    margin: "0 auto",
    marginTop: "2rem",
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.url}>
          <img src={image.url} alt="Slider" style={styles} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
