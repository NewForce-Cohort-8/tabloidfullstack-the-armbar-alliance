// import { useState } from "react";
// import {addPost} from "../APIManagers/PostManager"

// export const PostForm = ({updatePostsState}) => {
//     const [newPost, setNewPost] = useState(
//         {
//             title: "",
//             content: "",
//             imageLocation: "",
//             createDateTime: new Date(), 
//             isApproved: true,
//             categoryId: "",
//             UserProfileId: 1
//         }
//     )

//     const clickTheSaveButton = (e) => {
//         e.preventDefault()

//         const newPostToSendToAPI = {
//             Title: newPost.title,
//             ImageUrl: newPost.imageUrl,
//             Caption: newPost.caption,
//             DateCreated: new Date(),
//             UserProfileId: 1
//         }

//         addPost(newPostToSendToAPI)
//         .then(setNewPost({
//           title: "",
//           content: "",
//           imageLocation: "",
//           createDateTime: new Date(), 
//           isApproved: true,
//           categoryId: "",
//           UserProfileId: 1
//         })).then(() => updatePostsState())
//     }

//     return (
//         <>
//          <form className="post-form">
//             <h2 className="post-form-title">Create a New Post</h2>
//             <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="title">Title:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             value={newPost.title}
//                             onChange={
//                                 (event) => {
//                                     const copy = { ...newPost }
//                                     copy.title = event.target.value
//                                     setNewPost(copy)
//                                 }
//                             } />
//                     </div>
//             </fieldset>
//             <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="caption">Caption:</label>
//                         <input
//                             type="text"
//                             id="caption"
//                             value={newPost.caption}
//                             onChange={
//                                 (event) => {
//                                     const copy = { ...newPost }
//                                     copy.caption = event.target.value
//                                     setNewPost(copy)
//                                 }
//                             } />
//                     </div>
//             </fieldset>
//             <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="imageUrl">Image Url:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             value={newPost.imageUrl}
//                             onChange={
//                                 (event) => {
//                                     const copy = { ...newPost }
//                                     copy.imageUrl = event.target.value
//                                     setNewPost(copy)
//                                 }
//                             } />
//                     </div>
//             </fieldset>
//             <button
//             onClick={(clickEvent) => clickTheSaveButton(clickEvent)} className="btn btn-primary">Submit Post</button>
//         </form>
//         </>
//     )
// }