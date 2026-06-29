import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setUserRole(localStorage.getItem('userRole'));
                const fullName = localStorage.getItem('userName') || currentUser.displayName || "";
                setUserName(fullName.split(' ')[0]);
            } else {
                setUserRole(null);
                setUserName(null);
                localStorage.removeItem('userRole');
                localStorage.removeItem('userName');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            window.location.reload();
        } catch (error) {
            console.error("Error logging out", error);
        }
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();

    // Setup Theme from LocalStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkTheme(false);
            document.body.classList.add('light-theme');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle scroll for sticky header and scroll spy
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);

            // Close menu on scroll
            setIsMenuOpen(false);

            // Active link scroll spy logic
            if (location.pathname === '/') {
                const sections = document.querySelectorAll('section');
                let current = '';

                sections.forEach(sec => {
                    const top = window.scrollY;
                    const offset = sec.offsetTop - 150;
                    const height = sec.offsetHeight;
                    const id = sec.getAttribute('id');

                    if (top >= offset && top < offset + height) {
                        current = id;
                    }
                });

                // Default to home if at very top or no section found
                if (!current && window.scrollY < 100) {
                    current = 'home';
                }

                setActiveSection(current);
            } else {
                setActiveSection('');
            }
        };



        window.addEventListener('scroll', handleScroll);
        // Call once to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Extracted nav links to reuse in desktop and mobile navs
    const navLinks = (
        <>
            {location.pathname === '/' ? (
                <>
                    <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="#about" className={activeSection === 'about' || activeSection === 'skills' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About Me</a>
                    <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact Me</a>
                </>
            ) : (
                <>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/#about" className={location.pathname === '/aboutme' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About Me</Link>
                    <Link to="/#contact" onClick={() => setIsMenuOpen(false)}>Contact Me</Link>
                </>
            )}
            <Link to="/myprojects" className={location.pathname === '/myprojects' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>My Projects</Link>
            <Link to="/more" className={location.pathname === '/more' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>More</Link>
            {userRole === 'admin' && (
                <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''} onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--main-color-darken)' }}>Admin Portal</Link>
            )}
        </>
    );

    return (
        <>
            <header className={`header ${isSticky ? 'sticky' : ''}`}>
                <Link to="/">
                    <img src="/assets/ghostdevKA.webp" alt="GhostDevKA" />
                </Link>

                <div className="navhead">
                    <nav className="navbar desktop-nav">
                        {navLinks}
                    </nav>

                    <i
                        className={`bx ${isDarkTheme ? 'bx-moon' : 'bx-sun'}`}
                        id="theme-toggle"
                        onClick={toggleTheme}
                    ></i>

                    {user ? (
                        <div className="user-menu" style={{ display: 'flex', alignItems: 'center', borderRadius: '4rem', backgroundColor: 'rgba(77, 181, 250, 0.43)', padding: '0 0 0 2rem', marginLeft: '2.5rem', gap: '1rem' }}>
                            <span style={{ color: 'var(--header-tx)', fontSize: '1.5rem', fontWeight: 'bold' }}>{userName}</span>
                            <button onClick={handleLogout} className="btn" style={{ padding: '0.8rem 1.5rem', marginLeft: '0' }}>Sign Out</button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn">Sign in</Link>
                    )}

                    <i
                        className={`bx ${isMenuOpen ? 'bx-x-circle' : 'bx-menu-wide'}`}
                        id="menu-icon"
                        onClick={toggleMenu}
                    ></i>
                </div>
            </header>

            {/* Mobile menu rendered outside header to allow proper backdrop-filter rendering */}
            <nav className={`navbar mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                {navLinks}
            </nav>
        </>
    );
};

export default Header;
