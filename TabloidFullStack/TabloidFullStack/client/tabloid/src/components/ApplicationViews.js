import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CommentList } from "./Comment/CommentList.js";
// import { CommentForm } from "./Comment/CommentForm.js";
import PostList from "./PostList";
import TagList from "./tags/TagList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path = "/commentsbyId" element={<CommentList/>} />
        {/* <Route path = "/addComment" element = {<CommentForm/>} /> */}
        <Route path="/posts" element={<PostList />}/>
        <Route path="/tags" element={<TagList />} />
      </Routes>
   );
 
}