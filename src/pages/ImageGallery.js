import React, { useState } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = Array.from({ length: 13 }, (_, i) => `/assets/${i + 1}.jpg`);

const CustomPrevArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: "absolute", left: -40, top: "50%", transform: "translateY(-50%)", color: "black", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "50%" }}>
    <ArrowBackIos />
  </IconButton>
);

const CustomNextArrow = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", color: "black", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "50%" }}>
    <ArrowForwardIos />
  </IconButton>
);

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />, 
    nextArrow: <CustomNextArrow />, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 2, marginTop: 4, marginBottom: 4, position: "relative" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{ width: "100%", cursor: "pointer", borderRadius: "8px" }}
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </Slider>
      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
            onClick={() => setSelectedImage(null)}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Full View" style={{ maxWidth: "90vw", maxHeight: "90vh" }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageGallery;