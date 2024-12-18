  import styles from "./index.module.scss";

  // Define the type for the array items
  interface Item {
    key: number;
    value: string;
  }

  // Define the arrays with the specific type for items
  const farmItems: Item[] = [
    { key: 1, value: "Agricultural Seeds" },
    { key: 2, value: "Bamboo" },
    { key: 3, value: "Coco" },
    { key: 4, value: "Eggs" },
    { key: 5, value: "Farm Chemicals" },
    { key: 6, value: "Farm Equipment" },
    { key: 7, value: "Farm Tools" },
    { key: 8, value: "Fishing Equipments" },
    { key: 9, value: "Grains" },
    { key: 10, value: "Horticulture" },
  ];

  const skincareItems: Item[] = [
    { key: 1, value: "Body Cream" },
    { key: 2, value: "Body Wash" },
    { key: 3, value: "Diffusers" },
    { key: 4, value: "Face Cream" },
    { key: 5, value: "Hand Cream" },
    { key: 6, value: "Perfumes" },
    { key: 7, value: "Serums" },
    { key: 8, value: "Sunscreen" },
  ];

  const carBrands: Item[] = [
    { key: 1, value: "Acura" },
    { key: 2, value: "Audi" },
    { key: 3, value: "BMW" },
    { key: 4, value: "Chevrolet" },
    { key: 5, value: "Ferrari" },
    { key: 6, value: "Ford" },
    { key: 7, value: "GMC" },
    { key: 8, value: "Honda" },
    { key: 9, value: "Hummer" },
    { key: 10, value: "Hyundai" },
  ];

  const computerItems: Item[] = [
    { key: 1, value: "Computer Accessories" },
    { key: 2, value: "CPU" },
    { key: 3, value: "Hard Drive" },
    { key: 4, value: "Headset" },
    { key: 5, value: "Keyboard" },
    { key: 6, value: "Laptops" },
    { key: 7, value: "Mouse" },
    { key: 8, value: "Monitor" },
  ];

  // Combine items with titles
  const allItemsWithTitles = [
    { title: "Farm Items", items: farmItems },
    { title: "Skincare Items", items: skincareItems },
    { title: "Car Brands", items: carBrands },
    { title: "Computer Items", items: computerItems },
  ];

  // Helper function to divide items into columns, adding titles
  const distributeItemsIntoColumns = (
    allItemsWithTitles: { title: string; items: Item[] }[],
    itemsPerColumn: number,
    numColumns: number
  ) => {
    const columns: (JSX.Element | null)[][] = Array.from(
      { length: numColumns },
      () => []
    );
    let currentColumn = 0;
    let itemCountInColumn = 0;

    allItemsWithTitles.forEach(({ title, items }) => {
      // Add title at the start of a new array
      columns[currentColumn].push(
        <h3 key={title} className={styles.title}>
          {title}
        </h3>
      );
      itemCountInColumn += 1;

      items.forEach((item) => {
        // Add the item under its respective title
        columns[currentColumn].push(
          <div key={item.key} className={styles.item}>
            {item.value}
          </div>
        );
        itemCountInColumn += 1;

        // Move to next column if current one reaches max items
        if (itemCountInColumn === itemsPerColumn) {
          currentColumn++;
          itemCountInColumn = 0;
        }

        // Reset to first column if the last column is filled
        if (currentColumn === numColumns) {
          currentColumn = 0;
        }
      });
    });

    return columns;
  };

  interface Props {
    handleClose: () => void;
  }

  const CategoriesCard= ({handleClose}:Props) => {
    // Define the number of columns and max items per column
    const numColumns = 4;
    const itemsPerColumn = 10;

    // Distribute items into columns
    const columns = distributeItemsIntoColumns(
      allItemsWithTitles,
      itemsPerColumn,
      numColumns
    );


    // const [getCategoryQuery, getSubCategoryQuery] = useQueries({
      // queries: [
      //   {
      //     queryKey: ["get-all-category"],
      //     queryFn: () => getAllCategory(),
      //     retry: 0,
      //     refetchOnWindowFocus: true,
      //   },
        // {
        //   queryKey: ["get-sub-category", categoryId],
        //   queryFn: () => getSubCategory(categoryId),
        //   retry: 0,
        //   refetchOnWindowFocus: true,
        //   enabled: !!categoryId,
        // },
      // ],
    // });

    // const categoryData = getCategoryQuery?.data?.data?.data ?? [];
    // const subCategory = getSubCategoryQuery?.data?.data?.data;


    return (
        <div className={styles.card}>
          {/* Render each column */}
          {columns.map((column, columnIndex) => (
            <div onClick={()=>{handleClose()}} key={columnIndex} className={styles.column}>
              <p >
              {column}

              </p>
            </div>
          ))}
        </div>
    );
  };

  export default CategoriesCard;
