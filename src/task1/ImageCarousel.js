import React from "react";
// import { fetchImageUrls } from "../api/index";

import Carousel from "./components/Carousel";
import { CarouselItem } from "./components/CarouselItem";

const ImageCarousel = (props) => {
    return (
        <div className="ImageCarousel">
            <Carousel>
                <CarouselItem>Item 1</CarouselItem>
                <CarouselItem>Item 2</CarouselItem>
                <CarouselItem>Item 3</CarouselItem>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
