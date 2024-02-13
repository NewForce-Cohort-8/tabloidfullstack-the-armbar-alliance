import { useState, useEffect } from "react";
import {addPost} from "../Managers/PostManager"

export const PostForm = ({updatePostsState}) => {
  const localTabloidUser = localStorage.getItem("userProfile");
  const tabloidUserObject = JSON.parse(localTabloidUser)  
  const [newPost, setNewPost] = useState(
        {
            title: "",
            content: "",
            imageLocation: "",
            createDateTime: new Date(), 
            publishDateTime: new Date,
            isApproved: true,
            categoryId: "",
            userProfileId: tabloidUserObject.id
        }
    )
//do i need to add publish date time to this form? Do i still need to hard code the user profile ID
    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newPostToSendToAPI = {
            Title: newPost.title,
            Content: newPost.content,
            ImageLocation: newPost.caption,
            CategoryId: newPost.caption,
            CreateDateTime: new Date(),
            PublishDateTime: new Date(),
            userProfileId: tabloidUserObject.id
        }

        addPost(newPostToSendToAPI)
        .then(setNewPost({
          title: "",
          content: "",
          imageLocation: "",
          createDateTime: new Date(), 
          publishDateTime: new Date,
          isApproved: true,
          categoryId: "",
          userProfileId: tabloidUserObject.id
        })).then(() => updatePostsState())
    }

    return (
        <>
         <form className="post-form">
            <h2 className="post-form-title">Create a New Post</h2>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={newPost.title}
                            onChange={
                                (event) => {
                                    const copy = { ...newPost }
                                    copy.title = event.target.value
                                    setNewPost(copy)
                                }
                            } />
                    </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">content:</label>
                        <input
                            type="text"
                            id="content"
                            value={newPost.content}
                            onChange={
                                (event) => {
                                    const copy = { ...newPost }
                                    copy.content = event.target.value
                                    setNewPost(copy)
                                }
                            } />
                    </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="imageLocation">ImageLocation:</label>
                        <input
                            type="text"
                            id="imageLocation"
                            value={newPost.imageLocation}
                            onChange={
                                (event) => {
                                    const copy = { ...newPost }
                                    copy.imageLocation = event.target.value
                                    setNewPost(copy)
                                }
                            } />
                    </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="category-select">Category</label>
                        <select id="type"
                            value={
                                post.categoryId
                            }
                            onChange={
                                event => selectList(event)
                        }>
                            <option value="0">Select a category</option>
                            {
                            categories.map(category => {
                                return <option value={category.id} key={
                                    category.id
                                }>
                                    {
                                    category.name
                                }</option>
                        })
                        } </select>
                        </div>
                        </fieldset>
            <button
            onClick={(clickEvent) => clickTheSaveButton(clickEvent)} className="btn btn-primary">Submit Post</button>
        </form>
        </>
    )
}