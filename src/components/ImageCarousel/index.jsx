import React, { useEffect, useState } from "react";
import { fetchImages } from "../../api/index";
import { Loader, ErrorAlert, Arrow, ImageSlide } from "../index";
import { moveCircularIndex } from "../../utils";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: {
    top: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
}));

const ImageCarousel = (props) => {
  const classes = useStyles();
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState('down');
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);
        const fetchedImages = await fetchImages();

        setImages(fetchedImages);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };

    getImages();

    const handleKeyDown = (e) => {
      if (e.which === 39) {
        onMoveSlide("right");
      }

      if (e.which === 37) {
        onMoveSlide("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onMoveSlide = (direction) => {
    const newIndex = moveCircularIndex(slideIndex, direction, images.length);

    const oppositeDirection = direction === "left" ? "right" : "left";
    setDirection(direction)
    setSlideIn(false)

    setTimeout(() => {
      setSlideIndex(newIndex);
      setDirection(oppositeDirection);
      setSlideIn(true);
  }, 500);
  };

  const content = () => (
    <>
      <Arrow direction={"left"} onClick={() => onMoveSlide("left")} />
      <ImageSlide
        content={images[slideIndex]}
        direction={direction}
        slideIn={slideIn}
      />
      <Arrow direction={"right"} onClick={() => onMoveSlide("right")} />
    </>
  );

  return (
    <Container maxWidth="sm">
      <Box className={classes.box}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert message={error.message} />
        ) : images?.length > 0 ? (
          content()
        ) : null}
      </Box>
    </Container>
  );
};

export default ImageCarousel;
