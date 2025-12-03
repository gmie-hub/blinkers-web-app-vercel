import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Form, Formik } from "formik";
import Button from "../../../../customs/button/button";
import Checkbox from "../../../../customs/checkBox/checkbox"; // Import the custom checkbox
import ProductList from "./productList.tsx";
import FilterIcon from "../../../../assets/setting-4.svg";
import { Image, Modal } from "antd";
import {
  getAllCategory,
  getApplicantsbyId,
  // getAllState,
  // getLGAbyStateId,
  getSubCategory,
} from "../../../request.ts";
import { useQueries } from "@tanstack/react-query";
// import SearchableSelect from "../../../../customs/searchableSelect/searchableSelect.tsx";
import { useNavigate } from "react-router-dom";
import LocationModal from "../locationModal/location.tsx";
// import PopularProducts from "./popularProduct.tsx";
import { getCityAndState } from "../../../../utils/location.ts";
import { userAtom } from "../../../../utils/store.ts";
import { useAtom } from "jotai";
import GeneralWelcome from "../marketLogin/marketLogin.tsx";

const PriceOptions = [
  { key: "asc", value: "Low To High" },
  { key: "desc", value: "High To Low" },
  // { key: 3, value: "Discounted" },
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
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // Array of strings
  const [stateId, setStateId] = useState(0);
  const [lgaId, setLgaId] = useState(0);
  const navigate = useNavigate();
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [location, setLocation] = useState<{ city?: string; state?: string,lga?:string }>(
    {}
  );

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const loc = await getCityAndState();
        setLocation(loc);
      } catch (err: any) {
        // notification.error({
        //   message: "Error",
        //   description: err || "Failed to access location. Please enable GPS.",
        // });
      }
    })();
  }, []);

  

  const handleCheckboxPriceChange = (optionKey: string) => {
    setSelectedPrice((prevSelected) =>
      prevSelected === optionKey ? null : optionKey
    );
  };

  // const handleStateChange = (value: number, setFieldValue: any) => {
  //   setStateId(value);
  //   setLgaId(0);
  //   setFieldValue("lga", "");
  // };

  // const handleLgaChange = (value: number) => {
  //   setLgaId(value);
  //   // setFieldValue("lga", "")
  // };



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
    setSelectedItems([]);
    setOpenIndex(openIndex === index ? null : index);
  };

  const [getCategoryQuery, getSubCategoryQuery,getProfileQuery] =
    useQueries({
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
           queryKey: ["get-profile"],
           queryFn: () => getApplicantsbyId(user?.id!),
           retry: 0,
           refetchOnWindowFocus: true,
           enabled: !!user?.id,
         },

        // {
        //   queryKey: ["get-all-state"],
        //   queryFn: getAllState,
        //   retry: 0,
        //   refetchOnWindowFocus: true,
        // },
        // {
        //   queryKey: ["get-all-lga", stateId],
        //   queryFn: () => getLGAbyStateId(stateId!),
        //   retry: 0,
        //   refetchOnWindowFocus: true,
        //   enabled: !!stateId,
        // },
      ],
    });

  const categoryData = getCategoryQuery?.data?.data?.data ?? [];
  const subCategory = getSubCategoryQuery?.data?.data?.data;
    const profileData = getProfileQuery?.data?.data;

  // const stateData = getStateQuery?.data?.data?.data ?? [];
  // const lgaData = getLGAQuery?.data?.data?.data ?? [];

  // const stateOptions: { value: number; label: string }[] = [
  //   { value: 0, label: "Select State" }, // Default option
  //   ...(stateData && stateData?.length > 0
  //     ? stateData?.map((item: StateDatum) => ({
  //         value: item?.id,
  //         label: item?.state_name,
  //       }))
  //     : []),
  // ];

  // const lgaOptions: { value: number; label: string }[] = [
  //   { value: 0, label: "Select Lga" }, // Default option
  //   ...(lgaData && lgaData?.length > 0
  //     ? lgaData?.map((item: LGADatum) => ({
  //         value: item?.id,
  //         label: item?.local_government_area,
  //       }))
  //     : []),
  // ];

  // Updated handleCheckboxChange to save only subCategory titles
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subCategoryTitle: number
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
  const isChecked = (subCategoryTitle: number) => {
    return selectedItems.includes(subCategoryTitle);
  };

  const handleBack = () => {
    appliedSearchTerm = "";
    setAppliedSearchTerm("");
    // search = "";
    // navigate("/market");
    navigate("/product-listing");

    setStateId(0);
    setLgaId(0);
    setSelectedItems([]);
    setSelectedPrice("");
  };
  const savedLocation = JSON.parse(
    localStorage.getItem("userLocation") || "{}"
  );

    const handleNavigateToSell = () => {
  
    if (user?.role !== "2" && user?.business === null) {
      navigate("/seller-verification");
    } else if (
      profileData?.subscription?.pricing?.plan?.name?.toLowerCase() ===
        "free" ||
      profileData?.subscription?.is_active === 0
    ) {
      navigate("/pricing");
    } else {
      //  if (user?.role === "2" || user?.business !== null) {
      navigate("/create-ad");
    }
    // } else {
    //   navigate("/seller-verification");
    // }
  };
  return (
    <Formik
      initialValues={{
        state: "",
        lga: "",
        selectedItems: [],
        nearby_me: false,
        selectedPrices: {},
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <div className={styles.container}>
            <div>
               <Button
              // onClick={handleNavigateToSell}
                onClick={() => {
                      if (user) {
                        handleNavigateToSell();
                      } else {
                        setOpenLoginModal(true);
                      }
                    }}
                  
              className={`${styles.btn} ${styles.sellButton}`}
            >
              Sell
            </Button>
            </div>
            <div className={styles.leftSide}>
              {isFilterVisible && (
                <>
                  <div className={styles.spaceBetween}>
                    <p className={styles.filterText}>Filters</p>

                    <Image
                      className={styles.filter}
                      onClick={toggleFilterVisibility}
                      width={30}
                      src={FilterIcon}
                      alt="FilterIcon"
                      preview={false}
                    />
                  </div>
                  <div className={styles.locationContainer}>
                    <p className={styles.label}>Location</p>

                    <div className={styles.leftLocation}>
                      <p className={styles.value}>
                        {" "}
                        {savedLocation?.lga
                          ? savedLocation?.lga
                          : location.lga
                          ? location.lga
                          : "Select Location"}
                      </p>
                      <p
                        className={styles.change}
                        onClick={() => setOpenLocationModal(true)}
                      >
                        Change Location
                      </p>
                    </div>
                  </div>

                  {/* <Checkbox
                    label="Nearby Me"
                    name="nearby_me"
                    isChecked={values.nearby_me}
                    // onChange={(e: any) => handleCheckboxChange(e, "Nearby Me")}
                  /> */}

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
                                  (e: any) => handleCheckboxChange(e, sub.id) // Pass sub.title to handleCheckboxChange
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* <div>
                    <p className={styles.subjectBg}>LOCATION</p>

                    <SearchableSelect
                      name="state"
                      label="State"
                      options={stateOptions}
                      placeholder="Select State"
                      // onChange={(value: any) => handleStateChange(value)}
                      onChange={(value: any) =>
                        handleStateChange(value, setFieldValue)
                      } // Update stateId and reset lga here
                    />
                    <br />

                    <SearchableSelect
                      name="lga"
                      label="Lga"
                      options={lgaOptions}
                      placeholder="Select LGA"
                      onChange={(value) => handleLgaChange(value)} // Update stateId here
                    />
                  </div> */}
                  <div>
                    <p className={styles.subjectBg}>Price</p>
                    <ul className={styles.itemList}>
                      {PriceOptions.map((option, index) => (
                        <li key={index}>
                          <input
                            type="checkbox"
                            checked={selectedPrice === option.key}
                            onChange={() =>
                              handleCheckboxPriceChange(option.key)
                            }
                          />
                          <label>{option.value}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginBlockStart: "2rem" }}>
                    {/* <Button text="Apply Filter" /> */}
                    <br />
                    <br />
                    <Button
                      onClick={handleBack}
                      variant="white"
                      text="Reset Filter"
                    />
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
              <p className={styles.title1}>Popular Products</p>
              {/* <PopularProducts/> */}

              <p className={styles.title1}>All Products</p>
              <ProductList
                appliedSearchTerm={appliedSearchTerm}
                setAppliedSearchTerm={setAppliedSearchTerm}
                selectedItems={selectedItems}
                category_id={categoryId}
                stateId={stateId}
                lgaId={lgaId}
                setStateId={setStateId}
                setLgaId={setLgaId}
                setSelectedItems={setSelectedItems}
                selectedPrice={selectedPrice}
              />
            </div>
          </div>

          <Modal
            open={openLocationModal}
            onCancel={() => setOpenLocationModal(false)}
            footer={null}
            centered
            width={1300}
          >
            <LocationModal handleClose={() => setOpenLocationModal(false)} />
          </Modal>
          
      <Modal
        open={openLoginModal}
        onCancel={() => setOpenLoginModal(false)}
        centered
        footer={null}
      >
        <GeneralWelcome handleCloseModal={() => setOpenLoginModal(false)} />
      </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default Main;
