
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Select from "../../../../customs/select/select";
import { Form, Formik } from "formik";
import Button from "../../../../customs/button/button";
import Checkbox from "../../../../customs/checkBox/checkbox"; // Import the custom checkbox
import ProductList from "./productList.tsx";
import FilterIcon from "../../../../assets/setting-4.svg";
import { Image } from "antd";

// Define the structure for items
interface Item {
  key: number;
  value: string;
}

const PriceOptions = [
  { key: 1, value: "Low To High" },
  { key: 2, value: "High To Low" },
  { key: 3, value: "Discounted" },
];
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

const Main = () => {
  // Track the currently open section
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

  // Adjust isFilterVisible based on screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // On small screens, ensure isFilterVisible is false by default
    if (windowWidth < 1024) {
      setIsFilterVisible(false);
    } else {
      setIsFilterVisible(true); // For large screens, always show the filter
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevState) => !prevState);
  };

  // Toggle the visibility of the list
  const toggleItems = (index: number) => {
    // Close the currently open section if it's clicked again, or open a new section
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Formik
      initialValues={{ employment_type: "", selectedItems: [] }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            {/* Show Filters only when isFilterVisible is true */}
            {isFilterVisible && (
              <>
                <div className={styles.spaceBetween}>
                  <p>Filters</p>
                  <Image
                    className={styles.filter}
                    onClick={toggleFilterVisibility}
                    width={30}
                    src={FilterIcon}
                    alt="FilterIcon"
                    preview={false}
                  />
                </div>
                <Checkbox label="Nearby Me" name="nearby_me" />

                <p className={styles.subjectBg}>CATEGORIES</p>
                {allItemsWithTitles.map((category, index) => (
                  <div key={index}>
                    <div
                      className={styles.itemContainer}
                      onClick={() => toggleItems(index)}
                    >
                      <p>{category.title}</p>
                      <p className={styles.plusSign}>
                        {openIndex === index ? "-" : "+"}
                      </p>
                    </div>
                    {openIndex === index && (
                      <ul className={styles.itemList}>
                        {category.items.map((item) => (
                          <li key={item.key}>
                            <Checkbox
                              label={item.value}
                              name={`selectedItems.${category.title}.${item.key}`}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                <div>
                  <p className={styles.subjectBg}>LOCATION</p>
                  <Select
                    name="employment_type"
                    placeholder="Select state"
                    options={[]}
                  />
                  <br />
                  <Select
                    name="employment_type"
                    placeholder="Select local government Area"
                    options={[]}
                  />
                </div>
                <div>
                  <p className={styles.subjectBg}>Price</p>
                  <ul className={styles.itemList}>
                    {PriceOptions.map((option) => (
                      <li key={option.key}>
                        <Checkbox
                          label={option.value}
                          name={`selectedPrices.${option.key}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBlockStart: "2rem" }}>
                  <Button text="Apply Filter" />
                  <br />
                  <br />
                  <Button variant="white" text="Reset Filter" />
                </div>
              </>
            )}

            {/* Only show "Show all" on small screens */}
            {!isFilterVisible && (
              <div className={styles.spaceBetween}>
                <p>Filters</p>
                <Image
                  className={styles.filter}
                  onClick={toggleFilterVisibility}
                  width={30}
                  src={FilterIcon}
                  alt="FilterIcon"
                  preview={false}
                />
              </div>
            )}
          </div>

          <div>
            <div className={styles.rightSide}>
              <ProductList />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Main;
