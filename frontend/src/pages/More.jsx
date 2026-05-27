import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import '../styles/more.css';
import { Link } from 'react-router-dom';

const More = () => {
    return (
        <>
            <video autoPlay muted loop playsInline id="bg-video">
                <source src="/assets/bgvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <section className="other" id="other">
                <div data-aos="zoom-out">
                    <h2 className="heading">Coming <span>Soon...</span></h2>
                </div>

                <div className="other-container">
                    <div className="other-box" data-aos="fade-up" data-aos-delay="100"></div>

                    <div className="other-box" data-aos="fade-up" data-aos-delay="200">
                        <img src="/assets/other_2.jpg" alt="" />
                    </div>

                    <div className="other-box" data-aos="fade-up" data-aos-delay="300"></div>
                    <div className="other-box" data-aos="fade-up" data-aos-delay="400"></div>
                </div>
            </section>
        </>
    );
};

export default More;
