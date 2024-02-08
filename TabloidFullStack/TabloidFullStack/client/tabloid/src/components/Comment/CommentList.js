import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Comment } from "./Comment";
import { useParams } from "react-router-dom";
import { GetPostcommentsbyId } from "../../Managers/CommentManager.js";

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    const getcomments = () => {
        GetPostcommentsbyId(1).then((allComments) => setComments(allComments));
    };

    useEffect(() => {
        getcomments();
    }, [postId]);


    return (<>
        <div className="comment-list">
          <div className="row justify-content-center">
            <div className="cards-column">
              <Table> 
              <thead>
                <tr>
                  {/*
                   <th>Content</th>
                  <th>Subject</th>
                  <th>Author</th>
                  <th>Creation Date</th> */}
                </tr>
              </thead>
                {comments.map((comment) => {
                   return <Comment key={comment.id} comment={comment} />
                })}
              </Table>
            </div>
          </div>
          {/* 2 buttons to post details - boolean with true false conditions honey rae */}
          
        </div>
      
      </>
      )
  }

//   return (
//     <>
//       {tabloidUserObject.postId ? (
//         <>
//           <button
//             onClick={() => {
//               viewComments(true);
//             }}
//           >
//             Emergency Only
//           </button>
//           <button
//             onClick={() => {
//               setEmergency(false);
//             }}
//           >
//             Show all
//           </button>
//         </>
//       ) : (
//         <>
//           <button onClick={() => navigate("/ticket/create")}>
//             Create Ticket
//           </button>
//           <button onClick={() => setIsTicketOpen(true)}>Open Comments</button>
//           <button onClick={() => setIsTicketOpen(false)}>Return to Post</button>
//         </>