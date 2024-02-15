import { useEffect, useState } from "react";
import { GetPostcommentsbyId } from "../../Managers/CommentManager.js";
// import { Comment } from "./Comment.js"; 

export const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);

  

  //   const Getcomments = (postId) => {
  //     GetPostcommentsbyId(postId).then((response) => {
  //       //   console.log(response, "response from fetch")
  //       // const allComments = response.data.comments;
  //          setComments(response);
  //   })
  // }

  const parsedPostId = parseInt(postId)


    useEffect(() => {
      GetPostcommentsbyId(parsedPostId)
      .then((commentArray) => {
        setComments(commentArray)
      });
    }, []);
  
console.log(comments)
 
    return (<>
        <div className="comment-list">
          <div className="row justify-content-center">
            <div className="cards-column">
                {comments?.map((singleComment) => {
                 return <>  <h1>Comments:</h1>
                          <h2>Username: {singleComment.userProfile.displayName}</h2>
                          <h2>Subject: {singleComment.subject}</h2>
                           <h2>Content: {singleComment.content}</h2>
                           <h3>Posted on: {singleComment.createDateTime}</h3>
                           
                

                  </>
                  })}
            
            </div>
          </div>
        </div>
      
      </>
      )
  }