import Card from "../../../../customs/card/card";
import styles from "./review.module.scss";
import Star from "../../../../assets/Vector.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import { AxiosError } from "axios";
import { useQueries } from "@tanstack/react-query";
import { getAllReviews } from "../../../request";
import { formatDateOnly, getTimeFromDate } from "../../../../utils/formatTime";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../utils/store";
import Input from "../../../../customs/input/input";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "../../../../customs/button/button";
import CustomSpin from "../../../../customs/spin";
import { useState } from "react";

export default function Reviews() {
  const user = useAtomValue(userAtom);

  const [activeReview, setActiveReview] = useState<number | null>(null); // Track the active review index

  const handleReviewClick = (index: number) => {
    setActiveReview((prev) => (prev === index ? null : index)); // Toggle the active review
  };

  const mockReviewsData = {
    data: {
      data: [
        {
          id: 1,
          updated_at: "2025-01-10T15:45:00Z",
          rating: 4,
          review: "Great service! Will definitely recommend to others.",
        },
        {
          id: 2,
          updated_at: "2025-01-12T10:30:00Z",
          rating: 5,
          review: "Absolutely fantastic experience. Exceeded my expectations!",
        },
        {
          id: 3,
          updated_at: "2025-01-13T08:15:00Z",
          rating: 3,
          review: "It was okay, but there's room for improvement.",
        },
        {
          id: 4,
          updated_at: "2025-01-14T19:00:00Z",
          rating: 2,
          review: "Not satisfied. The service was below average.",
        },
      ],
    },
  };

  const [getAllBusinessReviewQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-business-review"],
        queryFn: () => getAllReviews(user?.business?.id?.toString()!),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!user?.business?.id,
      },
    ],
  });

  const businessReviewData =
    mockReviewsData?.data?.data || getAllBusinessReviewQuery?.data?.data?.data;
  const businessReviewError = getAllBusinessReviewQuery?.error as AxiosError;
  const businessReviewErrorMessage =
    businessReviewError?.message ||
    "An error occurred. Please try again later.";

  const validationSchema = Yup.object().shape({
    reply: Yup.string().required("required"),
  });
  return (
    <>
      {getAllBusinessReviewQuery?.isLoading ? (
        <CustomSpin />
      ) : getAllBusinessReviewQuery?.isError ? (
        <h1 className="error">{businessReviewErrorMessage}</h1>
      ) : (
        <div className={styles.wrapper}>
          {businessReviewData && businessReviewData?.length > 0 ? (
            businessReviewData?.map((item: any, index: number) => (
              <Card key={item.id || index} style={styles.card}>
                <div
                  className={styles.dateTimeWrapper}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <span>{formatDateOnly(item?.updated_at || "")}</span>
                    <div></div>
                    <span>{getTimeFromDate(item?.updated_at || "")}</span>
                  </div>
                </div>
                <div className={styles.starWrapper}>
                  {countUpTo(
                    item?.rating,
                    <img width={13} src={StarYellow} alt="Star Yellow" />,
                    <img width={13} src={Star} alt="Star" />
                  )}
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <p>{item?.review}</p>


                  <Button
                   onClick={() => handleReviewClick(index)}
                    variant="green"
                    type="button"
                    disabled={false}
                    text="Reply"
                    className="buttonStyle"
                  />
                </div>

                {activeReview === index && ( // Show input and button only for the active review
                  <Formik
                    initialValues={{
                      reply: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                      // handleReplySubmit(values, item.id); // Handle the reply submission
                      resetForm();
                    }}
                    validationSchema={validationSchema}
                  >
                    {({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Input
                          name="reply"
                          placeholder="Write a reply "
                          type="textarea"
                        />
                        <div className={styles.btnRight}>
                          <Button
                            variant="green"
                            type="button"
                            disabled={false}
                            text="Send"
                            className="buttonStyle"
                          />
                        </div>
                      </form>
                    )}
                  </Formik>
                )}
              </Card>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
          {businessReviewError && <p>{businessReviewErrorMessage}</p>}
        </div>
      )}
    </>
  );

  // return (
  //   <>    {getAllBusinessReviewQuery?.isLoading ? (
  //       <CustomSpin />
  //     ) : getAllBusinessReviewQuery?.isError ? (
  //       <h1 className="error">{businessReviewErrorMessage}</h1>
  //     ) : (

  //   <div className={styles.wrapper}>
  //     {businessReviewData && businessReviewData?.length > 0 ? (
  //       businessReviewData?.map((item: any, index: number) => (
  //         <Card key={item.id || index} style={styles.card}>
  //           <div className={styles.dateTimeWrapper}>
  //             <div>
  //               <span>{formatDateOnly(item?.updated_at || "")}</span>
  //               <div></div>
  //               <span>{getTimeFromDate(item?.updated_at || "")}</span>
  //             </div>
  //           </div>
  //           <div className={styles.starWrapper}>
  //             {countUpTo(
  //               item?.rating,
  //               <img width={13} src={StarYellow} alt="Star Yellow" />,
  //               <img width={13} src={Star} alt="Star" />
  //             )}{" "}
  //           </div>
  //           <div>{item?.review}</div>
  //           <Formik
  //             initialValues={{
  //               reply: "",
  //             }}
  //             onSubmit={() => {
  //               // createBusinessHandler(values, resetForm);
  //             }}
  //             enableReinitialize={true}
  //             validationSchema={validationSchema}
  //           >
  //               <div>
  //               <Input
  //               name="reply"
  //               placeholder="Write a reply "
  //               type="textarea"
  //             />
  //             <div className={styles.btnRight}>

  //             <Button
  //               variant="green"
  //               type="submit"
  //               disabled={false}
  //               text="Send"
  //               className='buttonStyle'
  //             />
  //             </div>

  //               </div>

  //           </Formik>
  //         </Card>
  //       ))
  //     ) : (
  //       <p>No reviews available.</p> // Display a message when there are no reviews
  //     )}
  //     {businessReviewError && <p>{businessReviewErrorMessage}</p>}{" "}
  //     {/* Display error message if any */}
  //   </div>
  //      )}
  //      </>

  // );
}

function countUpTo(num: number, element: JSX.Element, element1: JSX.Element) {
  const result = [];
  for (let i = 1; i <= 5; i++) {
    if (i > num) result.push(element1);
    else result.push(element);
  }
  return result; // Return the array
}
