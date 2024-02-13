// // CategoryList.js
// import React, { useState, useEffect } from "react";
// import { Category } from "./Category";
// import { CategoryForm } from "./CategoryForm";
// import { getAllCategories } from "../Managers/CategoryManager";
// import { useNavigate } from "react-router-dom";

// const CategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   const getCategories = () => {
//     getAllCategories().then((allCategories) => setCategories(allCategories));
//   };
  

//   const updateCategoriesState = () => {
//     return getAllCategories().then((categoryArray) => {
//       setCategories(categoryArray);
//     });
//   };

//   const deleteCategory = (id) => {
//     const confirmDelete = window.confirm("Are you sure you would like to delete this category?");
//     if (confirmDelete) {
//       deleteCategory(id).then(() => {getCategories();})
//     }
//   }

//   useEffect(() => {
//     updateCategoriesState();
//   }, []);

//   const handleEdit = (categoryId) => {
//     navigate(`/categories/edit/${categoryId}`);
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="cards-column">
//           <CategoryForm updateCategoriesState={updateCategoriesState} />
//           {categories.map((category) => (
//             <Category
//               key={category.id}
//               category={category}
//               onEdit={handleEdit}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryList;


// CategoryList.js
import React, { useState, useEffect } from "react";
import { Category } from "./Category";
import { CategoryForm } from "./CategoryForm";
import { getAllCategories, deleteCategory as deleteCategoryAPI, deleteCategory } from "../Managers/CategoryManager"; // Import deleteCategory with an alias
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

  const handleDelete = (id) => { // Rename the function to handleDelete to avoid naming conflict
    const confirmDelete = window.confirm("Are you sure you would like to delete this category?");
    if (confirmDelete) {
      deleteCategory(id).then(() => { // Use the imported deleteCategory function
        getCategories();
      });
    }
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
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;

