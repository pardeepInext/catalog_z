import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import background from '../../img/hero.jpg'
import RelatedPhoto from '../components/Photo';
import { Block, Notify } from 'notiflix';
import axios from '../axios';

const Photo = () => {
    let { id } = useParams();
    const history = useHistory();
    const [isDonwload, setisDonwload] = useState(false);
    const [photoDetails, setphotoDetails] = useState({});
    const [relatdPhotos, setrelatdPhotos] = useState([])

    const fetchRelatedPhoto = async (id) => {
        Block.dots('#related-gallary');
        axios.get(`/photos/category/${id}`)
            .then(res => {
                setrelatdPhotos(res.data.data);
                Block.remove('#related-gallary');
            })
            .catch(err => {
                Notify.failure("somthing went wrong please refresh page")
                Block.remove('#related-gallary');
            });
    }

    const DownloadSpinner = () => {
        if (isDonwload) return <i className="fas fa-circle-notch fa-spin"></i>;
        else return "";
    }

    const fetchPhoto = async () => {
        Block.pulse('#photo-container');
        axios.get(`photos/${id}`)
            .then(res => {
                setphotoDetails(res.data.data);
                Block.remove('#photo-container');
            })
            .catch(err => {
                Notify.failure("somthing went wrong please refresh page")
                Block.remove('#photo-container');
            });
    }

    const download = () => {
        setisDonwload(true);
        axios.get(`/donwload/photo/${id}`)
            .then((res) => {
                const link = document.createElement('a');
                link.href = photoDetails.file;
                link.setAttribute('download', 'image');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                setisDonwload(false);

            })
            .catch(err => Notify.failure("somthing went wrong please refresh page"))

    }


    useEffect(() => {
        let mounted = true;
        if (mounted) fetchPhoto();
        return () => mounted = false;
    }, [id]);

    useEffect(() => {
        if (photoDetails.category_id) fetchRelatedPhoto(photoDetails.category_id);
    }, [photoDetails])

    return (
        <>
            <div className="tm-hero" style={{ backgroundImage: `url(${background})`, backgroundAttachment: 'fixed' }}>
                <Link className="btn-sm btn btn-primary mt-2 ms-2" to={'/'}
                >Back to Gallary</Link>
            </div>
            <div className="container-fluid tm-container-content tm-mt-60" id="photo-container">
                <div className="row mb-4">
                    <h2 className="col-12 tm-text-primary">{photoDetails.name}</h2>
                </div>
                <div className="row tm-mb-90">
                    <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                        <img src={photoDetails.file} alt="Image" className="img-fluid" />
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="tm-bg-gray tm-video-details">
                            <p className="mb-4">
                                Please support us by making <a href="https://paypal.me/templatemo" target="_parent" rel="sponsored">a PayPal donation</a>. Nam ex nibh, efficitur eget libero ut, placerat aliquet justo. Cras nec varius leo.
                            </p>
                            <div className="text-center mb-5">
                                <button className="btn btn-primary tm-btn-big" onClick={download} id="download"
                                    disabled={isDonwload}
                                >
                                    <DownloadSpinner />
                                    Download
                                </button>
                            </div>
                            <div className="mb-4 d-flex flex-wrap">
                                <div className="mr-4 mb-2">
                                    <span className="tm-text-gray-dark">Dimension: </span><span className="tm-text-primary">1920x1080</span>
                                </div>
                                <div className="mr-4 mb-2">
                                    <span className="tm-text-gray-dark">Format: </span><span className="tm-text-primary">JPG</span>
                                </div>
                                <div className="mb-4">
                                    <h3 className="tm-text-gray-dark mb-3">License</h3>
                                    <p>Free for both personal and commercial use. No need to pay anything. No need to make any attribution.</p>
                                </div>
                                <div>
                                    <h3 className="tm-text-gray-dark mb-3">Tags</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <h2 className="col-12 tm-text-primary">
                        Related To {photoDetails.category ? photoDetails.category.name : ''}
                    </h2>
                </div>
                <div className="row mb-3 tm-gallery" id="related-gallary">
                    {relatdPhotos.map(relatdPhoto => (<RelatedPhoto key={relatdPhoto.id} {...relatdPhoto} />))}
                </div>
            </div>
        </>
    )
}

export default Photo
