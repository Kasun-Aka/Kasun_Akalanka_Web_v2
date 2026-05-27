import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import '../styles/auth.css';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      // 1. Sign in with Google Popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // 2. Send token to our backend to upsert user and get role
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with server");
      }

      const data = await response.json();

      // 3. Save user info (including role) to localStorage
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.name);

      // 4. Navigate back to home
      navigate("/");
      window.location.reload(); // Quick way to update header state
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <video autoPlay muted loop playsInline id="bg-video">
        <source src="/assets/bgvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-container">
        <div className="login-box" data-aos="zoom-in">
          <Link to="/" className="back-link">
            <i className='bx bx-left-arrow-alt'></i> Back to Home
          </Link>

          <img src="/assets/ghostdevKA.webp" alt="Logo" className="login-logo" />

          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>

          {error && <p className="error-message">{error}</p>}

          <button
            className="btn google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <i className='bx bxl-google'></i>
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
