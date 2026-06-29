import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

const AdminDashboard = () => {
    const [downloads, setDownloads] = useState([]);
    const [stats, setStats] = useState({ totalDownloads: 0, uniqueUsers: 0 });
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/cv-downloads`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDownloads(res.data.downloads);
            setStats({
                totalDownloads: res.data.totalDownloads,
                uniqueUsers: res.data.uniqueUsers
            });
        } catch (error) {
            console.error("Error fetching CV stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadStatus('Please select a file first.');
            return;
        }

        setUploading(true);
        setUploadStatus('');

        const formData = new FormData();
        formData.append('cv', file);

        try {
            const token = await auth.currentUser?.getIdToken();
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/admin/cv-file`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus(res.data.message || 'File uploaded successfully!');
            setFile(null); // Reset input
        } catch (error) {
            console.error("Error uploading CV:", error);
            setUploadStatus(error.response?.data?.message || 'Error uploading file.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div className="admin-card">
                    <h2>Total CV Downloads</h2>
                    <p style={{ fontSize: '3rem', color: 'var(--main-color)', fontWeight: 'bold' }}>{stats.totalDownloads}</p>
                </div>
                <div className="admin-card">
                    <h2>Unique Downloaders</h2>
                    <p style={{ fontSize: '3rem', color: 'var(--main-color)', fontWeight: 'bold' }}>{stats.uniqueUsers}</p>
                </div>
                
                <div className="admin-card">
                    <h2>Update CV File</h2>
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={handleFileChange}
                            style={{ padding: '1rem', background: 'var(--bg-color)', color: 'var(--text-color)', borderRadius: '5px' }}
                        />
                        <button type="submit" className="btn" disabled={uploading} style={{ padding: '1rem', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                            {uploading ? 'Uploading...' : 'Upload New CV (K-CV.pdf)'}
                        </button>
                        {uploadStatus && <p style={{ fontSize: '1.4rem', marginTop: '1rem', color: uploadStatus.includes('Error') ? '#ff4d4d' : '#2ecc71' }}>{uploadStatus}</p>}
                    </form>
                </div>
            </div>

            <div className="admin-card">
                <h2>Recent Download History</h2>
                <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {downloads.length > 0 ? (
                                downloads.map(download => (
                                    <tr key={download._id}>
                                        <td>{download.email}</td>
                                        <td>{download.name}</td>
                                        <td>{new Date(download.downloadedAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>No downloads recorded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
