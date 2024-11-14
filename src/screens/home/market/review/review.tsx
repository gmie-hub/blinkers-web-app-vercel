import styles from "./review.module.scss";
import { useNavigate } from "react-router-dom";
import StarYellow from "../../../../assets/staryellow.svg";
import StarIcon from "../../../../assets/Vector.svg";
import { Image } from "antd";
import BackIncon from "../../../../assets/back.svg";
import { useCallback } from "react";

// Dummy array for business reviews
const dummyBusinessReviewData = [
  {
    updated_at: "2024-11-10", // Date of the review
    rating: 4, // Rating (out of 5)
    review:
      "Good customer service and fast delivery. I’m glad I shopped from Shop with Rinsy",
    reviewer: "Olajumoke",
  },
  {
    updated_at: "2024-11-08",
    rating: 5,
    review: "Exceptional experience!",
    reviewer: "John Doe",
  },
  {
    updated_at: "2024-11-05",
    rating: 3,
    review: "Good, but room for improvement.",
    reviewer: "Jane Smith",
  },
];

export default function Reviews() {
  const navigate = useNavigate();
  // Use dummy data for business reviews
  const businessReviewData = dummyBusinessReviewData;
  const businessReviewError = false; // Dummy error handling
  const businessReviewErrorMessage = "Failed to load reviews";

  const handleNavigateToProductDetails = useCallback(
    (id?: number) => {
      navigate(`/product-details/${id}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  return (
    <div className="wrapper">
        <div onClick={() => handleNavigateToProductDetails(2)} className={styles.back}>
          <Image width={9} src={BackIncon} alt="BackIncon" preview={false} />
          <p >Back</p>
        </div>
      
        <div className={styles.reviweWrapper}>
        <div className={styles.promoHead}>
            <p>Reviews</p>
          </div>
          <div className={styles.wrappers}>
            {businessReviewData.length > 0 ? (
              businessReviewData.map((item, index) => (
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
              ))
            ) : (
              <p>No reviews available.</p>
            )}
            {businessReviewError && <p>{businessReviewErrorMessage}</p>}
          </div>
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
  return result; // Return the array
}
