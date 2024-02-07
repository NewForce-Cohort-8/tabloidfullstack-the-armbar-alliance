
const baseUrl = "/api/Comment";

export const GetPostcommentsbyId = (postId) => {
    return fetch(`${baseUrl}/GetCommentsByPostId?postId=${postId}`)
    .then((res) => res.json())
};

export const addComment = (singlePost) => { 
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singlePost),
    });
  }; 