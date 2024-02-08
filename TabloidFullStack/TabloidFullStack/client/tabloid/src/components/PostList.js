import React, { useState, useEffect } from "react";
import { getAllPosts } from "../Managers/PostManager";
import { Post } from "./Post";
// import { PostForm } from "./PostForm";
// import { PostSearch } from "./PostSearch";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // const getPosts = () => getAllPostsWithComments().then(allPosts => setPosts(allPosts)); 
  // ;

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
        {/* <PostForm updatePostsState = {getPosts}/>
        <PostSearch /> */}
          {posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;