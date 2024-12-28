import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../api';
import Post from './Post';
import './Posts.css';

const Posts = () => {
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllPosts = async () => {
            setIsLoading(true);
            try {
                console.log('Loading posts...');
                const data = await getAllPosts();
                console.log('Posts successfully loaded:', data);
                setPostList(data);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPosts();
    }, []);

    return (
        <div className="posts-container">
            <h2>All Blog Posts</h2>
            {isLoading ? (
                <p>Loading posts, please wait...</p>
            ) : (
                <div className="posts-list">
                    {postList.length > 0 ? (
                        postList.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                    ) : (
                        <p>No posts available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Posts;
