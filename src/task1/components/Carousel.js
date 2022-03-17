import React, { useState } from "react";

import Indicators from "./Indicators";
import "../styles/Carousel.css"

// The main controller to control the items
const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // const updateIndex = (newIndex) => {
    //     if (newIndex < 0) {
    //         newIndex = 0
    //     } else if (newIndex >= React.Children.count(children)) {
    //         newIndex = React.Children.count(children) - 1;
    //     }

    //     setActiveIndex(newIndex);
    // };

    return (
        <div className="carousel">
            <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}> {/*Control the active item*/}
                {/* Iterate all CarouselItems */}
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "100%" });
                })}
            </div>
            <Indicators 
                childrenCount={React.Children.count(children)} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex}
            />
        </div>
    );
};

export default Carousel;