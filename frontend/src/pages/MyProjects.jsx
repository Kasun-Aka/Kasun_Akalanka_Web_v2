import React, { useState, useEffect } from 'react';
import '../styles/myprojects.css';
import { projectsData } from '../constants/projectsData';

const MyProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Modal Image Carousel
    useEffect(() => {
        let interval;
        if (selectedProject && selectedProject.images.length > 1) {
            interval = setInterval(() => {
                setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [selectedProject]);

    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentSlideIndex(0);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        // Restore body scroll
        document.body.style.overflow = 'auto';
    };

    return (
        <div>
            <video autoPlay muted loop playsInline id="bg-video">
                <source src="/assets/bgvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <section className="projects" id="projects">
                <h2 className="heading" data-aos="fade-down">My <span>Projects</span></h2>
                <div className="projects-container">
                    {projectsData.map((project, index) => (
                        <div className="projects-box" key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
                            <img src={project.images[0]} alt={project.title} />
                            <div className="projects-layer">
                                <i className={project.icon}></i>
                                <h3>{project.title}</h3>
                            </div>
                            <div className="btn-layer">
                                <button className="btn read-more-btn" onClick={() => openModal(project)}>Read More</button>
                                <br />
                                {project.links.map((link, idx) => (
                                    <React.Fragment key={idx}>
                                        <a href={link.url} className="btn" target="_blank" rel="noopener noreferrer">{link.text}</a>
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {selectedProject && (
                <div className="project-modal-overlay" onClick={closeModal}>
                    <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={closeModal}><i className='bx bx-x'></i></button>

                        <div className="modal-slideshow">
                            {selectedProject.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${selectedProject.title} slide ${idx + 1}`}
                                    className={`modal-slideimg ${idx === currentSlideIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>

                        <div className="modal-details">
                            <h3>{selectedProject.title}</h3>
                            <p>{selectedProject.description}</p>

                            <div className="modal-links">
                                {selectedProject.links.map((link, idx) => (
                                    <a key={idx} href={link.url} className="btn" target="_blank" rel="noopener noreferrer">{link.text}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProjects;
