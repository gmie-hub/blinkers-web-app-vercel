import Icon from "/Container.svg";
import styles from "./sellersProfile.module.scss";
import Reviews from "../market/productDetails/tabs/review";
import Button from "../../../customs/button/button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import { Image } from "antd";
import ProductIcon from "../../../assets/Ellipse 840.svg";
import StarYellow from "../../../assets/staryellow.svg";
import WhatsappLogo from "../../../assets/whatsapp.svg";
import InstagramIcon from "../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../assets/facebook.svg";
import BrowseLogo from "../../../assets/Icon (4).svg";
import CallLogo from "../../../assets/call.svg";
import FlagLogo from "../../../assets/flag.svg";
import SellersAds from "./postedAds/adsPostedbySeller";
const SellerProfile = () => {
  const navigate = useNavigate();

  const handleNavigateToReview = useCallback(() => {
    navigate(`/review`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleNavigateToSellersAds = useCallback(() => {
    navigate(`/sellers-posted-ads`);
    window.scrollTo(0, 0);
  }, [navigate]);


  const handleNavigateToWriteReview = useCallback(() => {
    navigate(`/write-review`);
    window.scrollTo(0, 0);
  }, [navigate]);


  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
        }}
      >
        <div className={styles.home}>
          <p className={styles.picHead}>Seller’s Profile</p>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.leftSection}>
          <div className={styles.card}>
            <div>
              <Image src={ProductIcon} alt="ProductIcon" preview={false} />

              <div className={styles.detailsflex}>
                <p className={styles.name}>Omorinsola’s Store</p>
                <div className={styles.starWrapper}>
                  <span className={styles.star}>
                    <Image
                      width={20}
                      src={StarYellow}
                      alt="StarYellow"
                      preview={false}
                    />
                    (18 ratings)
                    <span className={styles.dot}></span>{" "}
                    <span>10 Followers</span>
                  </span>
                </div>
              </div>

              <p>Member Since Sept 2024</p>
              <p style={{ paddingBlock: "0.2rem" }}>
                Number of Ads Posted: <span> 100</span>{" "}
              </p>
            </div>
            <div className={styles.followBtn}>
              <Button text="Follow" variant="green" />

              <Button variant="white" text="Write A Review" onClick={()=>{handleNavigateToWriteReview()}} />
            </div>
            <div className={styles.info}>
              <p style={{ paddingBlockStart: "1rem" }}>
                shopwithrinsy@gmail.com
              </p>
              <p>09012345678</p>
              <p>4, blinkers street, Lekki, Nigeria</p>
              <p>www.shopwithrinsy.com</p>
            </div>

            <div className={styles.chatBtn}>
              <Button
                icon={<Image src={CallLogo} alt="CallLogo" preview={false} />}
                text="Chat With Seller"
              />
            </div>

            <div className={styles.flag}>
              <Button
                icon={<Image src={FlagLogo} alt="FlagLogo" preview={false} />}
                text="Flag Seller"
                variant="redOutline"
              />
            </div>

            <div className={styles.social}>
              <Image src={WhatsappLogo} alt="WhatsappLogo" preview={false} />
              <Image src={InstagramIcon} alt="InstagramIcon" preview={false} />
              <Image
                src={FaceBookStoreIcon}
                alt="FaceBookStoreIcon"
                preview={false}
              />
              <Image src={BrowseLogo} alt="BrowseLogo" preview={false} />
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.reviewbtn}>
            <p className={styles.title}> Review</p>

            <div onClick={handleNavigateToReview} className={styles.btnWrapper}>
              <p className={styles.btn}>See All</p>
              <Image
                width={20}
                src={ArrowIcon}
                alt="ArrowIcon"
                preview={false}
              />
            </div>
          </div>
          <Reviews canSellAllBtn={false} limit={4} />
        </div>
      </div>
      <div>
        <div className="wrapper">
        <div className={styles.reviewbtn}>
          <p className={styles.title}> Ads Posted By This Seller</p>

          <div onClick={handleNavigateToSellersAds} className={styles.btnWrapper}>
            <p className={styles.btn}>See All</p>
            <Image width={20} src={ArrowIcon} alt="ArrowIcon" preview={false} />
          </div>
        </div>
        </div>
       

        <SellersAds showHeading={false} limit={4} />
      </div>
    </div>
  );
};
export default SellerProfile;
