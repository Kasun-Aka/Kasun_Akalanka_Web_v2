import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import axios from 'axios';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import SkillItem from '../components/SkillItem';

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

        const typed4 = new Typed('.multiple-text4', {
            strings: ['Me', 'Kasun'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        return () => {
            typed1.destroy();
            typed2.destroy();
            typed4.destroy();
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
                <div className="about-img desktop-img">
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
                        <Link to="/aboutme" className="btn">Read More...</Link>
                    </div>

                    <div className="about-img mobile-img" style={{ display: 'none' }}>
                        <div data-aos="zoom-in">
                            <img src="/assets/about.webp" alt="" loading="lazy" style={{ width: '70vw', filter: 'drop-shadow(0 0 10px var(--main-color))', animation: 'dropPulse 2s infinite' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* New Skills Section */}
            <section className="skills-section" id="skills">
                <div data-aos="fade-down">
                    <h2 className="heading">Skills & <span>Experience</span></h2>
                    <p style={{ textAlign: 'center', fontSize: '1.6rem', margin: '2rem 0', opacity: 0.8 }}>
                        Growing steadily, one line of code at a time..
                    </p>
                </div>

                <div className="skills-list" data-aos="fade-up">
                    <SkillItem
                        icons={['bxl bx-java']}
                        title="Java & OOP"
                        percentage={70}
                    />
                    <SkillItem
                        icons={['bxl bx-spring-boot', 'bxl bx-nodejs', 'bxl bx-nest-js']}
                        title="Backend (Node, Spring, Nest)"
                        percentage={75}
                    />
                    <SkillItem
                        icons={['bxl bx-javascript', 'bxl bx-typescript', 'bxl bx-css3', 'bxl bx-html5']}
                        title="Frontend (HTML/JS/TS/CSS)"
                        percentage={80}
                    />
                    <SkillItem
                        icons={['bxl bx-react', 'bxl bx-next-js', 'bxl bx-vite-js', 'bxl bx-tailwind-css']}
                        title="React & Next.js"
                        percentage={75}
                    />
                    <SkillItem
                        icons={['bxl bx-react', 'bxl bx-expo']}
                        title="React Native"
                        percentage={65}
                    />
                    <SkillItem
                        icons={['bxl bx-my-sql', 'bxl bx-mongodb']}
                        title="Databases (SQL/NoSQL)"
                        percentage={70}
                    />
                    <SkillItem
                        icons={['bxl bx-docker', 'bxl bx-git', 'bxf bx-cloud']}
                        title="DevOps & Cloud"
                        percentage={60}
                    />
                    <SkillItem
                        icons={['bxl bx-python']}
                        title="Python (ML Basics)"
                        percentage={50}
                    />
                    <SkillItem
                        icons={['bxl bx-c']}
                        title="C Programming"
                        percentage={50}
                    />
                    <SkillItem
                        icons={['bxl bx-github', 'bxl bx-firebase', 'bxl bx-tux']}
                        title="Tools (GitHub, Firebase, Linux)"
                        percentage={80}
                    />
                    <SkillItem
                        icons={['bx bx-cat']}
                        title="Problem Solving"
                        percentage={85}
                    />
                </div>
            </section>

            {/* contact section design */}
            <section className="contact" id="contact">
                <div data-aos="fade-down">
                    <h2 className="heading">Contact <span className="multiple-text4"></span></h2>
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
