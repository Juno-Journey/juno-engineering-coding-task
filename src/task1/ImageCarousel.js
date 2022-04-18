import React, { useState, useEffect } from 'react'

import './styles.css'

import { fetchImageUrls } from '../api/index'

const ImageCarousel = (props) => {
    const [current, setCurrent] = useState(0)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    fetchImageUrls().then((data) => setImages(data))

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1)
    }

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1)
    }

    useEffect(() => {
        setLoading(true)
        fetchImageUrls()
            .then((res) => setImages(res))
            .finally(() => setLoading(false))
    }, [])

    return (
        <section>
            <div className='carousel'>
                {loading ? (
                    <h1>Wait a second...</h1>
                ) : (
                    <>
                        {!images?.length ? (
                            <h1>Sorry, there is no images</h1>
                        ) : (
                            <>
                                <button className='carousel-button prev' onClick={() => prevSlide()}>
                                    &#8592;
                                </button>
                                <button className='carousel-button next' onClick={() => nextSlide()}>
                                    &#8594;
                                </button>
                                <ul>
                                    {images?.map((image, index) => {
                                        return (
                                            <li key={index} className={`slide ${index === current && 'active-slide'}`}>
                                                <img className='img' src={image} alt='juno' />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
export default ImageCarousel
