import React, { memo } from "react";
import LoadingState from "./LoadingState";
import 'react-lazy-load-image-component/src/effects/blur.css';
import usePreloadImage from '../hooks/usePreloadImage';

import "../styles/CarouselItem.css"

// To render the item itself
const Image = ({ imgUrl }) => {
    const { loadingState } = usePreloadImage(imgUrl);

    return (
        <div className="carousel-item">
            {loadingState.loaded ? <img src={imgUrl}
                alt="" /> : <LoadingState /> }
        </div>
    );
};

export default memo(Image);