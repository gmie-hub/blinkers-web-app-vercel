import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Select from "../../../../customs/select/select";
import { Form, Formik } from "formik";
import Button from "../../../../customs/button/button";
import Checkbox from "../../../../customs/checkBox/checkbox"; // Import the custom checkbox
import ProductList from "./productList.tsx";
import FilterIcon from "../../../../assets/setting-4.svg";
import { Image } from "antd";
import { getAllCategory, getSubCategory } from "../../../request.ts";
import { useQueries } from "@tanstack/react-query";



const PriceOptions = [
  { key: 1, value: "Low To High" },
  { key: 2, value: "High To Low" },
  { key: 3, value: "Discounted" },
];

interface Props {
  appliedSearchTerm: string;
  setAppliedSearchTerm: any;
}

const Main = ({ appliedSearchTerm, setAppliedSearchTerm }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Array of strings

  console.log(selectedItems, "Selected Items");

  useEffect(() => {
    if (selectedItems.length > 0) {
      setAppliedSearchTerm(selectedItems[selectedItems.length - 1]); // Get the last item
    }
  }, [selectedItems]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth < 1024) {
      setIsFilterVisible(false);
    } else {
      setIsFilterVisible(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevState) => !prevState);
  };

  const toggleItems = (index: number, id: number) => {
    setCategoryId(id);
    setOpenIndex(openIndex === index ? null : index);
  };

  const [getCategoryQuery, getSubCategoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-category"],
        queryFn: () => getAllCategory(),
        retry: 0,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["get-sub-category", categoryId],
        queryFn: () => getSubCategory(categoryId),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!categoryId,
      },
    ],
  });

  const categoryData = getCategoryQuery?.data?.data?.data ?? [];
  const subCategory = getSubCategoryQuery?.data?.data?.data;

  // Updated handleCheckboxChange to save only subCategory titles
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subCategoryTitle: string
  ) => {
    const { checked } = e.target;
    setSelectedItems((prevState) => {
      if (checked) {
        return [...prevState, subCategoryTitle]; // Add selected sub-category title
      } else {
        return prevState.filter((item) => item !== subCategoryTitle); // Remove unselected sub-category title
      }
    });
  };

  // Updated isChecked to check against subCategory titles
  const isChecked = (subCategoryTitle: string) => {
    return selectedItems.includes(subCategoryTitle);
  };

  return (
    <Formik
      initialValues={{
        employment_type: "",
        selectedItems: [],
        nearby_me: false,
        selectedPrices: {},
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div className={styles.container}>
            <div className={styles.leftSide}>
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
                  <Checkbox
                    label="Nearby Me"
                    name="nearby_me"
                    isChecked={values.nearby_me}
                    onChange={(e: any) => handleCheckboxChange(e, "Nearby Me")}
                  />

                  <p className={styles.subjectBg}>CATEGORIES</p>

                  {categoryData?.map((category: any, index: number) => (
                    <div key={index}>
                      <div
                        className={styles.itemContainer}
                        onClick={() => toggleItems(index, category?.id)}
                      >
                        <p>{category.title}</p>
                        <p className={styles.plusSign}>
                          {openIndex === index ? "-" : "+"}
                        </p>
                      </div>
                      {openIndex === index && (
                        <ul className={styles.itemList}>
                          {subCategory?.map((sub: any) => (
                            <li key={sub.id}>
                              <Checkbox
                                isChecked={isChecked(sub.title)} // Pass sub.title to isChecked
                                label={sub.title}
                                name={`selectedItems.${sub.id}`}
                                onChange={(e: any) =>
                                  handleCheckboxChange(e, sub.title) // Pass sub.title to handleCheckboxChange
                                }
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
                      {PriceOptions.map((option: any, index: number) => (
                        <li key={index}>
                          <Checkbox
                            label={option.value}
                            name={`selectedPrices.${option.key}`}
                            isChecked={false}
                            onChange={(e: any) =>
                              handleCheckboxChange(e, option.value) // Pass price option value
                            }
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

            <div className={styles.rightSide}>
              <ProductList
                appliedSearchTerm={appliedSearchTerm}
                setAppliedSearchTerm={setAppliedSearchTerm}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Main;
