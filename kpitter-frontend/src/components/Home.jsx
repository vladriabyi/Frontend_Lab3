import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    return (
        <div className="home-container">
            <p className="home-description">
                Thank you for visiting our platform. Feel free to browse posts, or log in to create and share your own posts.
            </p>
            
            {!isAuthenticated ? (
                <div className="auth-links">
                    <p><strong>Not logged in?</strong> Please <Link to="/login" className="auth-link">login</Link> or <Link to="/register" className="auth-link">register</Link> to start posting.</p>
                </div>
            ) : (
                <div className="user-links">
                    <p>Welcome back! Go to your <Link to="/profile" className="profile-link">profile</Link> to see your posts and activity.</p>
                    <p><Link to="/posts" className="browse-posts-link">Browse all posts</Link></p>
                </div>
            )}
        </div>
    );
};

export default Home;
