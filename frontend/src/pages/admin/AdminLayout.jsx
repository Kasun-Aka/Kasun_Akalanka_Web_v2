import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import '../../styles/admin.css';

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-brand">
          <img src="/assets/ghostdevKA.webp" alt="Logo" />
          <h2>Admin Portal</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/users" className={location.pathname.includes('/users') ? 'active' : ''}>
            <i className='bx bx-group'></i> Users
          </Link>
          <Link to="/admin/messages" className={location.pathname.includes('/messages') ? 'active' : ''}>
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
          <h1>{location.pathname.includes('/users') ? 'User Management' : 'Messages'}</h1>
          <div className="admin-user-info">
            <span>Admin Mode</span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet /> {/* Renders the sub-pages like AdminUsers or AdminMessages */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
