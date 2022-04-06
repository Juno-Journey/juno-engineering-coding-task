import React, {useEffect, useState} from "react";
import {fetchImageUrls} from "../../api";
import {ReactComponent as ArrowSvg} from "../../task1/images/arrow.svg";
import ImagesLoaderComp from "./components/ImagesLoaderComp";
import "./ImageCarousel.css";


const ImageCarousel = () => {
    const [images, setImages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const imagesCount = images?.length;

    const nextSlide = () => {
        setIsLoading(true);
        setCurrentImgIdx(prev => prev === (imagesCount - 1) ? 0 : prev + 1);
    };

    const prevSlide = () => {
        setIsLoading(true);
        setCurrentImgIdx(prev => prev === 0 ? imagesCount - 1 : prev - 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchImageUrls();
            setImages(data);
        };
        fetchData();
    }, []);


    return (
        <div className="image-carousel-page">
            <ImagesLoaderComp images={images}/>
            <ArrowSvg className='arrow left-arrow' onClick={nextSlide}/>
            <ArrowSvg className='arrow right-arrow' onClick={prevSlide}/>
            {isLoading &&
            <div className='loading'>
                LOADING...
            </div>
            }
            {images &&
            <div className={isLoading ? "slider-container hidden" : "slider-container"}>
                {images.map((image, idx) =>
                    (
                        <div
                            className={idx === currentImgIdx ? 'slide active' : 'slide'}
                            key={idx}
                        >
                            {idx === currentImgIdx && (
                                <img
                                    src={image}
                                    alt='image'
                                    className='image'
                                    onLoad={() => setIsLoading(false)}
                                />
                            )}
                        </div>
                    ))}
            </div>
            }
        </div>
    );
};
export default ImageCarousel;
