import { useQuery } from "@tanstack/react-query";
import { getSubCategory } from "../../request";
import styles from './index.module.scss';

const CategoryWithSubcategories = ({
  category,
}: {
  category: CategoryDatum;
}) => {
  const { data: subCategories, isLoading: subcategoriesLoading } = useQuery({
    queryKey: ["subcategories", category.id],
    queryFn: () => getSubCategory(category?.id),
    enabled: !!category?.id,
  });

  const subCategoryData = subCategories?.data?.data ?? [];

  return (
    <div className={styles.subCategory}>
      <p>{category?.title}</p>
      {subcategoriesLoading ? (
        <p>Loading subcategories...</p>
      ) : (
        <ul>
          {subCategoryData?.map((sub) => (
            <li key={sub.id}>{sub.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryWithSubcategories;
