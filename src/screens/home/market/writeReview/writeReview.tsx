

import { Form, Formik } from "formik";
import Input from "../../../../customs/input/input";
import Button from "../../../../customs/button/button";
import styles from "./index.module.scss";
import { countUpTo } from "../../trend";
import { Image } from "antd";
import StarYellow from "../../../../assets/staryellow.svg";
import StarIcon from "../../../../assets/Vector.svg";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoneIcon from "../../../../assets/Done.svg";

import BackIcon from "../../../../assets/back.svg";


const WriteReview= () => {
  const [showReviewForm, setShowReviewForm] = useState(true); // Manage review form visibility
  const [showCard, setShowCard] = useState(false); // Manage card visibility
  const navigate = useNavigate();

  // const handleNavigateToProductDetails = useCallback(
  //   (id?: number) => {
  //     navigate(`/${routePrefix}/${id}`);
  //     window.scrollTo(0, 0);
  //   },
  //   [navigate, routePrefix]
  // );

  const handleSubmit = () => {
    setShowReviewForm(false); // Hide the review form
    setShowCard(true); // Show the card
  };

  const handleModalOkay = useCallback(() => {
    navigate(-1);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="wrapper">
  <div className={styles.RewiwvWrapper}>
      <div>
        {/* Back button */}
        <div
          onClick={() =>navigate(-1)}
          className={styles.back}
        >
          <Image width={9} src={BackIcon} alt="BackIcon" preview={false} />
          <p>Back</p>
        </div>

        {/* Conditional rendering: Show form if showReviewForm is true */}
        {showReviewForm && (
          <Formik
            initialValues={{ message: "", selectedItems: [] }}
            onSubmit={(values) => {
              console.log(values);
              handleSubmit(); // Trigger card display and hide the form
            }}
          >
            <Form>
              <div className={styles.cardreview}>
                <h2 className={styles.write}>Write A Review</h2>

                <p className={styles.adding}>
                  Add a rating. Tap on the icons to rate this seller
                </p>

                <div className={styles.starWrapper}>
                  {countUpTo(
                    0,
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

                <div className={styles.reviewInput}>
                  <Input
                    name="review"
                    placeholder="Write a review"
                    type="textarea"
                  />
                </div>

                <div className={styles.seeBtn}>
                  <Button type="submit" text="Submit" className="buttonStyle" />
                </div>
              </div>
            </Form>
          </Formik>
        )}

        {/* Card display after form submission */}
        {showCard && (
          <div className={styles.submittedCard}>
            <div className={styles.cardContent}>
              <Image src={DoneIcon} alt={DoneIcon} preview={false} />

              <h2>Review Submitted</h2>
              <p>Your Rating and Review Has Been Submitted Successfully</p>
              <Button
                onClick={handleModalOkay} // Show review form when "Okay" is clicked
                text="Okay"
                className="buttonStyle"
              />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  
  );
};

export default WriteReview;
