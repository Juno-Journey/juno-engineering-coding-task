import React from "react";

import "../styles/Carousel.css"

// The main controller to control the items
const Carousel = ({ children }) => {
    return (
        <div className="carousel">
            <div className="inner" style={{ transform: "translateX(-0%)" }}> {/*Control the active item*/}
                {/* Iterate all CarouselItems */}
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "100%" });
                })}
            </div>
        </div>
    );
};

export default Carousel;