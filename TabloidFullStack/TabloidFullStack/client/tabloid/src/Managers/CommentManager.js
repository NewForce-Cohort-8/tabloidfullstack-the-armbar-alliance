
const baseUrl = "/api/Comment";


// https://localhost:5001/api/Comment/GetCommentsByPostId?postId=1

export const GetPostcommentsbyId = (postId) => {
    return fetch(`${baseUrl}/GetCommentsByPostId?postId=${postId}`)
    .then((res) => res.json())
};

// export const addComment = (singlePost) => { 
//     return fetch(baseUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(singlePost),
//     });
//   }; 