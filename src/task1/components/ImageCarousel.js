import React, { useState, useEffect } from "react";
import { fetchImageUrls } from "../../api/index";

import Carousel from "./Carousel";
import { CarouselItem } from "./CarouselItem";
import { LoadingState } from "./LoadingState";
// import "../styles/ImageCarousel.css"

const ImageCarousel = (props) => {
    const [images, setImages] = useState([]);

    const getImages = async () => {
        const urls = await fetchImageUrls()
        setImages(urls);
    }

    useEffect(() => {
        getImages();
    }, [])

    return (
        <div className="ImageCarousel">
            {images.length === 0
            ?
            <LoadingState />
            :
            <Carousel>
                {images.map((url) => (
                    <CarouselItem imgUrl={url}></CarouselItem>
                ))}
            </Carousel>
            }
        </div>
    );
};

export default ImageCarousel;
