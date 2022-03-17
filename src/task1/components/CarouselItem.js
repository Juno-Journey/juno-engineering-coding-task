import React from "react";

import "../styles/CarouselItem.css"

// To render the item itself
export const CarouselItem = ({ children, width }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            {children}
        </div>
    );
};