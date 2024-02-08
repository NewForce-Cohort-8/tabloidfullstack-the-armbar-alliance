import { useState } from "react";
import { addTag } from "../../APIManagers/TagManager"

export const TagForm = ({updateTagState}) => {
    const [newTag, setNewTag] = useState(
        {
            Name: ""
        }
    )

    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newTagToSendToAPI = {
            Name: newTag.Name
        }

        addTag(newTagToSendToAPI)
        .then(setNewTag({
            Name: ""
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
            value={newTag.Name}
            onChange={
            (event) => {
            const copy = { ...newTag }
                copy.Name = event.target.value
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