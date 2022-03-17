import React from "react";

import "../styles/CarouselItem.css"

// To render the item itself
export const CarouselItem = ({ children, width, imgUrl }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            <img src={imgUrl} alt="imgUrl" key="{imgUrl}"></img>
        </div>
    );
};