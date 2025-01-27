import React, { useState } from 'react';

function PostForm({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && category && description) {
      addPost({ title, content, category, description });
      setTitle('');
      setContent('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm; 