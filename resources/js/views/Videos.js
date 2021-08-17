import React, { useState, useRef, useEffect } from 'react';
import Video from '../components/Video';
const Videos = () => {
    const [isVideoPause, setisVideoPause] = useState(false);
    const [search, setsearch] = useState("")
    const videoRef = useRef(null)
    const [asset, setasset] = useState("");
    const pauseVideo = () => {
        setisVideoPause(!isVideoPause);
        isVideoPause ? videoRef.current.play() : videoRef.current.pause()
    }

    const onSearch = () => {
        console.log(search);
    }

    useEffect(() => {
        setasset(document.querySelector("meta[name='asset']").content)
    }, [])
    useEffect(() => document.title = "Videos");
    return (
        <>
            <div className="tm-hero d-flex justify-content-center align-items-center" id="tm-video-container">
                <video autoPlay muted loop id="tm-video" ref={videoRef}>
                    <source src={`${asset}assets/video/hero.mp4`} type="video/mp4" />
                </video>
                <i id="tm-video-control-button" className={!isVideoPause ? `fas fa-pause` : `fas fa-play`} onClick={pauseVideo}></i>
                <form className="d-flex position-absolute tm-search-form">
                    <input className="form-control tm-search-input" type="search" placeholder="Search" aria-label="Search" value={search}
                        onChange={searchChange}
                        autoComplete="off"
                        list="categories"
                    />
                    <datalist id="categories">
                        {searchCategory.map((category, index) => (<option key={index} value={category.name} />))}
                    </datalist>
                    <button className="btn btn-outline-success tm-search-btn" type="button"
                        onClick={onSearch}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
            <div className="container-fluid tm-container-content tm-mt-60">
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        Latest Videos
                    </h2>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <form action="" className="tm-text-primary">
                            Page <input type="text" value="1" size="1" className="tm-input-paging tm-text-primary"
                                readOnly
                            /> of 180
                           </form>
                    </div>
                </div>
                <div className="row tm-mb-90 tm-gallery">
                    <Video />
                    <Video />
                    <Video />
                    <Video />
                    <Video />
                    <Video />
                    <Video />
                    <Video />
                </div>
                <div className="row tm-mb-90">
                    <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
                        <a href="false" className="btn btn-primary tm-btn-prev mb-2 disabled">Previous</a>
                        <div className="tm-paging d-flex">
                            <a href="false" className="active tm-paging-link">1</a>
                            <a href="false" className="tm-paging-link">2</a>
                            <a href="false" className="tm-paging-link">3</a>
                            <a href="false" className="tm-paging-link">4</a>
                        </div>
                        <a href="false" className="btn btn-primary tm-btn-next">Next Page</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Videos;