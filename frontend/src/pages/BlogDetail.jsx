import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogsData } from '../constants/blogsData';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogsData.find(b => b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return (
            <section className="other" style={{ textAlign: 'center', paddingTop: '150px' }}>
                <h2 className="heading">Blog Not <span>Found</span></h2>
                <Link to="/more" className="btn" style={{ marginTop: '20px' }}>Go Back</Link>
            </section>
        );
    }

    return (
        <section className="blog-detail" style={{ paddingTop: '120px', minHeight: '100vh', padding: '120px 5% 50px' }}>
            <button className="btn" onClick={() => navigate(-1)} style={{ marginBottom: '30px' }}>
                <i className='bx bx-arrow-back'></i> Back
            </button>
            <div style={{ background: 'var(--dark-transparent-bg)', borderRadius: '20px', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
                <h1 style={{ fontSize: '4rem', color: 'var(--main-color)', marginBottom: '15px' }}>{blog.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <img src={blog.profile_pic} alt={blog.author} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                        <h4 style={{ fontSize: '1.8rem' }}>{blog.author}</h4>
                        <p style={{ fontSize: '1.4rem', opacity: 0.8 }}>{blog.author_details}</p>
                        <p style={{ fontSize: '1.2rem', color: 'var(--main-color)' }}>{blog.date}</p>
                    </div>
                </div>

                {blog.image && (
                    <img src={blog.image} alt="Blog Cover" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '15px', marginBottom: '30px' }} />
                )}

                <div style={{ fontSize: '1.8rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                    {blog.description}
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;
