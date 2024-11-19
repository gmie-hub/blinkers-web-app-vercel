import styles from "./claimBus.module.scss";
import Button from "../../../customs/button/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import { Image } from "antd";
import ProductIcon from "../../../assets/Frame 215.svg";
import Star from "../../../assets/Vector.svg";
import WhatsappLogo from "../../../assets/whatsapp.svg";
import InstagramIcon from "../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../assets/fbIcon.svg";
import DoneIcon from "../../../assets/Done.svg";
import { countUpTo } from "../../home/trend";
import HeadIcon from "../../../assets/Ehead.svg";
import linkIcon from "../../../assets/link-2.svg";
import RelatedBusinesses from "../relatedBusinesses/relatedBusiness";
import Upload from "../../../customs/upload/upload";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import Input from "../../../customs/input/input";

// import SellersAds from "./postedAds/adsPostedbySeller";
const ClaimBusiness = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true); // Manage review form visibility
  const [showCard, setShowCard] = useState(false); // Manage card visibility
  const [uploadLogo, setUploadLogo] = useState<File | null>(null);

  //   const hasReviews = reviewData?.lenght;
  //   console.log(hasReviews , "hasReviews")

  const clearFileLogo = () => {
    setUploadLogo(null);
  };

  const handleFileChangeLogo = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (!e.target?.files) return;
    const selectedFile = e.target?.files[0];
    setUploadLogo(selectedFile);
    setFieldValue("imageLogo", selectedFile); // Set the file in Formik
  };
  const handleClaim = () => {
    setShowContent(false); // Hide the review form
    setShowCard(true); // Show the card
    window.scrollTo(0, 0);
  };

  const handleNavigateToRelatedBusiness = useCallback(() => {
    navigate(`/related-businesses`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleNavigateToSubPlan = useCallback(() => {
    navigate(`/subscription-pricing`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const formik = useFormik<FormikValues>({
    initialValues: {
      message: "",
      file: "",
    },
    onSubmit: () => {},
  });

  return (
    <div className={styles.wrapper}>
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

                  <div className={styles.detailsflex}>
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
                    <Image src={linkIcon} alt="linkIcon" preview={false} />

                    <div className={styles.open}>
                      <p>Opening Hours</p>
                      <p>Monday - Fridays (10am- 11pm)</p>
                    </div>
                  </div>
                  <div className={styles.info}>
                    <Image src={linkIcon} alt="linkIcon" preview={false} />
                    4, blinkers street, Lekki, Nigeria
                  </div>
                  <div className={styles.info}>
                    <Image src={linkIcon} alt="linkIcon" preview={false} />

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
                <Form>
                  <div className={styles.info}>
                    <Image src={HeadIcon} alt="HeadIcon" preview={false} />

                    <div className={styles.open}>
                      <p>Ogunsola Omorinsola</p>
                      <p>ogunsolaomorinsola@gmail.com</p>
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    {/* {uploadLogo ? (
                      <div className="small-gap">
                        <Image />
                        <span>{uploadLogo.name}</span>
                        <Button
                          onClick={clearFileLogo}
                          variant="white"
                          text="x"
                        />
                      </div>
                    ) : (
                      <Upload
                        name="imageLogo"
                        label="Upload a document to prove that you’re the owner of this business (CAC, Business letterhead etc.)"
                        onChange={(e) =>
                          handleFileChangeLogo(e, formik?.setFieldValue)
                        }
                      />
                    )} */}

                    <div className={styles.inputCon}>
                      <Input
                        name="review"
                        placeholder="Write a message"
                        type="textarea"
                        label="Additional Message (Optional)"
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleClaim()} text="Submit Form" />
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
              onClick={() => {
                handleNavigateToSubPlan();
              }} // Show review form when "Okay" is clicked
              text="Okay"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ClaimBusiness;
