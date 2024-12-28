import React, { useState } from 'react';
import { likePost, unlikePost } from '../../api';

const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [totalLikes, setTotalLikes] = useState(post.likes);

    const handleLikeToggle = async () => {
        const { username } = post.author;
        const { id: postId } = post;

        try {
            if (isLiked) {
                await unlikePost(username, postId);
                setIsLiked(false);
                setTotalLikes((prevLikes) => prevLikes - 1);
            } else {
                await likePost(username, postId);
                setIsLiked(true);
                setTotalLikes((prevLikes) => prevLikes + 1);
            }
        } catch (err) {
            console.error('Failed to toggle like:', err);
        }
    };

    return (
        <article className="post-item">
            <header>
                <h3>{post.author.username}</h3>
            </header>
            <section>
                <p>{post.content}</p>
            </section>
            <footer>
                <p>Likes: {totalLikes}</p>
                <button onClick={handleLikeToggle}>
                    {isLiked ? 'Unlike' : 'Like'}
                </button>
            </footer>
        </article>
    );
};

export default PostItem;
