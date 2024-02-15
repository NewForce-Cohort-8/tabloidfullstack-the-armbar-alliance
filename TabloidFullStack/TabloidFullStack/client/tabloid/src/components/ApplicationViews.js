import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import CategoryList from "./CategoryList";
// import { CommentList } from "./Comment/CommentList.js";
//import { CommentForm } from "./Comment/CommentForm.js";
import PostList from "./PostList";
import TagList from "./tags/TagList";
import { PostDetails } from "./PostDetails";
import { CommentList } from "./Comment/CommentList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
        {/* <Route path = "/commentsbyId/:Id" element={<CommentList/>} /> */}
       {/* <Route path = "/addComment" element = {<CommentForm/>} />  */}
        <Route path="/posts" element={<PostList />}/>
        <Route path="/posts/:id" element={<PostDetails /> } />
        <Route path="/tags" element={<TagList />} />
      </Routes>
   );
 
}