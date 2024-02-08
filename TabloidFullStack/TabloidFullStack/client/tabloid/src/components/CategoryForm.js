import { useState } from "react";


export const CategoryForm = ({updateCategoriesState}) => {
    const [newCategory, setNewCategory] = useState(
        {
            name: "",
            UserProfileId: 1
        }
    )

    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newCategoryToSendToAPI = {
            Name: newCategory.name,
            UserProfileId: 1
        }

        // addCategory(newCategoryToSendToAPI)
        // .then(setNewCategory({
        //     name: "",
        //     UserProfileId: 1
        // })).then(() => updateCategoriesState())
    }

    return (
        <>
         <form className="category-form">
            <h2 className="category-form-name">Create a New Category</h2>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={newCategory.name}
                            onChange={
                                (event) => {
                                    const copy = { ...newCategory }
                                    copy.name = event.target.value
                                    setNewCategory(copy)
                                }
                            } />
                    </div>
            </fieldset>
            {/* <fieldset>
                    <div className="form-group">
                        <label htmlFor="caption">Caption:</label>
                        <input
                            type="text"
                            id="caption"
                            value={newCategory.caption}
                            onChange={
                                (event) => {
                                    const copy = { ...newCategory }
                                    copy.caption = event.target.value
                                    setNewCategory(copy)
                                }
                            } />
                    </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image Url:</label>
                        <input
                            type="text"
                            id="title"
                            value={newPost.imageUrl}
                            onChange={
                                (event) => {
                                    const copy = { ...newPost }
                                    copy.imageUrl = event.target.value
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