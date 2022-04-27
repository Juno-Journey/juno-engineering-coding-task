import React, {useEffect, useState} from "react";
import {fetchImageUrls, fetchImages} from "../api";

const Button = ({ onClick, children }) => (
  <div style={{ padding: '20px' }}>
      <button onClick={onClick}>{children}</button>
  </div>
)

const Loading = () => <div>Loading...</div>

const EmptySlider = () => <div>No Images to show...</div>

const ImageCarousel = (props) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        fetchImageUrls().then(imageUrl => {
            setImageUrls(imageUrl)
            setCurrentIndex(0)
            fetchImages().then(_ => {
                setIsLoading(false)
            })
        })
    }, [])

    const onNextImage = () => {
        if (currentIndex === imageUrls.length - 1) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const onPreviousImage = () => {
        if (currentIndex === 0) {
            setCurrentIndex(imageUrls.length - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    if (!imageUrls.length && !isLoading) {
        return <EmptySlider />
    }

    return (
      <>
          {
              !isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Button onClick={onPreviousImage}>prev</Button>
                    <img src={imageUrls[currentIndex]} alt="" width={400} height={400}/>
                    <Button onClick={onNextImage}>next</Button>
                </div>
              ) : <Loading />
          }

      </>
    );
};
export default ImageCarousel;
