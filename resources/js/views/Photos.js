import React, { useState, useEffect, useRef } from 'react';
import background from '../../img/hero.jpg'
import Photo from '../components/Photo';
import axios from '../axios';
import { Block, Notify } from 'notiflix';
import { map } from 'lodash';

const Photos = () => {
  useEffect(() => document.title = "Catalog-Z");
  const endPhoto = useRef(null)
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [searchCategory, setsearchCategory] = useState([]);
  const [isCategoryFetch, setisCategoryFetch] = useState(false);
  const [photos, setphotos] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);

  const searchChange = (e) => setsearch(e.target.value);

  const onSearch = () => {
    const filterArr = searchCategory.filter((value) => value.name == search);
    let id = filterArr.length > 0 ? filterArr[0].id : "";
    setpage(1);
    fetchPhoto(id);
  }

  /* pagination */
  const PaginateButtons = () => {
    const pageBtn = [];
    for (let index = 1; index <= lastPage; index++) {
      pageBtn.push(<a key={index} className={index == currentPage ? 'tm-paging-link active' : 'tm-paging-link'}
        onClick={() => setpage(index)}
      >{index}</a>)
    }
    return pageBtn;

  }

  /* show loading for category  ajax */
  const ShowLoading = () => {
    return isCategoryFetch ? <i className="fas fa-spinner fa-pulse text-white me-3"></i> : "";
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

  const fetchPhoto = async (cat_id = "") => {
    Block.pulse("#end-photo");
    await axios.get(`photos`, {
      params: {
        page: currentPage,
        category_id: cat_id
      }
    })
      .then(res => {
        setcurrentPage(res.data.meta.current_page);
        setlastPage(res.data.meta.last_page);
        const newPhoto = photos.concat(res.data.data);
        setphotos(newPhoto)
        Block.remove("#end-photo");
      })
      .catch(err => {
        Block.remove("#end-photo");
        Notify.failure("Something went wrong please refresh page!")
      });
  }

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
    );
  }


  useState(() => {
    let mounted = true;
    if (mounted) fetchPhoto();
    return () => mounted = false;
  })

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
  }, [lastPage, currentPage]);

  const infiniteScroll = () => {
    if (isInViewport(endPhoto.current) || currentPage > lastPage) {
      let NextPage = currentPage + 1;
      setcurrentPage(NextPage);
      console.log(currentPage);
    }
  }
  /* fetch category ajax hook  */
  useEffect(() => {
    if (search.length > 1) fetchCategory()
  }, [search]);

  console.log(photos);
  return (
    <>
      <div className="tm-hero d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${background})`, backgroundAttachment: 'fixed' }}>
        <ShowLoading />
        <form className="d-flex tm-search-form">
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
      <div className="container-fluid tm-container-content tm-mt-60" data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500">
        <div className="row mb-4">
          <h2 className="col-6 tm-text-primary">
            Latest Photos
            </h2>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <form action="" className="tm-text-primary">
              Page <input type="text" readOnly value={page} size="1" className="tm-input-paging tm-text-primary" onChange={(e) => setpage(e.target.vaue)} /> of {lastPage}
            </form>
          </div>
          <div className="row tm-mb-90 tm-gallery">
            {photos.map(photo => <Photo key={photo.id} {...photo} />)}
          </div>
          <div id="end-photo" ref={endPhoto}></div>
          <div className="row tm-mb-90">
            <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
              <a className={`btn btn-primary tm-btn-prev mb-2  ${currentPage == 1 ? 'disabled' : ''}`}
                onClick={() => setpage(currentPage - 1)}
              >Previous</a>
              <div className="tm-paging d-flex">
                <PaginateButtons />
              </div>
              <a className={`btn btn-primary tm-btn-next ${currentPage == lastPage ? 'disabled' : ''}`}
                onClick={() => setpage(currentPage + 1)}
                disabled={true}
              >Next Page</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Photos;