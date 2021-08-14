import React from 'react'

export const AboutColumn = ({ title, paragraph }) => {
    return (
        <div className="col-md-4 col-12">
            <div className="tm-about-3-col">
                <div className="tm-about-icon-container mb-5">
                    <i className="fas fa-desktop fa-3x tm-text-primary"></i>
                </div>
                <h2 className="tm-text-primary mb-4">{title}</h2>
                <p className="mb-4">{paragraph}</p>
            </div>
        </div>
    )
}

export default AboutColumn