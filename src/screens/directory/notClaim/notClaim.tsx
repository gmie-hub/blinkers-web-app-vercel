import styles from "./notClaim.module.scss";
import Button from "../../../customs/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import { Image, message, Modal } from "antd";
import Star from "../../../assets/Vector.svg";
import WhatsappLogo from "../../../assets/whatsapp.svg";
import InstagramIcon from "../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../assets/fbIcon.svg";
import HouseLock from "../../../assets/House Lock.svg";
import { countUpTo } from "../../home/trend";
import shareIcon from "../../../assets/share 2.svg";
import linkIcon from "../../../assets/link-2.svg";
import RelatedBusinesses from "../relatedBusinesses/relatedBusiness";
import TimeIcon from "../../../assets/time42.svg";
import LocationIcon from "../../../assets/locationnot.svg";
import CallIcon from "../../../assets/callclaim.svg";
import copyIcon from "../../../assets/copywhite.svg";
import { useQueries } from "@tanstack/react-query";
import { getBusinessById } from "../../request";
import { AxiosError } from "axios";
import RouteIndicator from "../../../customs/routeIndicator";
import CustomSpin from "../../../customs/spin";

// import SellersAds from "./postedAds/adsPostedbySeller";
const NotClaim = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true); // Manage review form visibility
  const [showCard, setShowCard] = useState(false); // Manage card visibility
  const { id } = useParams();
  const [openShare, setOpenShare] = useState(false);

  //   const hasReviews = reviewData?.lenght;
  //   console.log(hasReviews , "hasReviews")

  const textToCopy = "blinkers/ shopwithrinsyaccderb/e";

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success("Link copied to clipboard!");
      })
      .catch(() => {
        message.error("Failed to copy link. Please try again.");
      });
  };

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
    navigate(`/subscription-pricing`);
    window.scrollTo(0, 0);
  };

  const handleNavigateToWriteReview = () => {
    navigate(`/write-review`);
    window.scrollTo(0, 0);
  };

  const [getBusinessDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-business-details", id],
        queryFn: () => getBusinessById(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;
  const businessDetailsError = getBusinessDetailsQuery?.error as AxiosError;
  const businessDetailsErrorMessage =
    businessDetailsError?.message ||
    "An error occurred. Please try again later.";

  console.log(businessDetailsData, "businessDetailsData");
  return (
    <>
            {getBusinessDetailsQuery?.isLoading ? (
          <CustomSpin />
        ) : getBusinessDetailsQuery?.isError ? (
          <h1 className="error">{businessDetailsErrorMessage}</h1>
        ) : (
    
      <div className="wrapper">
      <RouteIndicator showBack/>
        {showContent && (
          <>
            <div className={styles.mainContainer}>
              <div className={styles.leftSection}>
                <div className={styles.card}>
                  <div className={styles.justifyCenter}>
                    <img src={businessDetailsData?.logo} alt="ProductIcon" />

                    <div className={styles.detailsflex}>
                      <p className={styles.name}>{businessDetailsData?.name}</p>
                      <p className={styles.subjectBg}>
                        {businessDetailsData?.category?.title}
                      </p>

                      <div className={styles.starWrapper}>
                        {countUpTo(
                          businessDetailsData?.average_rating || 0,
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
                      {businessDetailsData?.average_rating === 0 && (
                        <p style={{ paddingBlockEnd: "1.4rem" }}>
                          No reviews yet
                        </p>
                      )}
                      <p style={{ paddingBlockEnd: "0.4rem" }}>
                        {businessDetailsData?.total_followers}
                      </p>
                      <p>Followers</p>
                    </div>

                    <div className={styles.starWrapper2}>
                      <div
                        onClick={handleNavigateToWriteReview}
                        className={styles.message}
                      >
                        <Image src={Star} alt="Star" preview={false} />

                        <p>Write a review</p>
                      </div>
                      <div
                        onClick={() => {
                          setOpenShare(true);
                        }}
                        className={styles.message}
                      >
                        <Image
                          src={shareIcon}
                          alt="shareIcon"
                          preview={false}
                        />

                        <p>Share</p>
                      </div>
                      <div className={styles.message}>
                        <Image src={linkIcon} alt="linkIcon" preview={false} />

                        <p>Follow</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.info}>
                      <img  src={TimeIcon} alt="TimeIcon"  />

                      <div className={styles.open}>
                        <p>Opening Hours</p>
                        <p>Monday - Fridays (10am- 11pm)</p>
                      </div>
                    </div>
                    <div className={styles.info}>
                      <img
                        src={LocationIcon}
                        alt="LocationIcon"
                        width={60}
                      />
                      <p>{businessDetailsData?.address}</p>
                    </div>
                    <div className={styles.info}>
                      <img src={CallIcon} alt="CallIcon"  />

                      <p>{businessDetailsData?.phone}</p>
                    </div>
                  </div>

                  <div className={styles.chatBtn}>
                    <Button
                      onClick={() => handleClaim()}
                      text="Claim This Business"
                    />
                  </div>

                  <div className={styles.social}>
                    <Image
                      src={WhatsappLogo}
                      alt="WhatsappLogo"
                      preview={false}
                      onClick={() => {
                        if (businessDetailsData?.whatsapp) {
                          window.open(businessDetailsData.whatsapp, "_blank");
                        }
                      }}
                    />
                    <Image
                      //   width={40}
                      height={35}
                      src={FaceBookStoreIcon}
                      alt="FaceBookStoreIcon"
                      preview={false}
                      onClick={() => {
                        if (businessDetailsData?.facebook) {
                          window.open(businessDetailsData.facebook, "_blank");
                        }
                      }}
                    />
                    <Image
                      src={InstagramIcon}
                      alt="InstagramIcon"
                      preview={false}
                      onClick={() => {
                        if (businessDetailsData?.instagram) {
                          window.open(businessDetailsData.instagram, "_blank");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.rightSection}>
                <h1>About {businessDetailsData?.name}</h1>
                <p>{businessDetailsData?.about}</p>

                <div className={styles.photo}>
                  <h1>Photos</h1>
                  <p>No photos available yet</p>
                </div>
                <div className={styles.photo}>
                  <h1>Videos</h1>
                  <p>No Videos available yet</p>
                </div>
                <div className={styles.review}>
                  <h1>Reviews</h1>
                  <p>No Reviews available yet</p>
                </div>
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
            </div>
          </>
        )}

        {showCard && (
          <div className={styles.submittedCard}>
            <div className={styles.cardContent}>
              <Image src={HouseLock} alt={HouseLock} preview={false} />

              <h2>Subscribe to Claim This Business</h2>
              <p>
                Choose a subscription plan to be able to claim and manage your
                business.
              </p>
              <Button
                onClick={() => {
                  handleNavigateToSubPlan();
                }} // Show review form when "Okay" is clicked
                text="Check Out Subscription plan"
              />
            </div>
          </div>
        )}
        <Modal
          open={openShare}
          onCancel={() => setOpenShare(false)}
          centered
          title="Share Link"
          footer={null}
        >
          <div className={styles.share}>
            <p>blinkers/ shopwithrinsyaccderb/e</p>

            <Button
              onClick={handleCopyLink}
              icon={<Image src={copyIcon} alt={copyIcon} preview={false} />}
              className={styles.buttonStyle}
              text="Copy Link"
            />
          </div>
        </Modal>
      </div>
        )}
      <RelatedBusinesses showHeading={false} limit={4} />
    </>
  );
};
export default NotClaim;
