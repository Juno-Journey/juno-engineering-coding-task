import React from "react";

import "../styles/Indicators.css"

const Indicators = ({ childrenCount, activeIndex, setActiveIndex }) => {
    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = childrenCount - 1
        } else if (newIndex >= childrenCount) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };

    return (
        <div className="indicators">
        <button
            onClick={() => {
                updateIndex(activeIndex - 1);
            }}>
            Prev
        </button>
        <button
            onClick={() => {
                updateIndex(activeIndex + 1);
            }}>
            Next
        </button>
    </div>
    )
}

export default Indicators