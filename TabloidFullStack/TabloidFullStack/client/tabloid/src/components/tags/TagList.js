import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tags } from "./Tags";
import { TagForm } from "./TagForm";
import { getAllTags, DeleteTags } from "../../APIManagers/TagManager";

const TagList = () => {
  const [tags, setTags] = useState([]);

  const getTags = () => getAllTags().then(allTags => setTags(allTags)); 
  ;

  const updateTagState = () => {
    return getAllTags()
    .then((tagsArray) => {
        setTags(tagsArray)
    })
  }




  useEffect(() => {
    updateTagState();
  }, []); 

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
        <TagForm updateTagState = {updateTagState}/>
        <br></br>
          <p><b>List of Tags:</b></p>
        {tags.map((tag) => (
            <Tags 
              key={tag.id}
              tag={tag}
              />
        ))}
        
        </div>
      </div>
    </div>
  );
};

export default TagList;