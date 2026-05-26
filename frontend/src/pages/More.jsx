import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import '../styles/more.css';
import { Link } from 'react-router-dom';

const More = () => {
    const [showBday, setShowBday] = useState(false);
    const allowedUID = "mVdBmZqIfoTfL4EaMHRGcqyupKt1";

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.uid === allowedUID) {
                setShowBday(true);
            } else {
                setShowBday(false);
            }
        });
        return () => unsubscribe();
    }, []);

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
                    <div className="other-box"></div>  

                    <div className="other-box">
                        <img src="/assets/other_2.jpg" alt="" />
                    </div>

                    <div className="other-box"></div> 
                    <div className="other-box"></div> 

                    {showBday && (
                        <div className="other-box" id="bday-secret">
                            <img src="/assets/other_bday.webp" alt="" style={{ opacity: "100%" }} />
                            <div className="other-layer">
                                <h4>Happy Birthday</h4>
                                <p>click the button below</p>
                                <Link to="/birthday"><i className='bx bx-arrow-out-up-right-stroke-square'></i></Link>
                            </div>
                        </div> 
                    )}
                </div>
            </section>
        </>
    );
};

export default More;
