import React, { useState, useEffect } from "react";
import { fetchImageUrls } from "../api/index";

import Carousel from "./components/Carousel";
import { CarouselItem } from "./components/CarouselItem";

const ImageCarousel = (props) => {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const urls = await fetchImageUrls()
            setImageUrls(urls);
        }
        fetchData();
    }, [])


    console.log(imageUrls[0]);

    return (
        <div className="ImageCarousel">
            <Carousel>
                {imageUrls.map((url) => (
                    <CarouselItem imgUrl={url}></CarouselItem>
                ))}
                {/* <CarouselItem img={imageUrls[0]}></CarouselItem>
                <CarouselItem>Item 2</CarouselItem>
                <CarouselItem>Item 3</CarouselItem> */}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
