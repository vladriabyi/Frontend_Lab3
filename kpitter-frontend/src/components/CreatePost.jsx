import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();
    const user = localStorage.getItem('username');

    if (!user) {
        navigate('/login');
        return null;
    }

    const handlePostSubmit = async (event) => {
        event.preventDefault();

        if (!postContent.trim()) {
            setStatusMessage('Please provide content for the post.');
            return;
        }

        setIsSubmitting(true);

        try {
            await createPost(user, { content: postContent });
            setStatusMessage('Your post has been published successfully!');
            setPostContent(''); // Clear the textarea
            navigate(`/users/${user}/posts`);
        } catch (error) {
            setStatusMessage('Oops! Something went wrong. Please try again later.');
            console.error('Post creation error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handlePostSubmit} className="create-post-form">
                <div className="input-group">
                    <label htmlFor="content">Post Content</label>
                    <textarea
                        id="content"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Write something..."
                        rows="5"
                        required
                    />
                </div>
                {statusMessage && <div className="status-message">{statusMessage}</div>}
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
