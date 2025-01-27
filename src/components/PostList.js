import React from 'react';
import PropTypes from 'prop-types';

function PostList({ posts }) {
  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <p><strong>Category:</strong> {post.category}</p>
              <p><strong>Description:</strong> {post.description}</p>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostList; 