import React, { useState, useEffect } from "react";
import { getPostById } from "../Managers/PostManager";
import { useParams, useNavigate } from "react-router-dom";
// import "./Posts.css"
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { CommentList } from "./Comment/CommentList";


// import { Button } from "reactstrap";
export const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getPostById(id)
            .then((data) =>
            {setPostDetails(data);
            })
            .catch((error) => {
                console.log("Error fetching user posts:", error);
            });
    }, []);
    const navigate = useNavigate()
    //returns a list of all user profiles
    // i need to fix the name stuff for details
    return (
    <>
   
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
        <Card className="m-4">
      <CardImg top src={postDetails.imageLocation} alt={"image not available"} />
      <CardBody>
        <p>
        <Link to={`/posts/${postDetails.id}`}>
            <strong>Title: {postDetails.title}</strong>
        </Link>
        </p>
        <p>{postDetails.content}</p>
      
        <p className="text-left px-2">Posted by: <Link to={`/userprofile/${postDetails.userProfileId}`}>{postDetails.userProfile?.displayName} {postDetails.userProfile?.lastName}</Link>
        </p>
        <p className="text-left px-2">Posted: {postDetails.publishDateTime}
        </p>
        <button
           onClick={() => navigate(`/Post/${postDetails.id}/Comments/Add`)}
           >Add Comnment</button>
        <CommentList postId={id}/>
      </CardBody>
    </Card>
        </div>
      </div>
    </div>
    </>
    )}



       {/* <div>
          <h5>Comments:</h5>
          {postDetails.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.message}</p>
              <p>Posted by: {comment.userProfileId}</p>
            </div>
          ))}
        </div> */}
       {/* <Button tag={Link} to={`/comment/create/${postDetails.id}`} className="comment-btn">Add Comment</Button> */}