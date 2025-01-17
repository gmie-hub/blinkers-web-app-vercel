import styles from "./review.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import StarYellow from "../../../../assets/staryellow.svg";
import StarIcon from "../../../../assets/Vector.svg";
import { Image, Pagination } from "antd";
import BackIncon from "../../../../assets/back.svg";
import { AxiosError } from "axios";
import { getAllReviews } from "../../../request";
import { useQueries } from "@tanstack/react-query";
import { convertDate } from "../../../../utils/formatTime";
import CustomSpin from "../../../../customs/spin";
import usePagination from "../../../../hooks/usePagnation";


export default function AllReviews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentPage, setCurrentPage, onChange } = usePagination();

  const handleNavigateToBack = 
    () => {
      navigate(-1);
      window.scrollTo(0, 0);
    }


    const [getAllReviewQuery] = useQueries({
      queries: [
        {
          queryKey: ["get-all-review", id,currentPage],
          queryFn: () => getAllReviews(id!,currentPage),
          retry: 0,
          refetchOnWindowFocus: false,
          enabled:!!id

        },
      ],
    });
  
    const reviewData = getAllReviewQuery?.data?.data?.data || [];
    const reviewError = getAllReviewQuery?.error as AxiosError;
    const reviewErrorMessage =
      reviewError?.message || "An error occurred. Please try again later.";
  
  
      

  return (
    <div className="wrapper">
        <div onClick={handleNavigateToBack} className={styles.back}>
          <Image width={9} src={BackIncon} alt="BackIncon" preview={false} />
          <p >Back</p>
        </div>
      
        <div className={styles.reviweWrapper}>
        <div className={styles.promoHead}>
            <p>Reviews</p>
          </div>
          {getAllReviewQuery?.isLoading ? (
         <CustomSpin />
      ) : getAllReviewQuery?.isError ? (
        <h1 className="error">{reviewErrorMessage}</h1>
      ) : (
          <div className={styles.wrappers}>
            {reviewData && reviewData?.length > 0 ? (
              reviewData?.map((item, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.dateTimeWrapper}>
                    <div>
                      <span>{convertDate(item?.created_at) || ""}</span>
                      <div></div>
                      <span>{convertDate(item?.created_at) || ""}</span>
                    </div>
                    <span>{item?.review || ""}</span>
                  </div>
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
                        src={StarIcon}
                        alt="StarIcon"
                        preview={false}
                      />
                    )}
                  </div>
                  <div className={styles.reviewContent}>{item?.review}</div>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
      )}
        </div>
        <Pagination
              current={currentPage}
              total={getAllReviewQuery?.data?.data?.total}
              pageSize={20} // Items per page
              onChange={(page) => {
                setCurrentPage(page);
                onChange(page);
              }}
              showSizeChanger={false}
              style={{
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            />
    </div>
  );
}

// Helper function to render stars based on the rating
function countUpTo(num: number, element: JSX.Element, element1: JSX.Element) {
  const result = [];
  for (let i = 1; i <= 5; i++) {
    if (i > num) result.push(element1);
    else result.push(element);
  }
  return result; // Return the array
}

