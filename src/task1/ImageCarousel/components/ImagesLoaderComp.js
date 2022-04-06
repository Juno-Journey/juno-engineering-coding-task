import React, {useLayoutEffect} from "react";

const preloadImages = (images) => {
    images.forEach((imagePath) => {
        const img = new Image();
        img.src = imagePath;
    });
};

const ImagesLoaderComp = ({images}) => {
    useLayoutEffect(() => {
        if(images) {
            preloadImages(images);
        }
    }, [images]);

    return <></>;
};

export default ImagesLoaderComp;
