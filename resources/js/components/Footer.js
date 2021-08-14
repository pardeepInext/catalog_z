import React, { useState } from 'react';

const Footer = () => {
    let date = new Date();
    const [year] = useState(date.getFullYear());
    const [ourLinks] = useState(['Advertise', 'Support', 'Our Company', 'Contact']);
    const [socialLinks] = useState([
        {
            link: 'https://facebook.com',
            class: 'fa-facebook'
        },
        {
            link: 'https://twitter.com',
            class: 'fa-twitter'
        },
        {
            link: 'https://instagram.com',
            class: 'fa-instagram'
        },
        {
            link: 'https://pinterest.com',
            class: 'fa-pinterest'
        },
    ]);

    const OurLink = () => (ourLinks.map((link, key) => <li key={key}><a href="false">{link}</a></li>));
    const SocialLink = () => socialLinks.map((socialLink, key) => (<li className="mb-2" key={key}><a href={socialLink.link}><i className={`fab ${socialLink.class}`}></i></a></li>))
    return (
        <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
            <div className="container-fluid tm-container-small">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
                        <h3 className="tm-text-primary mb-4 tm-footer-title">About Catalog-Z</h3>
                        <p>Catalog-Z is free <a rel="sponsored" href="https://v5.getbootstrap.com/">Bootstrap 5</a> Alpha 2 HTML Template for video and photo websites. You can freely use this TemplateMo layout for a front-end integration with any kind of CMS website.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
                        <h3 className="tm-text-primary mb-4 tm-footer-title">Our Links</h3>
                        <ul className="tm-footer-links pl-0">
                            <OurLink />
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
                        <ul className="tm-social-links d-flex justify-content-end pl-0 mb-5">
                            <SocialLink />
                        </ul>
                        <a href="false" className="tm-text-gray text-right d-block mb-2">Terms of Use</a>
                        <a href="false" className="tm-text-gray text-right d-block">Privacy Policy</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-7 col-12 px-5 mb-3">
                        Copyright {year} Catalog-Z Company. All rights reserved.
                </div>
                    <div className="col-lg-4 col-md-5 col-12 px-5 text-right">
                        Designed by <a href="https://templatemo.com" className="tm-text-gray" rel="sponsored" target="_parent">TemplateMo</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;