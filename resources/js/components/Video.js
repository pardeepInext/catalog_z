import React, { useState, useEffect, useRef } from 'react'
import figure from '../../img/img-01.jpg';
export const Video = () => {
    const [asset, setasset] = useState("");
    const video = useRef(null);
    useEffect(() => {
        setasset(document.querySelector("meta[name='asset']").content);
    }, [])

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
            <figure className="effect-ming tm-video-item">
                <img src={figure} alt="Image" className="img-fluid" />
                <figcaption className="d-flex align-items-center justify-content-center">
                    <h2>Hangers</h2>
                    <a href="false">View more</a>
                </figcaption>
            </figure>
            <div className="d-flex justify-content-between tm-text-gray">
                <span>24 Oct 2020</span>
                <span>10,460 views</span>
            </div>
        </div>
    )
}

export default Video;