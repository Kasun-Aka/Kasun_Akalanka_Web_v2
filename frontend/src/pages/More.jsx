import React from 'react';
import '../styles/more.css';
import { Link } from 'react-router-dom';
import { blogsData } from '../constants/blogsData';

const More = () => {
    return (
        <>
            <video autoPlay muted loop playsInline id="bg-video">
                <source src="/assets/bgvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <section className="blogs" id="blogs" style={{ paddingBottom: '2rem' }}>
                <div data-aos="zoom-out">
                    <h2 className="heading">My <span>Blogs</span></h2>
                </div>

                <div className="blogs-container">
                    {[...blogsData]
                        .sort((a, b) => b.id - a.id)
                        .map((blog, index) => (
                            <Link to={`/blog/${blog.id}`} key={blog.id} style={{ textDecoration: 'none' }} className="blog-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div style={{ background: 'var(--second-bg-color)', borderRadius: '1.5rem', overflow: 'hidden', transition: 'transform 0.3s', cursor: 'pointer', boxShadow: '0 0 10px rgba(0,0,0,0.1)', height: '100%' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                                    <div style={{ padding: '2rem' }}>
                                        <h3 style={{ fontSize: '2rem', color: 'var(--main-color)', marginBottom: '1rem' }}>{blog.title}</h3>
                                        <p style={{ fontSize: '1.4rem', color: 'var(--text-color)', opacity: 0.8 }}>{blog.date}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </section>

        </>
    );
};

export default More;
