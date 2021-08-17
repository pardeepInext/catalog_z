import React, { useState, useEffect, useRef } from 'react';
import background from '../../img/hero.jpg'
import Photo from '../components/Photo';
import axios from '../axios';
import { Block, Notify } from 'notiflix';
import { map } from 'lodash';

const Photos = () => {
  useEffect(() => document.title = "Catalog-Z");
  const mounted = useRef(true);
  const endPhoto = useRef(null)
  const [isVideoPause, setisVideoPause] = useState(false);
  const videoRef = useRef(null)
  const [asset] = useState(document.querySelector("meta[name='asset']").content);
  const [search, setsearch] = useState("");
  const [isPhotoLoading, setisPhotoLoading] = useState(false);
  const [searchCategory, setsearchCategory] = useState([]);
  const [isCategoryFetch, setisCategoryFetch] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setPage] = useState(1);
  const [catId, setCatId] = useState("");
  // const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);

  const searchChange = (e) => setsearch(e.target.value);

  const pauseVideo = () => {
    setisVideoPause(!isVideoPause);
    isVideoPause ? videoRef.current.play() : videoRef.current.pause()
  }

  /* show loading for category  ajax */
  const ShowLoading = () => {
    return isCategoryFetch ? <i className="fas fa-spinner fa-pulse text-white me-3"></i> : "";
  }

  /* photo fetching loading */
  const ShowPhotoLoading = () => {
    return isPhotoLoading ? (<p className="text-center"><i className="fas fa-spinner fa-pulse me-3"></i> Loading ...</p>) : "";
  }
  /* fetch category ajax */

  const fetchCategory = () => {
    setisCategoryFetch(true);
    axios.get('category/search', {
      params: { search: search }
    })
      .then(res => {
        setsearchCategory(res.data.data);
        setisCategoryFetch(false);
      });
  }

  const fetchPhoto = async () => {
    setisPhotoLoading(true);
    await axios.get(`photos`, {
      params: {
        page: page,
        category_id: catId
      }
    })
      .then(res => {
        setlastPage(res.data.meta.last_page);
        const newPhoto = page == 1 ? res.data.data : photos.concat(res.data.data);
        setphotos(newPhoto)
        setisPhotoLoading(false);
      })
      .catch(err => {
        Notify.failure(`Something went wrong please refresh page! ${err.message}`)
      });
  }

  const onSearch = () => {
    const filterArr = searchCategory.filter((value) => value.name == search);
    let id = filterArr.length > 0 ? filterArr[0].id : "";
    setCatId(id);
  }
  //fetching photos from API
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchPhoto();
      window.addEventListener('scroll', infiniteScroll)
    }
    return () => {
      mounted = false;
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [page, lastPage, catId]);

  const infiniteScroll = () => {
    let doc = document.querySelector('#infinter-scroll');
    if (window.innerHeight + window.scrollY > doc.scrollHeight && page < lastPage) {
      let NextPage = page + 1;
      setPage(NextPage);
      console.log(page);
    }
  }
  /* fetch category ajax hook  */
  useEffect(() => {
    if (search.length > 1) fetchCategory()
  }, [search]);

  return (
    <>
      <div className="tm-hero d-flex justify-content-center align-items-center" id="tm-video-container">
        <video autoPlay muted loop id="tm-video" ref={videoRef}>
          <source src={`${asset}assets/video/hero.mp4`} type="video/mp4" />
        </video>
        <i id="tm-video-control-button" className={!isVideoPause ? `fas fa-pause` : `fas fa-play`} onClick={pauseVideo}></i>
        <form className="d-flex position-absolute tm-search-form">
          <input className="form-control tm-search-input" type="search" placeholder="Search" aria-label="Search" value={search}
            onChange={(e) => setsearch(e.target.value)}
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
      <div className="container-fluid tm-container-content tm-mt-60" data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        id="photo-container"
      >
        <div className="row mb-4">
          <h2 className="col-6 tm-text-primary">
            Latest Photos
            </h2>
          <div className="row tm-mb-90 tm-gallery">
            {photos.map(photo => <Photo key={photo.id} {...photo} />)}
            <ShowPhotoLoading />
          </div>
          <div id="end-photo" ref={endPhoto}></div>
        </div>
      </div>
    </>
  );
}

export default Photos;