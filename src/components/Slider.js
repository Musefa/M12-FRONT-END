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
      url: "https://i.imgur.com/aZlear3.jpg",
    },
    {
      url: "https://i.imgur.com/aZlear3.jpg",
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
    maxWidth: "65%",
    margin: "0 auto",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <Slider {...settings} style={styles}>
      {images.map((image) => (
        <div key={image.url}>
          <img src={image.url} alt="Slider" style={imageStyles} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
