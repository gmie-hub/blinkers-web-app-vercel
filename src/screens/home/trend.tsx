import styles from "./index.module.scss";
import { Image } from "antd";
import Product2 from "../../assets/Image.svg";
import location from "../../assets/location.svg";
import Button from "../../customs/button/button";
import Star from "../../assets/Vector.svg";
import StarYellow from "../../assets/staryellow.svg";
import favorite from "../../assets/Icon + container.svg";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { getTrendingAds } from "../request";
import { useQueries } from "@tanstack/react-query";
import CustomSpin from "../../customs/spin";
import { sanitizeUrlParam } from "../../utils";

export function countUpTo(
  num: number,
  element: JSX.Element,
  element1: JSX.Element
) {
  const result = [];
  for (let i = 1; i <= 5; i++) {
    if (i > num) result?.push(element1);
    else result?.push(element);
  }
  return result; // Return the array
}

const Trends = () => {
  const navigate = useNavigate();

  const [getTrendingAdsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-trending-ads"],
        queryFn: getTrendingAds,
        retry: 0,
        refetchOnWindowFocus: true,
      },
    ],
  });

  const trendData = getTrendingAdsQuery?.data?.data || [];
  const trendError = getTrendingAdsQuery?.error as AxiosError;
  const trendErrorMessage =
    trendError?.message || "An error occurred. Please try again later.";

  const handleNavigateToMarket = () => {
    navigate(`/market`);
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };

  const handleNavigateToProductDetails = (id: number,user_id:number,title:string,description:string ) => {
    navigate(`/product-details/${id}/${user_id}/${sanitizeUrlParam(title)}/${sanitizeUrlParam(description)}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.accessWrapper}>
      <div>
        <p className={styles.TrendsHead}>Trending Now</p>
      </div>
      {getTrendingAdsQuery?.isLoading ? (
         <CustomSpin />
      ) : getTrendingAdsQuery?.isError ? (
        <h1 className="error">{trendErrorMessage}</h1>
      ) : (
        <section className={styles.trendContainer}>
          <div className={styles.leftSectionTrend}>
            {trendData &&
              trendData?.length > 0 &&
              trendData?.slice(0, 2)?.map((item: any, index: number) => (
                <div onClick={() => handleNavigateToProductDetails(item?.id,item?.user_id, item?.title, item?.description)} className={styles.trendImage} key={item?.id || index}>
                  <div className={styles.favoriteIcon}>
                    <Image
                      width={30}
                      src={favorite}
                      alt="Favorite"
                      preview={false}
                    />
                  </div>
                  <img
                    // width={"100%"}
                    className={styles.trendingProductImage}
                    src={item?.add_images?.[0]?.add_image || Product2}
                    alt={item?.title || "Product Image"}
                    // preview={false}
                  />
                  <div className={styles.productList}>
                    {/* <p style={{color:'#4F4F4F'}}>{item?.title || "No Title"}</p> */}
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 30
                        ? `${item?.title?.slice(0, 30)}...`
                        : item?.title}
                    </p>
                    <div className={styles.info}>
                      <img src={location} alt="location" />

                      <p>
                        <span>
                          {item?.local_govt?.local_government_area &&
                            item?.local_govt?.local_government_area + ", "}
                        </span>

                        <span>{item?.state?.state_name}</span>
                      </p>
                    </div>

                    <span className={styles.trendingdiscount}>
                      {item?.discount_price &&
                        `₦${item?.discount_price}`}
                    </span>

                    <span>
                      {item?.discount_price === "" ? (
                        <span>{`₦${item?.price}`}</span>
                      ) : (
                        <span
                          className={styles.canceledText}
                        >{`₦${item?.price}`}</span>
                      )}
                    </span>

                    <div className={styles.starWrapper}>
                      {countUpTo(
                        item?.rating || 0,
                        <Image
                          width={20}
                          src={StarYellow}
                          alt="StarYellow"
                          preview={false}
                        />,
                        <Image
                          width={20}
                          src={Star}
                          alt="Star"
                          preview={false}
                        />
                      )}
                      <span>(20)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Middle section with one item centered */}
          <div className={styles.middleSectionTrend}>
            {trendData[3] && (
              <div
                onClick={() => handleNavigateToProductDetails(trendData[3]?.id,trendData[3]?.user_id,trendData[3]?.title, trendData[3]?.description )}
                className={styles.trendImage}
                key={trendData[3].id}
              >
                <div className={styles.favoriteIcon}>
                  <Image
                    width={30}
                    src={favorite}
                    alt="Favorite"
                    preview={false}
                  />
                </div>
                <img
                  // width={"100%"}
                  className={styles.trendingProductImage}
                  src={trendData[3]?.add_images?.[0]?.add_image || Product2}
                  alt={trendData[3]?.title || "Product Image"}
                  // preview={false}
                />
                <div className={styles.productList}>
                  <p style={{ color: "#4F4F4F" }}>
                    {trendData[3]?.title && trendData[3]?.title?.length > 30
                      ? `${trendData[3]?.title?.slice(0, 30)}...`
                      : trendData[3]?.title}
                  </p>{" "}
                  <div className={styles.info}>
                    <img src={location} alt="location" />

                    <p>
                      <span>
                        {trendData[3]?.local_govt?.local_government_area &&
                          trendData[3]?.local_govt?.local_government_area +
                            ", "}
                      </span>

                      <span>{trendData[3]?.state?.state_name}</span>
                    </p>
                  </div>
                  <span className={styles.trendingdiscount}>
                    {trendData[3]?.discount_price &&
                      `₦${trendData[3]?.discount_price} (Discounted)`}
                  </span>
                  <span>
                    {trendData[3]?.discount_price === "" ? (
                      <span>{`₦${trendData[3]?.price}`}</span>
                    ) : (
                      <span
                        className={styles.canceledText}
                      >{`₦${trendData[3]?.price}`}</span>
                    )}
                  </span>
                  <div className={styles.starWrapper}>
                    {countUpTo(
                      trendData[3]?.rating || 0,
                      <Image
                        width={20}
                        src={StarYellow}
                        alt="StarYellow"
                        preview={false}
                      />,
                      <Image width={20} src={Star} alt="Star" preview={false} />
                    )}
                    <span>(20)</span>
                  </div>
                </div>
              </div>
            )}
            <Button
              type="button"
              variant="green"
              text="Shop Now"
              className={styles.buttonStyleTrend}
              onClick={handleNavigateToMarket}
            />
          </div>

          {/* Right section with two items */}

          <div className={styles.rightSectionTrend}>
            {trendData &&
              trendData?.length > 0 &&
              trendData?.slice(4, 6)?.map((item: any, index: number) => (
                <div onClick={() => handleNavigateToProductDetails(item?.id,item?.user_id, item?.title, item?.description)}  className={styles.trendImage} key={item?.id || index}>
                  <div className={styles.favoriteIcon}>
                    <Image
                      width={30}
                      src={favorite}
                      alt="Favorite"
                      preview={false}
                    />
                  </div>
                  <img
                    // width={"100%"}
                    className={styles.trendingProductImage}
                    src={item?.add_images?.[0]?.add_image || Product2}
                    alt={item?.title || "Product Image"}
                    // preview={false}
                  />
                  <div className={styles.productList}>
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 30
                        ? `${item?.title?.slice(0, 30)}...`
                        : item?.title}
                    </p>
                    <div className={styles.info}>
                      <img src={location} alt="location" />
                      <p>
                        <span>
                          {item?.local_govt?.local_government_area &&
                            item?.local_govt?.local_government_area + ", "}
                        </span>

                        <span>{item?.state?.state_name}</span>
                      </p>{" "}
                    </div>

                    <span className={styles.trendingdiscount}>
                      {item?.discount_price &&
                        `₦${item?.discount_price} `}
                    </span>
                    <span>
                      {item?.discount_price === "" ? (
                        <span>{`₦${item?.price}`}</span>
                      ) : (
                        <span
                          className={styles.canceledText}
                        >{`₦${item?.price}`}</span>
                      )}
                    </span>
                    <div className={styles.starWrapper}>
                      {countUpTo(
                        item?.rating || 0,
                        <Image
                          width={20}
                          src={StarYellow}
                          alt="StarYellow"
                          preview={false}
                        />,
                        <Image
                          width={20}
                          src={Star}
                          alt="Star"
                          preview={false}
                        />
                      )}
                      <span>(20)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Button
              type="button"
              variant="green"
              text="Shop Now"
              className={styles.buttonStyleTrendBigscreen}
              onClick={handleNavigateToMarket}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default Trends;
