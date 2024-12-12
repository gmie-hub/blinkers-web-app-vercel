import styles from "./details.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import StarYellow from "../../../../../assets/staryellow.svg";
import StarIcon from "../../../../../assets/Vector.svg";
import ArrowIcon from "../../../../../assets/arrow-right-green.svg";
import { Image } from "antd";
import Button from "../../../../../customs/button/button";
import { getAllReviews } from "../../../../request";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { convertDate, getTimeFromDate } from "../../../../../utils/formatTime";
import CustomSpin from "../../../../../customs/spin";

// Reviews Component
export default function Reviews({
  canSeeAllBtn = true,
  limit,
}: {
  canSeeAllBtn?: boolean;
  limit?: number;
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch reviews
  const [getAllReviewQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-review", id],
        queryFn: () => getAllReviews(id!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const reviewData = getAllReviewQuery?.data?.data?.data || [];
  const reviewError = getAllReviewQuery?.error as AxiosError;
  const reviewErrorMessage =
    reviewError?.message || "An error occurred. Please try again later.";

  // Dynamically set limit to reviewData.length if limit is undefined
  const calculatedLimit = limit ?? reviewData.length;
  const businessReviewData =
    reviewData &&
    reviewData?.length > 0 &&
    reviewData?.slice(0, calculatedLimit);

  console.log(businessReviewData, "businessReviewData");
  const handleNavigateToReview = () => {
    navigate(`/review`);
    window.scrollTo(0, 0);
  };

  const handleNavigateReview = () => {
    navigate(`/review/${id}`);
    window.scrollTo(0, 0);
  };

  // Render
  return (
    <div style={{ minWidth: "100%" }}>
      {getAllReviewQuery?.isLoading ? (
        <CustomSpin />
      ) : getAllReviewQuery?.isError ? (
        <h1 className="error">{reviewErrorMessage}</h1>
      ) : (
        <div className={styles.wrapper}>
          <div style={{width:'100%'}}>
          <div   onClick={handleNavigateReview}  className={styles.reviewbtn}>
            <h1>Reviews</h1>

            { reviewData?.length > 0 && <div  className={styles.btnWrapper}>
              <p className={styles.btn}>See All</p>
              <Image
                width={20}
                src={ArrowIcon}
                alt="ArrowIcon"
                preview={false}
              />
            </div>}

          </div>
        
          </div>
          {businessReviewData && businessReviewData?.length > 0 ? (
            businessReviewData?.map((item, index) => (
              <ReviewCard key={index} item={item} />
            ))
          ) : (
            // <NoReviews navigate={navigate} />
            <div className={styles.review}>
              <p>No reviews added yet</p>
            </div>
          )}

          {reviewError && <p>{reviewErrorMessage}</p>}

          {canSeeAllBtn &&
            businessReviewData &&
            businessReviewData.length > 0 && (
              <div className={styles.seeBtn}>
                <Button
                  text="See All Reviews"
                  variant="transparent"
                  className="buttonStyle"
                  onClick={handleNavigateToReview}
                  AfterTexticon={
                    <Image
                      width={20}
                      src={ArrowIcon}
                      alt="ArrowIcon"
                      preview={false}
                    />
                  }
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
}

// Review Card Component
function ReviewCard({ item }: { item: ReviewDatum }) {
  return (
    <div className={styles.card}>
      <div className={styles.dateTimeWrapper}>
        <div>
          <span>{convertDate(item?.created_at) || ""}</span>
          <div></div>
          <span>{getTimeFromDate(item?.created_at) || ""}</span>
        </div>
        <span>{"N/A"}</span>
      </div>
      <div className={styles.starWrapper}>
        {countUpTo(
          item.rating || 0,
          <Image
            width={20}
            src={StarYellow}
            alt="StarYellow"
            preview={false}
          />,
          <Image width={20} src={StarIcon} alt="StarIcon" preview={false} />
        )}
      </div>
      <div className={styles.reviewContent}>{item.review}</div>
    </div>
  );
}

// No Reviews Component
// function NoReviews({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
//   return (
//     <div className={styles.NoReviewWrapper}>
//       <div className={styles.noReview}>
//         <Image
//           width={"8.3rem"}
//           src={EmptyIcon}
//           alt="EmptyIcon"
//           preview={false}
//         />
//         <p>No Reviews Posted Yet</p>
//         <p>Be the first person to rate this seller</p>

//         <div className={styles.emtBtn}>
//           <Button
//             text="Write A Review"
//             variant="transparent"
//             className="buttonStyle"
//             onClick={() => {
//               navigate("/write-review");
//             }}
//             icon={
//               <Image
//                 width={20}
//                 src={StarIconGreen}
//                 alt="StarIconGreen"
//                 preview={false}
//               />
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// Helper function to render stars based on the rating
function countUpTo(num: number, filled: JSX.Element, empty: JSX.Element) {
  return Array.from({ length: 5 }, (_, i) => (i < num ? filled : empty));
}
