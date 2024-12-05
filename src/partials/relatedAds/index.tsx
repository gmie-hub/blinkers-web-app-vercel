import styles from "./index.module.scss";
import { Image, Spin } from "antd";
import Star from "../../assets/Vector.svg";
import StarYellow from "../../assets/staryellow.svg";
import {  useParams } from "react-router-dom";
import favorite from "../../assets/Icon + container.svg";
import LocationIcon from "../../assets/locationrelated.svg";
import { countUpTo } from "../../screens/home/trend";
import { useQueries } from "@tanstack/react-query";
import { getProductDetails } from "../../screens/request";
import { AxiosError } from "axios";
import RouteIndicator from "../../customs/routeIndicator";

interface Props {
  limit?: number;
  canSeeBtn?: boolean;
}

const RelatedAds = ({ canSeeBtn = true, limit }: Props) => {
  const { id } = useParams();

  const [getProductDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-product-details", id],
        queryFn: () => getProductDetails(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  const productDetailsData = getProductDetailsQuery?.data?.data;
  const productDetailsError = getProductDetailsQuery?.error as AxiosError;
  const productDetailsErrorMessage =
    productDetailsError?.message ||
    "An error occurred. Please try again later.";

  const reletedJob = productDetailsData?.related_ads;
  console.log(reletedJob, "reletedJobreletedJob");

  const relatedAdssData =
    reletedJob && reletedJob?.length > 0
      ? reletedJob.slice(0, limit)
      : reletedJob;


  return (
    <main className="wrapper">
      <div className={styles.relatedWrapper}>
        {canSeeBtn && <RouteIndicator showBack />}

        {getProductDetailsQuery?.isLoading ? (
          <Spin />
        ) : getProductDetailsQuery?.isError ? (
          <h1 className="error">{productDetailsErrorMessage}</h1>
        ) : (
          <section className={styles.promoImageContainer}>
            {relatedAdssData &&
              relatedAdssData?.length > 0 &&
              relatedAdssData?.map((item, index) => (
                <div className={styles.promoImage} key={index}>
                  <div className={styles.favoriteIcon}>
                    <img width={30} src={favorite} alt="Favorite" />
                  </div>
                  <img
                    className={styles.proImage}
                    src={item?.add_images[0]?.add_image}
                    alt={item.title}
                  />
                  <div className={styles.productList}>
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 20
                        ? `${item?.title?.slice(0, 20)}...`
                        : item?.title}
                    </p>
                    <div className={styles.info}>
                      <Image src={LocationIcon} alt="Location" />
                      <p>
                        <span>{item?.local_govt?.local_government_area} </span>
                        <span>{item?.state?.state_name}</span>
                      </p>
                    </div>
                    <p style={{ color: "#222222", fontWeight: "600" }}>
                      ₦{item.price}
                    </p>
                    <div className={styles.starWrapper}>
                      {countUpTo(
                        0,
                        <Image
                          width={13}
                          src={StarYellow}
                          alt="Star Yellow"
                          preview={false}
                        />,
                        <Image
                          width={13}
                          src={Star}
                          alt="Star"
                          preview={false}
                        />
                      )}
                      <span className={styles.starNum}>(20)</span>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default RelatedAds;
