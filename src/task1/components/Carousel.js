import React, { useState } from "react";

import Indicators from "./Indicators";
import "../styles/Carousel.css"

// The main controller to control the items
const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
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