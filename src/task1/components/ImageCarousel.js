import React, { useState, useEffect } from "react";
import { fetchImageUrls, fetchImage } from "../../api/index";
import Image from './Image';
import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";
import LoadingState from "./LoadingState";

const ImageCarousel = (props) => {
    const [imageURLS, setImageURLS] = useState([]);
    const [image, setImage] = useState(null);

    const getImages = async () => {
        const urls = await fetchImageUrls()
        setImageURLS(urls);
    }

    const fetchImageData = async (index) => {
        const image = await fetchImage(index);
        setImage(image);
    }

    useEffect(() => {
        getImages();
    }, [])

    useEffect(() => {
        if (imageURLS && imageURLS.length > 0) {
            Promise.all([fetchImageData(0), fetchImageData(imageURLS.length - 1)]);
        }
    }, [imageURLS, imageURLS.length])

    return (
        <div className="ImageCarousel">
            {!image
                ?
                <LoadingState />
                :
                <Carousel>
                    {imageURLS.map((url) => (
                        <CarouselItem key={url}>
                            <Image imgUrl={url} />
                        </CarouselItem>
                    ))}
                </Carousel>
            }
        </div>
    );
};

export default ImageCarousel;
