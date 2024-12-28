import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../api';
import './Posts.css';

const Post = ({ post }) => {
    const [liked, setLiked] = useState(post.is_liked);
    const [likes, setLikes] = useState(post.likes);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const toggleLike = async () => {
        const username = post.author.username;
        const postId = post.id;

        setLoading(true);
        try {
            if (liked) {
                await unlikePost(username, postId);
                setLiked(false);
                setLikes((prevLikes) => prevLikes - 1);
                setMessage('Post unliked successfully!');
            } else {
                await likePost(username, postId);
                setLiked(true);
                setLikes((prevLikes) => prevLikes + 1);
                setMessage('Post liked successfully!');
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            setMessage('Error toggling like');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-card">
            <h3>
                <Link to={`/users/${post.author.username}/posts`} className="post-link">
                    {post.author.username}
                </Link>
            </h3>
            <p className="author">
                By <Link to={`/users/${post.author.username}`}>{post.author.username}</Link>
            </p>
            <p>{post.content}</p>
            <p className="likes">Likes: {likes}</p>
            <button onClick={toggleLike} disabled={loading}>
                {loading ? 'Processing...' : liked ? 'Unlike' : 'Like'}
            </button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Post;
