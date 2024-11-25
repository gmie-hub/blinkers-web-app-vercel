import { useNavigate } from "react-router-dom";
import { cardData } from "../data";
import styles from "./styles.module.scss";
import BackIcon from "../../../assets/back.svg";

interface Props {
  canSeeBtn?: boolean;
  limit?: number;
}

const MoreJobsLikeThis = ({
  canSeeBtn = true,
  limit = cardData?.length,
}: Props) => {
  const navigate = useNavigate();

  // Limit the reviews based on the passed `limit` prop
  const businessReviewData =
    cardData?.length > 0 ? cardData.slice(0, limit) : [];
  const businessReviewErrorMessage = "Failed to load reviews";

  return (
    <div className="wrapper">
      <div className={styles.whyWrapper}>
        {canSeeBtn && (
          <div onClick={() => navigate(-1)} className={styles.back}>
            <img src={BackIcon} alt="BackIcon" />
            <p>Back</p>
          </div>
        )}

        <div className={styles.cardContainer}>
          {/* Only map through the data if it's not empty */}
          {businessReviewData.length > 0 ? (
            businessReviewData.map((card, index) => (
              <div className={styles.chooseCard} key={index}>
                <div className={styles.cardWrapper}>
                  <div className={styles.icon}>{card.icon}</div>
                  <div className={styles.textContent}>
                    <h3>Customer Experience Manager</h3>
                    <p>Blinkers Nigeria</p>
                    {/* <p>{card.value}</p> Assuming card has a value to display */}
                  </div>
                </div>
                <div className={styles.full}>
                  <span>Full time</span> <span className={styles.dot}></span>
                  <span>Remote</span> <span className={styles.dot}></span>
                  <span>Mid level</span>
                  <p className={styles.posted}>Posted 18hrs ago</p>
                </div>
              </div>
            ))
          ) : (
            <p>{businessReviewErrorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreJobsLikeThis;
