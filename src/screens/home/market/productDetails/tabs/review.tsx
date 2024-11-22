import styles from "./details.module.scss";
import { useNavigate } from "react-router-dom";
import StarYellow from "../../../../../assets/staryellow.svg";
import StarIcon from "../../../../../assets/Vector.svg";
import ArrowIcon from "../../../../../assets/arrow-btn.svg";
import StarIconGreen from "../../../../../assets/star.svg";
import EmptyIcon from "../../../../../assets/Empty Image.svg";
import { Image } from "antd";
import Button from "../../../../../customs/button/button";
import { useCallback } from "react";

// Dummy array for business reviews
export const reviewData: any = [
  {
    updated_at: "2024-11-10",
    rating: 4,
    review:
      "Good customer service and fast delivery. I’m glad I shopped from Shop with Rinsy",
    reviewer: "Olajumoke",
  },
  // {
  //   updated_at: "2024-11-08",
  //   rating: 5,
  //   review: "Exceptional experience!",
  //   reviewer: "John Doe",
  // },
  // {
  //   updated_at: "2024-11-05",
  //   rating: 3,
  //   review: "Good, but room for improvement.",
  //   reviewer: "Jane Smith",
  // },
  // {
  //   updated_at: "2024-11-05",
  //   rating: 1,
  //   review: "Disappointing service.",
  //   reviewer: "Jane Smith",
  // },
  // {
  //   updated_at: "2024-11-05",
  //   rating: 2,
  //   review: "Could be better.",
  //   reviewer: "Jane Smith",
  // },
];

// Accept `canSellAllBtn` and `limit` as props
export default function Reviews({
  canSeeAllBtn = true,
  limit = reviewData.length, // Default to showing all reviews if limit is not provided
}: {
  canSeeAllBtn?: boolean;
  limit?: number;
}) {
  const navigate = useNavigate();

  // Limit the reviews based on the passed `limit` prop
  const businessReviewData =
  reviewData?.length > 0 &&
  reviewData?.slice(0, limit);
  const businessReviewError = false;
  const businessReviewErrorMessage = "Failed to load reviews";

  console.log(businessReviewData?.length, "len");
  const handleNavigateToReview = useCallback(() => {
    navigate(`/review`);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div style={{ minWidth: "100%" }}>
      <div className={styles.wrapper}>
        {businessReviewData.length > 0 &&
          businessReviewData.map((item: any, index: any) => (
            <div className={styles.card} key={index}>
              <div className={styles.dateTimeWrapper}>
                <div>
                  <span>{item?.updated_at || ""}</span>
                  <div></div>
                  <span>{item?.updated_at || ""}</span>
                </div>
                <span>{item?.reviewer || ""}</span>
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
          ))}
        {businessReviewData?.length === undefined && (
          <div className={styles.NoReviewWrapper}>
            <div className={styles.noReview}>
              <Image
                width={"8.3rem"}
                src={EmptyIcon}
                alt="EmptyIcon"
                preview={false}
              />
              <p>No Reviews Posted Yet</p>
              <p>Be the first person to rate this seller</p>

              <div className={styles.emtBtn}>
                <Button
                  text="Write A Review"
                  variant="transparent"
                  className="buttonStyle"
                  onClick={()=>{navigate('/write-review')}}
                  icon={
                    <Image
                      width={20}
                      src={StarIconGreen}
                      alt="StarIconGreen"
                      preview={false}
                    />
                  }
                />
              </div>
            </div>
          </div>
        )}
        {businessReviewError && <p>{businessReviewErrorMessage}</p>}

        {canSeeAllBtn && (businessReviewData.length > 0  || businessReviewData.length === undefined )&& (
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
  return result;
}