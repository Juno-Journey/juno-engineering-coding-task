import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchImages } from '../api';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Loader } from './components';
import './ImageCarousel.css';

const ImageCarousel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    const autoPlayRef = useRef();
    const imagesCount = images.length;

    const prevSlideHandler = () => {
        setCurrentImageIndex(
            (currentImageIndex) => (currentImageIndex - 1 + imagesCount) % imagesCount
        );
    };

    const nextSlideHandler = useCallback(() => {
        setCurrentImageIndex((currentImageIndex + 1) % imagesCount);
    }, [currentImageIndex, imagesCount]);

    useEffect(() => {
        let isMounted = true;
        const fetchAllImages = async () => {
            const images = await fetchImages();
            if (isMounted) {
                setImages(images);
            }
            setIsLoading(false);
        };
        fetchAllImages().catch((e) => {
            console.log('error in fetchAllImages, e');
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        autoPlayRef.current = nextSlideHandler;
    }, [nextSlideHandler]);

    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        };
        let interval = null;

        if (autoPlay) {
            interval = setInterval(play, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [autoPlay]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <div data-testid="carousel" className="carousel">
                <h1>Carousel With AutoPlay </h1>
                <div className="carousel__item">
                    <img src={images[currentImageIndex]} alt="slider image" />
                </div>
                <ArrowBackIosNewIcon
                    data-testid="previous"
                    className="leftArrow"
                    onClick={prevSlideHandler}
                    sx={{ cursor: 'pointer', fontSize: '30px' }}
                />
                <ArrowForwardIosIcon
                    data-testid="next"
                    onClick={nextSlideHandler}
                    className="rightArrow"
                    sx={{ cursor: 'pointer', fontSize: '30px' }}
                />

                <h2>Auto Play</h2>
                <Button
                    sx={{ marginRight: 2 }}
                    onClick={() => setAutoPlay(true)}
                    variant="contained"
                >
                    Auto Play
                </Button>
                <Button onClick={() => setAutoPlay(false)} variant="contained">
                    Stop Auto Play
                </Button>
            </div>
        </>
    );
};

export default ImageCarousel;
