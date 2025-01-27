import React, { useState } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (title, content) => {
    const newPost = { title, content };
    setPosts([...posts, newPost]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Post App</h1>
      </header>
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App; 