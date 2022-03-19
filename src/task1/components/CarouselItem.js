import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import "../styles/CarouselItem.css"

// To render the item itself
export const CarouselItem = ({ width, imgUrl }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            <LazyLoadImage 
                effect="black-and-white"
                src={imgUrl} 
                alt="imgUrl" 
                key="{imgUrl}"
            />
        </div>
    );
};