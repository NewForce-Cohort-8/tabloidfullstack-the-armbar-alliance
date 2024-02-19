// CategoryList.js
import React, { useState, useEffect } from "react";
import { Category } from "./Category";
import { CategoryForm } from "./CategoryForm";
import { getAllCategories } from "../Managers/CategoryManager";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = () => {
    getAllCategories().then((allCategories) => setCategories(allCategories));
  };

  const updateCategoriesState = () => {
    return getAllCategories().then((categoryArray) => {
      setCategories(categoryArray);
    });
  };

  useEffect(() => {
    updateCategoriesState();
  }, []);

  const handleEdit = (categoryId) => {
    navigate(`/categories/edit/${categoryId}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <CategoryForm updateCategoriesState={updateCategoriesState} />
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
