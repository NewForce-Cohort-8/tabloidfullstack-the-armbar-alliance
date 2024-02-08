import { useState } from "react";
import { addTag } from "../../APIManagers/TagManager"

export const TagForm = ({updateTagState}) => {
    const [newTag, setNewTag] = useState(
        {
            Name: "",
            TagId: ""
        }
    )

    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newTagToSendToAPI = {
            Name: newTag.Name,
            TagId: 1
        }

        addTag(newTagToSendToAPI)
        .then(setNewTag({
            name: "",
            tagId: 1
        })).then(() => updateTagState())
    }


return (
    <>
     <form className="tag-form">
        <h4 className="tag-form-name">Create a New Tag:</h4>
        <fieldset>
        <div className="tag-form-group">
        <input
            type="text"
            id="name"
            value={newTag.name}
            onChange={
            (event) => {
            const copy = { ...newTag }
                copy.name = event.target.value
                    setNewTag(copy)
                                }
                            } />
                    </div>
            </fieldset>
            <button
            onClick={(clickEvent) => clickTheSaveButton(clickEvent)} className="btn btn-primary">Submit Tag</button>
        </form>

    </> )

}