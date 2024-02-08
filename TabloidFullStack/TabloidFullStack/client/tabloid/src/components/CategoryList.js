import React, { useState, useEffect } from "react";

import { Category } from "./Category";
// import { CategoryForm } from "./CategoryForm";
// import { CategorySearch } from "./CategorySearch";
import { getAllCategories } from "../Managers/CategoryManager";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

//   const getCategories = () => getAllCategoriesWithComments().then(getAllCategories => setCategories(allCategories)); 
//   ;

  const updateCategoriesState = () => {
    return getAllCategories()
    .then((categoryArray) => {
        setCategories(categoryArray)
    })
  }
  useEffect(() => {
    updateCategoriesState();
  }, []); 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
        {/* <CategoryForm updateCategoriesState = {getCategories}/> */}
        {/* <CategorySearch /> */}
          {categories.map((category) => (
            <Category key={category.id} category={category}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;