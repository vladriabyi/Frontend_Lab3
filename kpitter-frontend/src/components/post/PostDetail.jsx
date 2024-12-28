import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../api';
import './PostDetail.css';

const PostDetail = () => {
    const { username, postId } = useParams();
    const [postData, setPostData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const data = await getPost(username, postId);
                setPostData(data);
            } catch (err) {
                console.error('Failed to fetch post:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostData();
    }, [username, postId]);

    if (isLoading) {
        return <div>Loading post details...</div>;
    }

    if (!postData) {
        return <div>Sorry, we couldn't find the post you're looking for.</div>;
    }

    return (
        <div className="post-detail-container">
            <h2>{postData.author.username}'s Post</h2>
            <p>{postData.content}</p>
            <div className="likes-section">
                <span>{postData.likes} likes</span>
            </div>
        </div>
    );
};

export default PostDetail;
