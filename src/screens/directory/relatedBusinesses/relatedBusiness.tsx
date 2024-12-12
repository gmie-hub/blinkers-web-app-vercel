import styles from "./relatedBusiness.module.scss";
import { Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import LocationIcon from "../../../assets/locationrelated.svg";
import CallIcon from "../../../assets/callrelated.svg";
import { useQueries } from "@tanstack/react-query";
import { getBusinessById } from "../../request";
import { AxiosError } from "axios";
import RouteIndicator from "../../../customs/routeIndicator";
import CustomSpin from "../../../customs/spin";
import ArrowIcon from "../../../assets/arrow-right-green.svg";

interface Props {
  limit?: number;
  showHeading?: boolean;
  showSeeAll?: boolean;
}
const RelatedBusinesses = ({
  showHeading = true,
  limit,
  showSeeAll = false,
}: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigateDirectory = (id: number) => {
    navigate(`/directory-details/${id}`);
  };

  const [getBusinessDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-business-details", id],
        queryFn: () => getBusinessById(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;
  const businessDetailsError = getBusinessDetailsQuery?.error as AxiosError;
  const businessDetailsErrorMessage =
    businessDetailsError?.message ||
    "An error occurred. Please try again later.";

  const relatedBusiness = businessDetailsData?.related_businesses;
  const relatedBusinessLenght = businessDetailsData?.related_businesses?.length;

  console.log(relatedBusinessLenght,'relatedBusinessLenght')

  const relatedBusinessData =
    relatedBusiness && relatedBusiness?.length > 0
      ? relatedBusiness?.slice(0, limit)
      : relatedBusiness;

  console.log(relatedBusinessData, "relatedBusinessolajum");

  const handleNavigateToRelatedBusiness = () => {
    navigate(`/related-businesses/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="wrapper">
      {showHeading && <RouteIndicator showBack />}

      {showSeeAll &&  relatedBusinessLenght > 0 &&(
        <div>
          <div className={styles.reviewbtn}>
            <p className={styles.title}> Related Businesses</p>

            <div
              onClick={handleNavigateToRelatedBusiness}
              className={styles.btnWrapper}
            >
              <p className={styles.btn}>See All</p>
              <Image
                width={20}
                src={ArrowIcon}
                alt="ArrowIcon"
                preview={false}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        {showHeading && (
          <div className={styles.promoHead}>
            <p>Related Businesses</p>
          </div>
        )}
        {getBusinessDetailsQuery?.isLoading ? (
          <CustomSpin />
        ) : getBusinessDetailsQuery?.isError ? (
          <h1 className="error">{businessDetailsErrorMessage}</h1>
        ) : (
          <section className={styles.promoImageContainer}>
            {relatedBusinessData &&
              relatedBusinessData?.length > 0 &&
              relatedBusinessData?.map((item: any, index: number) => (
                <div
                  onClick={() => handleNavigateDirectory(item?.id)}
                  className={styles.promoImage}
                  key={index}
                >
                  <img className={styles.proImage} src={item?.logo} alt="" />
                  <div className={styles.productList}>
                    <p className={styles.title}>
                      {/* {item?.name} */}
                      {item?.name && item?.name?.length > 20
                        ? item?.name?.slice(0, 20) + "..."
                        : item?.name}
                    </p>
                    <div className={styles.info}>
                      <Image
                        src={LocationIcon}
                        alt="LocationIcon"
                        preview={false}
                      />

                      <p>
                        {item?.address && item?.address?.length > 20
                          ? `${item?.address?.slice(0, 20)}...`
                          : item?.address}
                      </p>
                    </div>
                    <div className={styles.info}>
                      <Image
                        width={20}
                        height={20}
                        src={CallIcon}
                        alt="CallIcon"
                        preview={false}
                      />

                      <p>{item.phone}</p>
                    </div>
                    <p className={styles.subjectBg}>Fashion Accessories</p>
                  </div>
                </div>
              ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default RelatedBusinesses;
