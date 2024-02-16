import { useState, useEffect } from "react";
import {addPost} from "../Managers/PostManager"
import { getAllCategories } from "../Managers/CategoryManager"
import { useNavigate } from "react-router"


export const PostForm = ({updatePostsState}) => {
  const localTabloidUser = localStorage.getItem("userProfile");
  const tabloidUserObject = JSON.parse(localTabloidUser)  
  const [categories, setCategories] = useState([])
  const getCategories = () => { getAllCategories().then(allCategories => setCategories(allCategories));
}
const navigate = useNavigate();

useEffect(() => {
    getCategories()
}, [])

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
    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newPostToSendToAPI = {
            title: newPost.title,
            content: newPost.content,
            imageLocation: newPost.imageLocation,
            categoryId: parseInt(newPost.categoryId),
            createDateTime: new Date(),
            publishDateTime: new Date(),
            isApproved: true,
            userProfileId: tabloidUserObject.id}
            

        
        addPost(newPostToSendToAPI).then(res => res.json()).then((post) => navigate(`/posts/${post.id}`))
        // .then(setNewPost({
        //     title: "",
        //     content: "",
        //     imageLocation: "",
        //     createDateTime: new Date(), 
        //     publishDateTime: new Date,
        //     isApproved: true,
        //     categoryId: "",
        //     userProfileId: tabloidUserObject.id
        // })).then(() => updatePostsState())
    }
    

    const selectList = (event) => {
        const copy = {
            ...newPost
        }
        copy.categoryId = event.target.value
        setNewPost(copy)
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
            newPost.categoryId
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
    {/* <fieldset>
            <div className="form-group">
            <label htmlFor="categoryId">categoryId:</label>
            <input
            type="text"
            id="categoryId"
            value={newPost.categoryId}
            onChange={
                (event) => {
                    const copy = { ...newPost }
                    copy.categoryId = event.target.value
                    setNewPost(copy)
                }
            } />
            </div>
    </fieldset> */}
            <button
            onClick={(clickEvent) => clickTheSaveButton(clickEvent)} className="btn btn-primary">Submit Post</button>
        </form>
        </>
    )
}
