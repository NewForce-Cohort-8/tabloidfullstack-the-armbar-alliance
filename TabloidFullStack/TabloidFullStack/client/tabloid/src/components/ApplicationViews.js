import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CommentList } from "./Comment/CommentList.js";
// import { CommentForm } from "./Comment/CommentForm.js";
export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path = "/commentsbyId" element={<CommentList/>} />
        {/* <Route path = "/addComment" element = {<CommentForm/>} /> */}
      </Routes>
   );
 
}