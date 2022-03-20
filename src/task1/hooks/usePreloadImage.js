import { useEffect, useState } from "react"

const usePreloadImage = (src) => {
    const [loadingState, setLoaded] = useState({loaded : false, src : null});

    useEffect(() => {
        const image = new Image();

        image.onload = () => setLoaded({
            loaded: true,
            src: `url(${src})`
        });

        image.src = src;
    }, [src])



    return { loadingState }
}

export default usePreloadImage;