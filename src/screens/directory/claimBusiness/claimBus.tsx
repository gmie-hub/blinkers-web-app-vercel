import styles from "./claimBus.module.scss";
import Button from "../../../customs/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import { App, Image } from "antd";
import ProductIcon from "../../../assets/Frame 215.svg";
import Star from "../../../assets/Vector.svg";
import WhatsappLogo from "../../../assets/whatsapp.svg";
import InstagramIcon from "../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../assets/fbIcon.svg";
import DoneIcon from "../../../assets/Done.svg";
import { countUpTo } from "../../home/trend";
import HeadIcon from "../../../assets/Ehead.svg";
import RelatedBusinesses from "../relatedBusinesses/relatedBusiness";
import Upload from "../../../customs/upload/upload";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import Input from "../../../customs/input/input";
import TimeIcon from "../../../assets/time42.svg";
import LocationIcon from "../../../assets/locationnot.svg";
import CallIcon from "../../../assets/callclaim.svg";
import { ClaimBusinessApi } from "../../request";
import { useMutation } from "@tanstack/react-query";
import { userAtom } from "../../../utils/store";
import { useAtomValue } from "jotai";
import RouteIndicator from "../../../customs/routeIndicator";
import * as Yup from "yup";

const ClaimBusiness = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true); // Manage review form visibility
  const [showCard, setShowCard] = useState(false); // Manage card visibility
  const [upload, setUpload] = useState<File | null>(null);
  const { notification } = App.useApp();
  const user = useAtomValue(userAtom);
  const { id } = useParams();

  //   const hasReviews = reviewData?.lenght;
  //   console.log(hasReviews , "hasReviews")

  const handleClaim = () => {
    setShowContent(false); // Hide the review form
    setShowCard(true); // Show the card
    window.scrollTo(0, 0);
  };

  const handleNavigateToRelatedBusiness = () => {
    navigate(`/related-businesses/${id}`);
    window.scrollTo(0, 0);
  };

  const handleNavigateToSubPlan = () => {
    navigate(`/claimed-business`);
    window.scrollTo(0, 0);
  };

  const createBusinessMutation = useMutation({
    mutationFn: ClaimBusinessApi,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (!e.target?.files) return;
    const selectedFile = e.target?.files[0];

    // Define valid file types
    const validFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
      "application/msword", // doc
      "application/vnd.ms-powerpoint", // ppt
    ];

    // Validate if the file type is valid
    if (!validFileTypes.includes(selectedFile.type)) {
      notification.error({
        message: "Invalid File Type",
        description:
          "The logo field must be a file of type: jpg, jpeg, png, gif, docx, doc, ppt.",
      });
      return;
    }
    setFieldValue("imageFile", selectedFile);
    setUpload(selectedFile);
  };

  const clearFile = () => {
    setUpload(null);
  };
  const claimBusinessHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();
    const user_id = user?.id;
    // const business_id = user?.a
    if (user_id) {
      formData.append("user_id", user_id?.toString());
    }
    if (id) {
      formData.append("business_id", id?.toString());
    }
    if (upload) {
      formData.append("doc", upload);
    }
    formData.append("message", values?.message);

    try {
      await createBusinessMutation.mutateAsync(formData, {
        onSuccess: () => {
          // notification.success({
          //   message: 'Success',
          //   description: data?.message,
          // });
          resetForm();
          clearFile();
          handleClaim();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
      imageFile: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      claimBusinessHandler(values, resetForm);
    },
  });

  return (
    <div className={styles.wrapper}>
     <RouteIndicator showBack/>
      {showContent && (
        <div className={styles.claimWrapper}>
          <div className={styles.top}>
            <h1>Claim This Business</h1>
            <p>
              To claim this business, you have to verify that you are the owner
              of the business
            </p>
          </div>

          <div className={styles.mainContainer}>
            <div className={styles.leftSection}>
              <div className={styles.card}>
                <div>
                  <Image src={ProductIcon} alt="ProductIcon" preview={false} />

                  <div className={styles.justifyCenter}>
                    <p className={styles.name}>Omorinsola’s Store</p>
                    <p className={styles.subjectBg}>Fashion Accessories</p>

                    <div className={styles.starWrapper}>
                      {countUpTo(
                        5,
                        <Image
                          width={20}
                          src={Star}
                          alt="star"
                          preview={false}
                        />,
                        <Image
                          width={20}
                          src={Star}
                          alt="Star"
                          preview={false}
                        />
                      )}{" "}
                    </div>
                    <p style={{ paddingBlockEnd: "1.4rem" }}>No reviews yet</p>
                    <p style={{ paddingBlockEnd: "0.4rem" }}>100</p>
                    <p>Followers</p>
                  </div>
                </div>

                <div>
                  <div className={styles.info}>
                    <Image src={TimeIcon} alt="TimeIcon" preview={false} />

                    <div className={styles.open}>
                      <p>Opening Hours</p>
                      <p>Monday - Fridays (10am- 11pm)</p>
                    </div>
                  </div>
                  <div className={styles.info}>
                    <Image
                      src={LocationIcon}
                      alt="LocationIcon"
                      preview={false}
                    />
                    4, blinkers street, Lekki, Nigeria
                  </div>
                  <div className={styles.info}>
                    <Image src={CallIcon} alt="CallIcon" preview={false} />

                    <p>09012345678</p>
                  </div>
                </div>

                <div className={styles.social}>
                  <Image
                    src={WhatsappLogo}
                    alt="WhatsappLogo"
                    preview={false}
                  />
                  <Image
                    //   width={40}
                    height={35}
                    src={FaceBookStoreIcon}
                    alt="FaceBookStoreIcon"
                    preview={false}
                  />
                  <Image
                    src={InstagramIcon}
                    alt="InstagramIcon"
                    preview={false}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rightSection}>
              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <div className={styles.info}>
                    <Image src={HeadIcon} alt="HeadIcon" preview={false} />

                    <div className={styles.open}>
                      <p>Ogunsola Omorinsola</p>
                      <p>ogunsolaomorinsola@gmail.com</p>
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <div>
                      <p>
                        Upload a document to prove that you’re the owner of this
                        business (CAC, Business letterhead etc.)
                      </p>
                      <br />

                      {upload ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>{upload.name}</p>

                          <span onClick={clearFile}>X</span>
                        </div>
                      ) : (
                        <Upload
                          name="imageFile"
                          // label="Upload a document to prove that you’re the owner of this business (CAC, Business letterhead etc.)"
                          onChange={(e) =>
                            handleFileChange(e, formik?.setFieldValue)
                          }
                        />
                      )}
                    </div>

                    <div className={styles.inputCon}>
                      <Input
                        name="message"
                        placeholder="Write a message"
                        type="textarea"
                        label="Additional Message (Optional)"
                      />
                    </div>
                  </div>

                  <Button disabled={createBusinessMutation?.isPending} type="submit" text={createBusinessMutation?.isPending ? "Loading" : "Submit Form"} />
                </Form>
              </FormikProvider>
            </div>
          </div>

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

            <RelatedBusinesses showHeading={false} limit={4} />
          </div>
        </div>
      )}

      {showCard && (
        <div className={styles.submittedCard}>
          <div className={styles.cardContent}>
            <Image src={DoneIcon} alt={DoneIcon} preview={false} />

            <h2>Details Submitted Successfully</h2>
            <p>
              We’ve received your details and once we verify it, you will be
              able to edit your business details in your profile. We will
              contact you via email.
            </p>
            <Button
             text="Okay"
             onClick={handleNavigateToSubPlan}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ClaimBusiness;
