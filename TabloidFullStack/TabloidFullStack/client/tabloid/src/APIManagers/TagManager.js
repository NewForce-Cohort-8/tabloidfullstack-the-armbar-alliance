import React from "react";

const baseUrl = '/api/tag';

export const getAllTags = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};


// I got ahead of myself, but almost ready for next ticket:

// export const addTag = (singleTag) => { 
//   return fetch(baseUrl, {
//     method: "TAG",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(singleTag),
//   });
// };