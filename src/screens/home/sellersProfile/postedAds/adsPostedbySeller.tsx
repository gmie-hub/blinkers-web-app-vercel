

import styles from "./index.module.scss";
import { Image, Pagination } from "antd";
import Product3 from "../../../../assets/Image (1).svg";
import Star from "../../../../assets/Vector.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import {  useParams } from "react-router-dom";
import { countUpTo } from "../../trend";
import { getAdsByUserId } from "../../../request";
import usePagination from "../../../../hooks/usePagnation";
import { useQueries } from "@tanstack/react-query";
import RouteIndicator from "../../../../customs/routeIndicator";
import LocationIcon from "../../../../assets/locationrelated.svg";
import { useEffect } from "react";

const SellersAds = ({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) => {
  const { currentPage, setCurrentPage, onChange, pageNum } = usePagination();
  const { id } = useParams();

  useEffect(() => {
    if (currentPage !== pageNum) {
      setCurrentPage(pageNum);
    }
  }, [pageNum, currentPage, setCurrentPage])

  const [getAllAdsBySellersQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-sellers-details", id, currentPage],
        queryFn: () => getAdsByUserId(parseInt(id!), currentPage),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  console.log(getAllAdsBySellersQuery?.data?.data?.total)
  const adsPosted = getAllAdsBySellersQuery?.data?.data?.data || [];

  return (
    <div className="wrapper" style={{ marginBlock: "2rem" }}>
      {showHeading && <RouteIndicator showBack />}

      <div>
        {showHeading && (
          <div className={styles.promoHead}>
            <p style={{ paddingBlockEnd: "2.4rem" }}>
              Ads Posted By Omorinsola’s Store
            </p>
          </div>
        )}

        {/* Display the promo images with the limit applied */}
        <section className={styles.promoImageContainer}>
          {adsPosted &&
            adsPosted?.length > 0 &&
            adsPosted
              ?.slice(0, limit || adsPosted?.length)
              ?.map((item: ProductDatum, index: number) => (
                <div className={styles.promoImage} key={index}>
                  <img
                    src={item?.add_images[0]?.add_image || Product3}
                    alt={item?.title || "Ad"}
                    className={styles.proImage}
                  />
                  <div className={styles.productList}>
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 20
                        ? `${item?.title?.slice(0, 20)}...`
                        : item?.title}
                    </p>
                    <div className={styles.info}>
                      <Image width={30} src={LocationIcon} alt="LocationIcon" />
                      <p>
                        <span>
                          {item?.local_govt?.local_government_area &&
                            item?.local_govt?.local_government_area + ", "}
                        </span>
                        <span>{item?.state?.state_name}</span>
                      </p>
                    </div>
                    {/* <span className={styles.trendingdiscount}>
                      {item?.discount_price &&
                        `₦${item?.discount_price} `}
                    </span> */}
                    <span style={{ color: "#222222", fontWeight: "600" }}>
                      {/* ₦{item?.price} */}
                      {item?.discount_price === "" ? (
                        <span>{`₦${item?.price}`}</span>
                      ) : (
                        <span className={styles.canceledText}>
                          {`₦${item?.price}`}{" "}
                        </span>
                      )}
                      <span>
                        {" "}
                        {item?.discount_price && `₦${item?.discount_price} `}
                      </span>
                    </span>

                    <div className={styles.starWrapper}>
                      {countUpTo(
                        parseInt(item?.averageRating),

                        <Image
                          width={30}
                          src={StarYellow}
                          alt="StarYellow"
                          preview={false}
                        />,
                        <Image
                          width={30}
                          src={Star}
                          alt="Star"
                          preview={false}
                        />
                      )}
                      <span>({item?.averageRating})</span>
                    </div>
                  </div>
                </div>
              ))}
        </section>
      </div>

      {showHeading &&

      <Pagination
            current={currentPage}
            total={getAllAdsBySellersQuery?.data?.data?.total} // Total number of items
            pageSize={50} // Number of items per page
            onChange={onChange} // Handle page change
            showSizeChanger={false} // Hide the option to change the page size
            style={{
              marginTop: "20px",
              textAlign: "center", // Center the pagination
              display: "flex",
              justifyContent: "center", // Ensure the pagination is centered
            }}
          />
}
    </div>
  );
};

export default SellersAds;
