import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import axios from 'axios';
import { auth } from '../firebase';

const Home = () => {
    const typed1Ref = useRef(null);
    const typed2Ref = useRef(null);
    const typed3Ref = useRef(null);

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        // Initialize Typed.js
        const typed1 = new Typed('.multiple-text1', {
            strings: [
                'Software Engineering Undergrad.',
                'Full Stack Developer',
                'Problem Solver',
                'AI Enthusiast',
                'Tech Savvy'
            ],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        const typed2 = new Typed('.multiple-text2', {
            strings: ['Me', 'Kasun'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        const typed3 = new Typed('.multiple-text3', {
            strings: ['Me', 'Kasun'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed1.destroy();
            typed2.destroy();
            typed3.destroy();
        };
    }, []);

    // Autofill contact form if logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const userInfo = res.data;
                    setContactForm(prev => ({
                        ...prev,
                        name: userInfo.name || '',
                        email: userInfo.email || ''
                    }));
                } catch (err) {
                    console.log("Autofill failed:", err.message);
                }
            } else {
                setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
            }
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/messages`, contactForm);
            alert("Message sent successfully!");
            setContactForm({
                name: '', email: '', phone: '', subject: '', message: ''
            });
        } catch (err) {
            alert("Message failed: " + err.message);
            console.log("❌ Error submitting message:", err.message);
        }
    };

    const handleCvDownload = async () => {
        const user = auth.currentUser;
        if (!user) {
            alert("Please login first to download the CV.");
            return;
        }

        try {
            const idToken = await user.getIdToken();
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/download-cv/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to download CV.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Kasun_Akalanka_CV.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Download failed: " + error.message);
        }
    };

    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLocked(!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <video autoPlay muted loop playsInline id="bg-video">
                <source src="/assets/bgvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* home section design */}
            <section className="home" id="home">
                <div className="home-content">
                    <div data-aos="fade-down">
                        <h3>Hello it's me</h3>

                        <div className="matrix-container">
                            <h1 className="matrix-text">
                                <span className="glitch-layer" aria-hidden="true">Kasun Akalanka</span>
                                Kasun Akalanka
                            </h1>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="250">
                        <h2>aka <span className="ghostdevka">GhostDevKA</span></h2>
                    </div>
                    <div data-aos="fade-right" data-aos-delay="750">
                        <h3>And I'm a &nbsp;<span className="multiple-text1"></span></h3>
                        <p>
                            Welcome to my personal portfolio — take a look around.
                            <br />
                            <br />Get to know me, explore my projects, connect with me on social media,
                            <br />and feel free to leave your feedback.
                        </p>
                        <div className="social-media">
                            <a href="https://www.facebook.com/upekkasun.akalanka" target="_blank" rel="noopener noreferrer"><i className="bxl bx-facebook-circle" ></i></a>
                            <a href="https://www.instagram.com/_.kasun_aka._" target="_blank" rel="noopener noreferrer"><i className='bxl bx-instagram'></i></a>
                            <a href="https://www.linkedin.com/in/kasun-akalanka03" target="_blank" rel="noopener noreferrer"><i className='bxl bx-linkedin'></i></a>
                            <a href="https://x.com/_Kasun_Aka_" target="_blank" rel="noopener noreferrer"><i className='bxl bx-twitter-x'></i></a>
                            <a href="https://github.com/Kasun-Aka" target="_blank" rel="noopener noreferrer"><i className='bxl bx-github'></i></a>
                        </div>
                        <div className="cvbtn">
                            <button className="btn" id="downloadCvBtn" onClick={handleCvDownload}>
                                Download CV &nbsp;<i className={`bx ${isLocked ? 'bx-lock-keyhole' : 'bx-lock-keyhole-open-alt'}`} id="lock-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="home-img">
                    <div data-aos="fade-left" data-aos-delay="500">
                        <img src="/assets/home.webp" alt="" loading="lazy" />
                    </div>
                </div>
            </section>

            {/* about section design */}
            <section className="about" id="about">
                <div className="about-img">
                    <div data-aos="fade-up-right" data-aos-delay="250">
                        <img src="/assets/about.webp" alt="" loading="lazy" />
                    </div>
                </div>

                <div className="about-content">
                    <div data-aos="fade-down-right">
                        <h2 className="heading">About <span className="multiple-text2"></span></h2>
                    </div>
                    <div data-aos="fade-down-left" data-aos-delay="500">
                        <h3>Software Engineering Undergraduate</h3>
                        <p>
                            I'm currently pursuing a BSc (Hons) in Information Technology at SLIIT,
                            <br />specializing in Software Engineering with hands-on experience in
                            <br />full-stack web and mobile development. I'm passionate about building
                            <br />real-world solutions and continuously growing as a software engineer.
                        </p>
                        <a href="/aboutme" className="btn">Read More...</a>
                    </div>

                    <div data-aos="fade-up-left" data-aos-delay="750">
                        <div className="skills">
                            <div className="skill-head">
                                <h3 className="myskills">Skills & Experience&nbsp;&nbsp;&nbsp;</h3>
                                <h4>Growing steadily, one line of code at a time..</h4>
                            </div>

                            <div className="skills-row">
                                <div className="java">
                                    <i className='bxl bx-java'></i>
                                    <span>Java & Object-Oriented Programming & Data Structures</span>
                                </div>
                                <div className="backend">
                                    <i className='bxl bx-spring-boot'></i>
                                    <i className='bxl bx-nodejs'></i>
                                    <i className='bxl bx-nest-js'></i>
                                    <span>Backend Development (Spring Boot, Node.js, NestJS)</span>
                                </div>
                                <div className="frontend">
                                    <i className='bxl bx-javascript'></i>
                                    <i className='bxl bx-typescript'></i>
                                    <i className='bxl bx-css3'></i>
                                    <i className='bxl bx-html5'></i>
                                    <span>Frontend Development (HTML, CSS, JavaScript, TypeScript)</span>
                                </div>
                                <div className="react">
                                    <i className='bxl bx-react'></i>
                                    <i className="bxl bx-next-js"></i>
                                    <i className="bxl bx-vite-js"></i>
                                    <i className="bxl bx-tailwind-css"></i>
                                    <span>React & Next.js with Tailwind CSS</span>
                                </div>
                            </div>

                            <div className="skills-row">
                                <div className="reactnative">
                                    <i className="bxl bx-react"></i>
                                    <i className="bxl bx-expo"></i>
                                    <span>React Native with Expo</span>
                                </div>
                                <div className="databases">
                                    <i className='bxl bx-my-sql'></i>
                                    <i className='bxl bx-mongodb'></i>
                                    <span>Databases (MS SQL Server, MySQL, MongoDB, Supabase)</span>
                                </div>
                                <div className="devops">
                                    <i className='bxl bx-docker'></i>
                                    <i className='bxl bx-git'></i>
                                    <i className="bxf bx-cloud"></i>
                                    <span>DevOps & Cloud (Docker, Git, Netlify, Railway, Vercel)</span>
                                </div>
                                <div className="python">
                                    <i className='bxl bx-python'></i>
                                    <span>Python for Scripting & Machine Learning Fundamentals</span>
                                </div>
                            </div>

                            <div className="skills-row">
                                <div className="Clang">
                                    <i className='bxl bx-c'></i>
                                    <span>C Programming Fundamentals</span>
                                </div>
                                <div className="tools">
                                    <i className='bxl bx-github'></i>
                                    <i className='bxl bx-firebase'></i>
                                    <i className='bxl bx-tux'></i>
                                    <span>Tools (GitHub, Postman, Firebase, Linux)</span>
                                </div>
                                <div className="scratch">
                                    <i className='bx bx-cat'></i>
                                    <span>Game Logic & Problem Solving (2D Projects)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* contact section design */}
            <section className="contact" id="contact">
                <div data-aos="fade-down">
                    <h2 className="heading">Contact <span className="multiple-text3"></span></h2>
                </div>

                <form id="contactForm" onSubmit={handleContactSubmit}>
                    <div data-aos="fade-up">
                        <div className="input-box">
                            <input type="text" placeholder="Full Name" id="name" value={contactForm.name} onChange={handleInputChange} />
                            <input type="email" placeholder="Email Address" id="email" value={contactForm.email} onChange={handleInputChange} />
                        </div>
                        <div className="input-box">
                            <input type="number" placeholder="Mobile Number" id="phone" value={contactForm.phone} onChange={handleInputChange} />
                            <input type="text" placeholder="Email Subject" id="subject" value={contactForm.subject} onChange={handleInputChange} />
                        </div>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Your Message" value={contactForm.message} onChange={handleInputChange}></textarea>
                    </div>
                    <div data-aos="flip-up" data-aos-delay="400">
                        <input type="submit" value="Send" className="btn" id="submit" />
                    </div>
                </form>
            </section>
        </>
    );
};

export default Home;
