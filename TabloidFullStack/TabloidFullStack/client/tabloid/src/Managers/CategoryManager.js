import React from "react";

const baseUrl = '/api/Categories';

export const getAllCategories = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addCategory = (singleCategory) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleCategory),
  });
};

// //https://localhost:5001/api/Post/search?q=stop&sortDesc=true
// export const SearchPosts = (searchTerm) => {
//     return fetch(`${baseUrl}/search?q=${searchTerm}&sortDesc=true`)
//     .then((res) => res.json())
// }

// //https://localhost:5001/api/Post/GetWithComments
// export const getAllPostsWithComments = () => {
//     return fetch(`${baseUrl}/GetWithComments`)
//     .then((res) => res.json())
// }

// //https://localhost:5001/api/Post/1/PostWithComments
// export const getPostByIdWithComments = (id) => {
//     return fetch(`${baseUrl}/${id}/PostWithComments`)
//     .then((res) => res.json())
// }