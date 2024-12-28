import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserPosts } from '../../api';
import Post from '../post/Post';
import './UserPage.css';

const UserPage = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null); // Reset error on new request
            try {
                const response = await getUserPosts(username);
                setPosts(response);
            } catch (err) {
                setError('Failed to load posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [username]);

    return (
        <div className="user-page-container">
            <header className="user-page-header">
                <h1>{username}'s Posts</h1>
                {error && <p className="error-message">{error}</p>}
                <p className="post-count">{posts.length} Posts</p>
            </header>

            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <div className="posts-list">
                    {posts.length === 0 ? (
                        <p>No posts available.</p>
                    ) : (
                        posts.map((post) => <Post key={post.id} post={post} />)
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPage;
