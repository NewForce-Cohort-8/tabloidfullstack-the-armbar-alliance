import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import CategoryList from "./CategoryList";
import PostList from "./PostList";
import TagList from "./tags/TagList";
import { PostDetails } from "./PostDetails";
import { EditCategory } from "./CategoryEdit";


export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />
        <Route path="/posts" element={<PostList />}/>
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/tags" element={<TagList />} />
        
      </Routes>
   );
 
}