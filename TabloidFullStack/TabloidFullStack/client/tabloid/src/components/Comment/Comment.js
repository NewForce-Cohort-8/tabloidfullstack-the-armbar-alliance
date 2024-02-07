import { CardBody, Button } from "reactstrap"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Comment = ({ comment, getComments }) => {

    const { id } = useParams();

    const commentDateTime = new Date(comment.createDateTime);
    const formattedDate = commentDateTime.toLocaleDateString();

    const localTabloidUser = localStorage.getItem("userProfile");
    const tabloidUserObject = JSON.parse(localTabloidUser);

    const navigate = useNavigate();

  
        
    

return (
        <CardBody>
            <div>
                {/* bold text using inline style */}
                <div> <span style={{ fontWeight: "bold" }}>Subject:</span> {comment.subject} </div>

                {/* bold text using react strap class */}
                <div> <span className="fw-bold">Author:</span> {comment.userProfile.displayName}</div>

                {/* bold text using strong */}
                 <div> <strong>Date:</strong> {formattedDate}</div> 

                <div> {comment.content}</div>

            
            </div>
        </CardBody>
    )
}