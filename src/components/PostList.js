import React from 'react';

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

export default PostList; 