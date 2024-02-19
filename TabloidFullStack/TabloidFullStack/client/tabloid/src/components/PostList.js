import React, { useState, useEffect } from "react";
import { getAllPosts, deletePost} from "../Managers/PostManager";
import { Post } from "./Post";
import { PostForm } from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => (allPosts => setPosts(allPosts)); 

  const handleDelete = (id) => { 
    const confirmDelete = window.confirm("Are you sure you would like to delete this post?");
    if (confirmDelete) {
        // if Bad Request window.alert this post has dependencies it would go here...
      deletePost(id).then(() => { 
        updatePostsState();
      });
    }
  };

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
            <Post key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;