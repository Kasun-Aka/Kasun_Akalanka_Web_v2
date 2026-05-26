import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import MyProjects from './pages/MyProjects';
import More from './pages/More';
import Login from './pages/Login';
import AdminLayout from './pages/admin/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMessages from './pages/admin/AdminMessages';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/style.css';

const App = () => {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            offset: 80,
            delay: 200,
            duration: 2000,
            easing: 'ease',
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    // Refresh AOS on route change and handle hash scrolling
    useEffect(() => {
        AOS.refresh();
        if (location.hash) {
            setTimeout(() => {
                const element = document.getElementById(location.hash.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0); // Scroll to top if no hash
        }
    }, [location]);

    // Check if the current route should display standard Header and Footer
    const isAuthRoute = location.pathname === '/login';
    const isAdminRoute = location.pathname.startsWith('/admin');
    const hideHeaderFooter = isAuthRoute || isAdminRoute;

    return (
        <>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutme" element={<AboutMe />} />
                <Route path="/myprojects" element={<MyProjects />} />
                <Route path="/more" element={<More />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="messages" element={<AdminMessages />} />
                </Route>
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default App;
