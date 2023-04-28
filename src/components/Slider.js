import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    {
      url: "https://c8.alamy.com/comp/W4AR12/woman-in-conference-room-stands-to-discuss-while-women-sit-at-table-W4AR12.jpg",
    },
    {
      url: "https://www.brainbalancecenters.com/hubfs/blog_meeting-childs-teacher-first-time.jpg",
    },
    {
      url: "https://www.studentachievementsolutions.com/wp-content/uploads/2021/11/School-Faculty-Meeting-Agenda.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imgStyle = {
    maxWidth: "500px",
    maxHeight: "500px",
    objectFit: "contain",
    margin: "0 auto",
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.url}>
          <img src={image.url} alt="Slider" style={imgStyle} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
