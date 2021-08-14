import bgFegure from '../../img/hero.jpg'
import aboutFigure from '../../img/about.jpg';
import AboutColumn from '../components/AboutColumn';
import React, { useState, useEffect } from 'react';
const About = () => {
    useEffect(() => document.title = "About");
    const [columns] = useState([
        {
            title: "Three-column title one",
            paragraph: "Integer tristique arcu scelerisque mauris posuere convallis. Fusce egestas ipsum sapien, hendrerit ultricies nisi viverra eget. Vestibulum in tortor eget elit rutrum interdum."
        },
        {
            title: "Title two of three-column",
            paragraph: "Donec nec est tincidunt, rhoncus nulla sit amet, imperdiet augue. Phasellus sodales placerat ipsum ac auctor. Mauris molestie blandit turpis. Mauris ante tellus, feugiat nec metus non, bibendum semper velit."
        },
        {
            title: "Third Title goes here",
            paragraph: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec est tincidunt, rhoncus nulla sit amet, imperdiet augue."
        }
    ]);

    const Columns = () => columns.map((column, key) => (
        <AboutColumn key={key} title={column.title} paragraph={column.paragraph} />
    ));

    return (
        <>
            <div className="tm-hero d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${bgFegure})`, backgroundAttachment: 'fixed' }}></div>
            <div className="container-fluid tm-mt-60">
                <div className="row mb-4">
                    <h2 className="col-12 tm-text-primary">
                        About Catalog-Z Website Template
                    </h2>
                </div>
                <div className="row tm-mb-74 tm-row-1640">
                    <div className="col-lg-5 col-md-6 col-12 mb-3">
                        <img src={aboutFigure} alt="Image" className="img-fluid" />
                    </div>
                    <div className="col-lg-7 col-md-6 col-12">
                        <div className="tm-about-img-text">
                            <p className="mb-4">
                                You may support TemplateMo website by making <a href="https://paypal.me/templatemo" target="_parent" rel="sponsored">a small contribution</a> via PayPal. This will be helpful for us. We hope you like this Catalog-Z photo / video template for your website. We are making new templates regularly for you. Please come back and visit our <a rel="sponsored" href="https://templatemo.com" target="_parent">TemplateMo website</a> again. </p>
                            <p>
                                Credits go to Pexels and Unsplash for photos and video used in this template. Catalog-Z is free <a rel="sponsored" href="https://v5.getbootstrap.com/">Bootstrap 5</a> Alpha 2 HTML Template designed for video and photo websites.</p>
                            <p>You are <b>allowed</b> to use this template for your commercial or non-commercial websites. You can integrate it with any kind of CMS website. You are <b>NOT allowed</b> to redistribute the downloadable template ZIP file on any template collection website. Please <a rel="nofollow" href="https://templatemo.com/contact" target="_parent">contact us</a> for more information. Thank you.</p>
                        </div>
                    </div>
                </div>
                <div className="row tm-mb-50">
                    <div className="col-md-6 col-12">
                        <div className="tm-about-2-col">
                            <h2 className="tm-text-primary mb-4">
                                Left side of 2-Column content
                            </h2>
                            <p className="mb-4">
                                Pellentesque urna odio, scelerisque eu mauris vitae, vestibulum sodales neque. Ut augue justo, tincidunt nec aliquet ac, cursus vel augue. Suspendisse vel quam imperdiet, sodales tellus sed, ullamcorper lorem.
                            </p>
                            <p>
                                Suspendisse id consequat risus. Aliquam varius posuere nunc, nec imperdiet neque condimentum at. Aenean porta eleifend venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="tm-about-2-col">
                            <h2 className="tm-text-primary mb-4">
                                Right-side Title goes here
                            </h2>
                            <p className="mb-4">
                                Pellentesque urna odio, scelerisque eu mauris vitae, vestibulum sodales neque. Ut augue justo, tincidunt nec aliquet ac, cursus vel augue. Suspendisse vel quam imperdiet, sodales tellus sed, ullamcorper lorem.
                            </p>
                            <p>
                                Suspendisse id consequat risus. Aliquam varius posuere nunc, nec imperdiet neque condimentum at. Aenean porta eleifend venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row tm-mb-50">
                    <Columns />
                </div>
                <div className="text-center mb-2">
                    <a href="false" className="btn btn-primary">Read More</a>
                </div>
            </div>

        </>
    );
}

export default About;