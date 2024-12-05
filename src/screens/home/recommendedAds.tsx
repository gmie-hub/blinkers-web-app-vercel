import styles from "./index.module.scss";
import { Image, Spin } from "antd";
import LeftIcon from "../../assets/arrow-left.svg";
import RightIcon from "../../assets/arrow-right.svg";
import Product1 from "../../assets/Product.svg";
import Product2 from "../../assets/Image.svg";
import Product3 from "../../assets/Image (1).svg";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getPromotedAds, getRecommededAds } from "../request";

// Main component
const RecommendedAds = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of items to display per page

  const [getRecommededAdsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-Recommeded-ads"],
        queryFn: getPromotedAds,
        retry: 0,
        refetchOnWindowFocus: true,
      },
    ],
  });

  const recommededData = getRecommededAdsQuery?.data?.data?.data || [];
  const recommededError = getRecommededAdsQuery?.error as AxiosError;
  const recommededErrorMessage =
    recommededError?.message || "An error occurred. Please try again later.";

  console.log(recommededData, "recommededData Data");

  const totalPages = Math.ceil(recommededData.length / pageSize);

  // Calculate the slice of data to display based on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData =
    recommededData &&
    recommededData?.length > 0 &&
    recommededData?.slice(startIndex, endIndex);

  // Handle left button click (Previous)
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle right button click (Next)
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle dot click to jump to the respective page
  const handleDotClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.promoWrapper}>
      <div className={styles.promoHead}>
        <p>Recommended Ads</p>

        <div className={styles.arrowContainer}>
          <div
            className={`${styles.arrowButton} ${
              currentPage === 1 ? styles.disabledArrow : styles.greenBackground
            }`}
            onClick={handlePrev}
            style={currentPage === 1 ? { backgroundColor: "#009900" } : {}}
          >
            <Image src={LeftIcon} alt="Left Arrow" preview={false} />
          </div>
          <div
            className={`${styles.arrowButton} ${
              currentPage === totalPages
                ? styles.disabledArrow
                : styles.greenBackground
            }`}
            onClick={handleNext}
            style={currentPage === totalPages ? { backgroundColor: "# " } : {}}
          >
            <Image src={RightIcon} alt="Right Arrow" preview={false} />
          </div>
        </div>
      </div>
      {getRecommededAdsQuery?.isLoading ? (
        <Spin />
      ) : getRecommededAdsQuery?.isError ? (
        <h1 className="error">{recommededErrorMessage}</h1>
      ) : (
        <>
          {/* Display the promo images */}
          <section className={styles.promoImageContainer}>
            {currentData &&
              currentData?.length > 0 &&
              currentData?.map((item: any, index: number) => (
                <div className={styles.promoImage} key={item?.id}>
                  <div style={{height:'26rem'}}>
                  <img
                    src={item?.image}
                    alt={item?.title}
                    // className={styles.trendingProductImage}
                  />
                  </div>
               

                  <div className={styles.productList}>
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 20
                        ? `${item?.title?.slice(0, 20)}...`
                        : item?.title}
                    </p>
                  </div>
                </div>
              ))}
          </section>

          {/* Dot-style pagination */}
          <div className={styles.dotPagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentPage === index + 1 ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(index + 1)}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedAds;
