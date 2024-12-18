import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Form, Formik } from "formik";
import Button from "../../../../customs/button/button";
import Checkbox from "../../../../customs/checkBox/checkbox"; // Import the custom checkbox
import ProductList from "./productList.tsx";
import FilterIcon from "../../../../assets/setting-4.svg";
import { Image } from "antd";
import {
  getAllCategory,
  getAllState,
  getLGAbyStateId,
  getSubCategory,
} from "../../../request.ts";
import { useQueries } from "@tanstack/react-query";
import SearchableSelect from "../../../../customs/searchableSelect/searchableSelect.tsx";

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
  const [stateId, setStateId] = useState("");

  // const handleStateChange = (value: string) => {
  //   console.log("Search Query:", value);
  //   setStateId(value);
  // };

  const handleStateChange = (value: string) => {
    console.log("Selected State ID:", value);
    setStateId(value); 
    // setFieldValue("lga", "")
  };

  console.log(stateId, "Selected Items");

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

  const [getCategoryQuery, getSubCategoryQuery, getStateQuery,getLGAQuery] = useQueries({
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
      {
        queryKey: ["get-all-state"],
        queryFn: getAllState,
        retry: 0,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["get-all-lga",stateId],
        queryFn: () => getLGAbyStateId(parseInt(stateId!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled:!!stateId
      },
    ],
  });

  const categoryData = getCategoryQuery?.data?.data?.data ?? [];
  const subCategory = getSubCategoryQuery?.data?.data?.data;
  const stateData = getStateQuery?.data?.data?.data ?? [];
  const lgaData = getLGAQuery?.data?.data?.data ?? [];

  const stateOptions: { value: number; label: string }[] = [
    { value: 0, label: "Select State" }, // Default option
    ...(stateData && stateData?.length > 0
      ? stateData?.map((item: StateDatum) => ({
          value: item?.id,
          label: item?.state_name,
        }))
      : []),
  ];

  const lgaOptions: { value: number; label: string }[] = [
    { value: 0, label: "Select Lga" }, // Default option
    ...(lgaData && lgaData?.length > 0
      ? lgaData?.map((item: LGADatum) => ({
          value: item?.id,
          label: item?.local_government_area,
        }))
      : []),
  ];


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
        state: "",
        lga:"",
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
                                onChange={
                                  (e: any) => handleCheckboxChange(e, sub.title) // Pass sub.title to handleCheckboxChange
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

                    <SearchableSelect
                      name="state"
                      label="State"
                      options={stateOptions}
                      placeholder="Select State"
                      // onSearchChange={handleStateChange}
                      // onSearchChange={handleStateChange} // Updates stateId
                      onChange={(value: any) => handleStateChange(value)} // Update stateId here


                    />
                    <br />

                    <SearchableSelect
                      name="lga"
                      label="Lga"
                      options={lgaOptions}
                      placeholder="Select LGA"
                      // onSearchChange={handleSearchChange}
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
                            onChange={
                              (e: any) => handleCheckboxChange(e, option.value) // Pass price option value
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
