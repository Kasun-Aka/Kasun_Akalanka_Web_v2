import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import '../../styles/admin.css';

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const role = localStorage.getItem('userRole');
      if (user && role === 'admin') {
        setIsAdmin(true);
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="admin-loading">Loading Admin Portal...</div>;
  if (!isAdmin) return null;

  const getPageTitle = () => {
    if (location.pathname.includes('/users')) return 'User Management';
    if (location.pathname.includes('/messages')) return 'Messages';
    return 'Dashboard';
  };

  return (
    <div className="admin-container">
      {/* Mobile hamburger */}
      <button className="admin-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <i className={sidebarOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <img src="/assets/ghostdevKA.webp" alt="Logo" />
          <h2>Admin Portal</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''} onClick={() => setSidebarOpen(false)}>
            <i className='bx bx-tachometer'></i> Dashboard
          </Link>
          <Link to="/admin/users" className={location.pathname.includes('/users') ? 'active' : ''} onClick={() => setSidebarOpen(false)}>
            <i className='bx bx-group'></i> Users
          </Link>
          <Link to="/admin/messages" className={location.pathname.includes('/messages') ? 'active' : ''} onClick={() => setSidebarOpen(false)}>
            <i className='bx bx-envelope'></i> Messages
          </Link>
        </nav>
        <div className="admin-bottom-nav">
          <Link to="/" className="back-home-btn">
            <i className='bx bx-arrow-back'></i> Back to Site
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
          <h1>{getPageTitle()}</h1>
          <div className="admin-user-info">
            <span>Admin Mode</span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
