import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  mainBox: {
    height: 400,
    width: 1000,
    display: "flex",
    padding: 2,
    borderRadius: 1,
    overflow: "hidden",
  },
  imageBox: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    objectPosition: "center center",
  },
}));

const ImageSlide = (props) => {
  const { content: imageUrl, direction, slideIn } = props;
  const classes = useStyles();

  const containerRef = useRef(null);
  return (
    <Box className={classes.mainBox} ref={containerRef}>
      <Slide
        direction={direction}
        in={slideIn}
        container={containerRef.current}
      >
        <Box component="img" className={classes.imageBox} src={imageUrl} />
      </Slide>
    </Box>
  );
};

export default ImageSlide;
