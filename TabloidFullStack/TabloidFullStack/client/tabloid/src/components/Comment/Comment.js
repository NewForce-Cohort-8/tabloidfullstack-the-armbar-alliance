import { Link } from "react-router-dom";
import { Table } from "reactstrap";

export const Comment = ({comment}) => {
    
    return(
        <><p className="text-left px-2">Post Title: <strong>{comment.post?.title}</strong></p><Table striped bordered hover>
            <thead>
                <tr>
                    <th>Content</th>
                    <th>Subject</th>
                    <th>Author</th>
                    <th>Creation Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{comment.content}</td>
                    <td>{comment.subject}</td>
                    <td>{comment.userProfile?.displayName}</td>
                    <td>{comment.createDateTime}</td>
                </tr>
            </tbody>
        </Table></>  
    );
}