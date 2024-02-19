import React, { useState, useEffect } from "react";
import { getAllPosts } from "../Managers/PostManager";
import { Post } from "./Post";
import { PostForm } from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => (allPosts => setPosts(allPosts)); 

  const updatePostsState = () => {
    return getAllPosts()
    .then((postArray) => {
        setPosts(postArray)
    })
  }
  useEffect(() => {
     updatePostsState();
  }, []); 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
        <PostForm updatePostsState = {getPosts}/>
          {posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;