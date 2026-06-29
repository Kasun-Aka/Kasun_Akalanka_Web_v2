import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import '../styles/aboutme.css';

const AboutMe = () => {
    useEffect(() => {
        const typed1 = new Typed('.multiple-text1', {
            strings: ['Me', 'Kasun Akalanka'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed1.destroy();
        };
    }, []);

    return (
        <>
            <video autoPlay muted loop playsInline id="bg-video">
                <source src="/assets/bgvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <section className="aboutme" id="aboutme">
                <div className="heading" data-aos="fade-down">
                    <h2><span>More</span> About <span className="multiple-text1"></span></h2>
                </div>
                <div className="aboutme-container">

                    <div className="aboutme-imgbox" data-aos="zoom-in" data-aos-delay="200">
                        <img
                            src="/assets/about.webp"
                            alt="About Me"
                        />
                    </div>

                    <div className="aboutme-text">
                        <div data-aos="fade-left">
                            <p>
                                Ever since I was a kid, I've been fascinated by technology, always curious
                                to understand how things work and recreate them myself. That early spark
                                eventually led me to the world of coding, where I discovered the joy of
                                turning ideas into real-world solutions.
                            </p>
                            <p>
                                Currently, I'm pursuing a BSc (Hons) in Information Technology at SLIIT,
                                specializing in Software Engineering. From building backend APIs and
                                full-stack web apps to developing mobile applications and exploring
                                machine learning, I thrive on challenges and never stop exploring. Outside
                                of coursework, I'm also a member of the MS Club at SLIIT. I am actively
                                contributing to the MS Club Development Team and collaborating within the
                                official MS Club GitHub organization.
                            </p>
                            <p>
                                Outside of tech, I'm a motorsport enthusiast — especially Formula 1 —
                                and a huge fan of immersive single-player story-driven games. I also enjoy
                                listening to music, watching movies and TV series, gaming, and tinkering
                                with new tech. Off-screen, I find balance through reading novels.
                            </p>
                            <p>
                                I completed my secondary education at Ananda College, where I proudly
                                served as the Chief Organizer of the Traffic Warden Unit. During my time
                                there, I took part in both badminton and swimming, and I'm a confident
                                swimmer to this day.
                            </p>
                            <p>
                                My ambition is to grow as a versatile software engineer who creates
                                meaningful and elegant innovations that improve lives — and maybe inspire
                                a few dreamers along the way.
                            </p>

                            <Link to="/#about" className="btn">Back</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutMe;
