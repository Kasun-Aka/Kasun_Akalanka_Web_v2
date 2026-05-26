import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="footer">
            <div className="footer-text">
                <p>Copyright &copy; <span id="year">{year}</span> GhostDevKA | All Rights Reserved.</p>
            </div>

            <div className="footer-iconTop">
                <a href="#home"><i className='bx bx-arrow-big-up-line'></i></a>
            </div>
        </footer> 
    );
};

export default Footer;
