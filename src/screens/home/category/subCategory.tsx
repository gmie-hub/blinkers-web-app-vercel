// // import { useQuery } from "@tanstack/react-query";
// // import { getSubCategory } from "../../request";
// // import styles from './index.module.scss';

// // const CategoryWithSubcategories = ({
// //   category,
// // }: {
// //   category: CategoryDatum;
// // }) => {
// //   const { data: subCategories, isLoading: subcategoriesLoading } = useQuery({
// //     queryKey: ["subcategories", category.id],
// //     queryFn: () => getSubCategory(category?.id),
// //     enabled: !!category?.id,
// //   });

// //   const subCategoryData = subCategories?.data?.data ?? [];

// //   return (
// //     <div className={styles.subCategory}>
// //       <p>{category?.title}</p>
// //       {subcategoriesLoading ? (
// //         <p>Loading subcategories...</p>
// //       ) : (
// //         <ul>
// //           {subCategoryData?.map((sub) => (
// //             <li key={sub.id}>{sub?.title}</li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default CategoryWithSubcategories;


// import { useQuery } from "@tanstack/react-query";
// import { getSubCategory } from "../../request";
// import styles from './index.module.scss';
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CategoryWithSubcategories = ({
//   category,
//   handleClose
// }: {
//   category: CategoryDatum;
//   handleClose:()=>void
// }) => {
//   const { data: subCategories, isLoading: subcategoriesLoading } = useQuery({
//     queryKey: ["subcategories", category.id],
//     queryFn: () => getSubCategory(category?.id),
//     enabled: !!category?.id,
//   });

//   const subCategoryData = subCategories?.data?.data ?? [];
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
// const navigate = useNavigate()
//   // Function to handle subcategory click
//   const handleSubCategoryClick = (sub: any) => {
    
//     setSelectedSubCategory(sub); // Save clicked subcategory in state
//   };

//   useEffect(()=>{
//     if(selectedSubCategory){
//       navigate(`/market/${selectedSubCategory}`)
      
//       handleClose()
//     }

//   },[selectedSubCategory])


//   return (
//     <div className={styles.subCategory}>
//       <p>{category?.title}</p>
//       {subcategoriesLoading ? (
//         <p>Loading subcategories...</p>
//       ) : (
//         <ul>
//           {subCategoryData?.map((sub) => (
//             <li
//               key={sub.id}
//               onClick={() => handleSubCategoryClick(sub?.title)} // Add click handler
//               style={{ cursor: "pointer" }} // Optional: make it clear it's clickable
//             >
//               {sub?.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CategoryWithSubcategories;


import { useQuery } from "@tanstack/react-query";
import { getSubCategory } from "../../request";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryWithSubcategoriesProps {
  category: CategoryDatum;
  handleClose: () => void;
}

const CategoryWithSubcategories = ({ category, handleClose }: CategoryWithSubcategoriesProps) => {
  const { data: subCategories, isLoading: subcategoriesLoading } = useQuery({
    queryKey: ["subcategories", category.id],
    queryFn: () => getSubCategory(category.id),
    enabled: !!category.id,
  });

  const subCategoryData = subCategories?.data?.data ?? [];
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubCategoryClick = (sub: string) => {
    setSelectedSubCategory(sub);
    handleClose();
  };

  useEffect(() => {
    if (selectedSubCategory) {
      // navigate(`/market/${selectedSubCategory}`);
      navigate(`/product-listing/${selectedSubCategory}`);

      // handleClose();
    }
  }, [selectedSubCategory]);



  return (
    <div className={styles.subCategory}>
      <p style={{cursor:'pointer'}}  onClick={()=>handleSubCategoryClick(category?.title)}>{category.title} </p>
      {subcategoriesLoading ? (
        <p>Loading subcategories...</p>
      ) : (
        <ul>
          {subCategoryData.map((sub) => (
            <li key={sub.id}   onClick={()=>handleSubCategoryClick(sub?.title)}>
              {sub.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryWithSubcategories;
