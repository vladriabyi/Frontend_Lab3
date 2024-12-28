import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ onLogout }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        onLogout();
        navigate('/');
    };

    if (!username) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="profile-wrapper">
            <header className="profile-header">
                <h1 className="profile-greeting">Hello, {username}!</h1>
                <p className="profile-tagline">Manage your account, posts, and more.</p>
            </header>
            <section className="profile-actions">
                <div className="action-item">
                    <Link to="/create-post" className="profile-btn">Create a New Post</Link>
                </div>
                <div className="action-item">
                    <Link to={`/users/${username}/posts`} className="profile-btn">My Posts</Link>
                </div>
                <div className="action-item">
                    <button onClick={handleLogout} className="logout-btn">Log Out</button>
                </div>
            </section>
        </div>
    );
};

export default Profile;
