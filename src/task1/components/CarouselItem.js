import React, { memo } from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';

import "../styles/CarouselItem.css"

// To render the item itself
const CarouselItem = (props) => {
    return (
        <div className="carousel-item" style={{ width: props.width }}>
            {props.children}
        </div>
    );
};

export default memo(CarouselItem);