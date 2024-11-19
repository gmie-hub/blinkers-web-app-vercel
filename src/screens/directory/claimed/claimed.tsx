import styles from "./styles.module.scss";
import Button from "../../../customs/button/button";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import { Image, Modal,message } from "antd";
import ProductIcon from "../../../assets/Frame 215.svg";
import Star from "../../../assets/Vector.svg";
import WhatsappLogo from "../../../assets/whatsapp.svg";
import InstagramIcon from "../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../assets/fbIcon.svg";
import { countUpTo } from "../../home/trend";
import shareIcon from "../../../assets/share 2.svg";
import linkIcon from "../../../assets/link-2.svg";
import RelatedBusinesses from "../relatedBusinesses/relatedBusiness";
import StarYellow from "../../../assets/staryellow.svg";
import verifyIcon from "../../../assets/verify.svg";
import copyIcon from "../../../assets/copywhite.svg";
import WriteReview from "../../home/market/writeReview/writeReview";
import BackIcon from "../../../assets/back.svg";

// import SellersAds from "./postedAds/adsPostedbySeller";
const Claimed = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true); // Manage review form visibility
  const [showWriteReview, setShowWriteReview] = useState(false); // Manage card visibility

  const [openShare, setOpenShare] = useState(false); 

  //   const hasReviews = reviewData?.lenght;
  //   console.log(hasReviews , "hasReviews")


    const textToCopy = "blinkers/ shopwithrinsyaccderb/e";
  
    const handleCopyLink = useCallback(() => {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          message.success("Link copied to clipboard!");
        })
        .catch(() => {
          message.error("Failed to copy link. Please try again.");
        });
    }, [textToCopy]);

  const handleNavigateToWriteReview = () => {
    setShowContent(false); // Hide the review form
    setShowWriteReview(true); // Show the card
    window.scrollTo(0, 0);
  };

  const handleNavigateToBack = () => {
    setShowContent(true); // Hide the review form
    setShowWriteReview(false); // Show the card
    window.scrollTo(0, 0);
  };
//   const handleNavigateToWriteReview = useCallback(() => {
//     navigate(`/write-review`);
//     window.scrollTo(0, 0);
//   }, [navigate]);

  const handleNavigateToRelatedBusiness = useCallback(() => {
    navigate(`/related-businesses`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleNavigateToSubPlan = useCallback(() => {
    navigate(`/subscription-pricing`);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="wrapper">
      {showContent && (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.leftSection}>
              <div className={styles.card}>
                <div>
                  <Image src={ProductIcon} alt="ProductIcon" preview={false} />

                  <div className={styles.detailsflex}>
                    <div className={styles.verify}>
                      <p className={styles.name}>Omorinsola’s Store</p>

                      <Image
                        width={20}
                        src={verifyIcon}
                        alt="verifyIcon"
                        preview={false}
                      />
                    </div>
                    <p className={styles.subjectBg}>Fashion Accessories</p>

                    <div className={styles.starWrapper}>
                      {countUpTo(
                        5,
                        <Image
                          width={20}
                          src={StarYellow}
                          alt="StarYellow"
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
                    <p style={{ paddingBlockEnd: "1.4rem" }}>
                      5.0 (15 Ratings)
                    </p>
                    <p style={{ paddingBlockEnd: "0.4rem" }}>100</p>
                    <p>Followers</p>
                  </div>

                  <div className={styles.starWrapper2}>
                    <div
                      onClick={() => {
                        handleNavigateToWriteReview();
                      }}
                      className={styles.message}
                    >
                      <Image src={Star} alt="Star" preview={false} />

                      <p>Write a review</p>
                    </div>
                    <div onClick={()=>{setOpenShare(true)}} className={styles.message}>
                      <Image src={shareIcon} alt="shareIcon" preview={false} />

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
                  <div className={styles.info}>
                    <Image src={linkIcon} alt="linkIcon" preview={false} />

                    <p>shopwithrinsy@gmail.com</p>
                  </div>
                  <div className={styles.info}>
                    <Image src={linkIcon} alt="linkIcon" preview={false} />

                    <p>www.shopwithrinsy.com</p>
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
              <h1>About Shop With Rinsy</h1>
              <p>
                Shop with Rinsy encapsulates the meaning of beauty and elegance.
                Whilst delivering both in the midst of luxury and elegance, the
                peninsula’s ultimate getaway destination is also the ultimate
                place to host your next event. Shop with Rinsy encapsulates the
                meaning of beauty and elegance. Whilst delivering both in the
                midst of luxury and elegance, the peninsula’s ultimate getaway
                destination is also the ultimate place to host your next event.
              </p>

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

            <RelatedBusinesses showHeading={false} limit={4} />
          </div>
        </>
      )}

      {showWriteReview && (
        <div>
        <div
          onClick={() => handleNavigateToBack()}
          className={styles.back}
        >
          <Image width={9} src={BackIcon} alt="BackIcon" preview={false} />
          <p>Back</p>
        </div>
              <WriteReview />
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
            onClick={
                handleCopyLink
            }
            icon={ <Image src={copyIcon} alt={copyIcon} preview={false} />        }
            className={styles.buttonStyle}
            text="Copy Link"
          />
        </div>
      </Modal>
    </div>
  );
};
export default Claimed;
