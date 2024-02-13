import { useState } from "react";
import { addCategory } from "../Managers/CategoryManager";



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

        addCategory(newCategoryToSendToAPI)
        .then(setNewCategory({
            name: "",
            UserProfileId: 1
        })).then(() => updateCategoriesState())
    }

    return (
        <>
         <form className="category-form">
         
            
            <fieldset>
                    <div className="form-group">
                    <h3><b><label htmlFor="name">Add a new Category:</label></b></h3>

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
            <br></br>
            
           <button
            onClick={(clickEvent) => clickTheSaveButton(clickEvent)} className="btn btn-primary">Submit New Category</button>
        </form>
        </>
    )
}