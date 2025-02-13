import { Form, Formik, FormikValues } from "formik";
import Input from "../../../../customs/input/input";
import Button from "../../../../customs/button/button";
import styles from "./index.module.scss";
import { App, Image } from "antd";
import StarYellow from "../../../../assets/staryellow.svg";
import StarIcon from "../../../../assets/Vector.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoneIcon from "../../../../assets/Done.svg";
import * as Yup from 'yup';
import BackIcon from "../../../../assets/back.svg";
import { useMutation } from "@tanstack/react-query";
import {  WriteSellerReviewApi } from "../../../request";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";
import { errorMessage } from "../../../../utils/errorMessage";

const WriteReviewAds = () => {
  const [currentRating, setCurrentRating] = useState(0); // Track current rating
  const [showReviewForm, setShowReviewForm] = useState(true); // Manage review form visibility
  const [showCard, setShowCard] = useState(false); // Manage card visibility
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const user = useAtomValue(userAtom);
  const { id } = useParams();

  const handleSubmit = () => {
    setShowReviewForm(false); // Hide the review form
    setShowCard(true); // Show the card
  };

  const handleModalOkay = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const WriteReviewMutation = useMutation({
    mutationFn: WriteSellerReviewApi,
    mutationKey: ["write-review"],
  });

  const WriteReviewHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      to_user_id: id,
      from_user_id: user?.id,
      rating: currentRating,
      review: values?.review,
    };

    try {
      await WriteReviewMutation.mutateAsync(payload, {
        onSuccess: () => {
          resetForm();
          handleSubmit();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:errorMessage(error) || "An error occurred",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    review: Yup.string().required('Review is required'),
  });

  return (
    <div className="wrapper">
      <div className={styles.RewiwvWrapper}>
        <div>
          {/* Back button */}
          <div onClick={() => navigate(-1)} className={styles.back}>
            <Image width={9} src={BackIcon} alt="BackIcon" preview={false} />
            <p>Back</p>
          </div>

          {showReviewForm && (
            <Formik
              initialValues={{ review: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                WriteReviewHandler(values, resetForm);
              }}
            >
              {() => (
                <Form>
                  <div className={styles.cardreview}>
                    <h2 className={styles.write}>Write A Review</h2>

                    <p className={styles.adding}>
                      Add a rating. Tap on the icons to rate this seller
                    </p>

                    {/* Render stars */}
                    <div className={styles.starWrapper}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Image
                          key={star}
                          width={20}
                          src={star <= currentRating ? StarYellow : StarIcon}
                          alt="Star"
                          preview={false}
                          onClick={() => setCurrentRating(star)} // Handle star click
                          style={{ cursor: "pointer" }} // Make it clickable
                        />
                      ))}
                    </div>

                    <div className={styles.reviewInput}>
                      <Input
                        name="review"
                        placeholder="Write a review"
                        type="textarea"
                      />
                    </div>

                    <div className={styles.seeBtn}>
                      <Button
                        type="submit"
                        text={
                          WriteReviewMutation?.isPending ? "Loading..." : "Submit"
                        }
                        className="buttonStyle"
                        disabled={WriteReviewMutation?.isPending}
                      />
                    </div>
                  </div>
                </Form>
              )}
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

export default WriteReviewAds;
