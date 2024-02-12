import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Comment } from "./Comment";
import { useParams } from "react-router-dom";
import { GetPostcommentsbyId } from "../../Managers/CommentManager.js";

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    const Getcomments = () => {
        GetPostcommentsbyId(postId).then((response) =>
        {const allComments = response.data.comments;
           setComments(allComments);
    });

    useEffect(() => {
      console.log("comments before API call:", comments);
        Getcomments();
    }, [postId]);

    useEffect(() => {
      console.log("comments after API call:", comments);
    }, [comments]);
  }
    return (<>
        <div className="comment-list">
          <div className="row justify-content-center">
            <div className="cards-column">
              <Table> 
              <thead>
                <tr>
                  {/* <th>Content</th>
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
        </div>
      
      </>
      )
  }