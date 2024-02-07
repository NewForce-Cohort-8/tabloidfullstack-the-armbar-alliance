import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import PostList from "./PostList";
import TagList from "./tags/TagList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />}/>
        <Route path="/tags" element={<TagList />} />
      </Routes>
   );
 
}