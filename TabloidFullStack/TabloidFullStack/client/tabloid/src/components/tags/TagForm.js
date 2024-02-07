import { useState } from "react";

export const TagForm = ({updateTagState}) => {
    const [newTag, setNewTag] = useState(
        {
            Id: "",
            Name: ""
        }
    )


return (
    <>
     <form className="tag-form">
        <h2 className="tag-form-name">Tags List</h2>
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
        </form>

    </> )

}