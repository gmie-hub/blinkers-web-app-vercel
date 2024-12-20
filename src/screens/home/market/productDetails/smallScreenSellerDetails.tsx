import styles from "./smallscreen.module.scss";
import { Image, Modal, Tabs, TabsProps } from "antd";
import Button from "../../../../customs/button/button";
import WhatsappLogo from "../../../../assets/whatsapp.svg";
import InstagramIcon from "../../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../../assets/fbIcon.svg";
import BrowseLogo from "../../../../assets/Icon (4).svg";
import CallLogo from "../../../../assets/click.svg";
import FlagLogo from "../../../../assets/flag.svg";
import CopyIcon from "../../../../assets/copy.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import { Form, Formik } from "formik";
import Input from "../../../../customs/input/input";
import RelatedAds from "../../../../partials/relatedAds";
import StarIcon from "../../../../assets/Vector.svg";
import favorite from "../../../../assets/Icon + container.svg";
import Details from "./tabs/details";
import Reviews from "./tabs/productReview";
import EyeIcon from "../../../../assets/eye.svg";
import TimeIcon from "../../../../assets/location-pin-svgrepo-com 2.svg";
import { countUpTo } from "../../trend";
import { useState } from "react";
import ModalContent from "../../../../partials/successModal/modalContent";
import { useNavigate, useParams } from "react-router-dom";
import FlagSeller from "../flagSeller/flagSeller";
import ArrowIcon from "../../../../assets/arrow-right-green.svg";
import {
  formatDateToMonthYear,
  getTimeAgo,
} from "../../../../utils/formatTime";
import { handleCopyLink } from "../../../request";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";

const safetyTips = [
  { key: 1, text: "Do not pay in advance, even for the delivery." },
  { key: 2, text: "Try to meet at a safe, public location." },
  { key: 3, text: "Check the item BEFORE you buy it." },
  { key: 4, text: "Pay only after collecting the item." },
  {
    key: 5,
    text: "If you run into any problems with a seller, please report to us to help others. Blinkers Team will check the seller immediately and take appropriate action.",
  },
];

interface Props {
  productDetailsData?: ProductDatum;
  handleFollowBusiness?: () => void;
  followBusinessMutation?: boolean;
  userExists?: boolean;
  businessDetailsData?: AllBusinessesDatum;
  profileDetailsData?: UserData;
}

const SmallScreen = ({
  productDetailsData,
  handleFollowBusiness,
  followBusinessMutation,
  businessDetailsData,
  userExists,
  profileDetailsData,
}: Props) => {
  const [activeKey, setActiveKey] = useState("1");
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();
  const [flagSeller, setFlagSeller] = useState(false);
  const { id } = useParams();
  const [isNumberVisible, setIsNumberVisible] = useState(false);
  const user = useAtomValue(userAtom);
  const currenthref = location.href;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Product Details",
      children: <Details productDetailsData={productDetailsData} />,
    },
    {
      key: "2",
      label: "Reviews",
      children: <Reviews limit={3} />,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleNavigateToSellersProfile = () => {
    navigate(`/sellers-profile`);
    window.scrollTo(0, 0);
  };

  const relatedAdsData = productDetailsData?.related_ads;

  const handleNavigateToRelatedAds = () => {
    navigate(`/related-ads/${id}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const handleShowNumber = (textToCopy: string) => {
    setIsNumberVisible(true);
    if (isNumberVisible) {
      handleCopyLink(textToCopy);
    }
  };

  return (
    <main>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <div style={{ marginInlineStart: "1rem" }}>
              <h2 style={{ display: "flex" }}>{productDetailsData?.title}</h2>
              <p className={styles.fashion}>
                {productDetailsData?.category?.title}
              </p>{" "}
              <div className={styles.accessories}>
                <h2 className={styles.payment}>
                  ₦
                  {productDetailsData?.discount_price ||
                    productDetailsData?.price}
                </h2>
                <div className={styles.eye}>
                  <Image src={TimeIcon} alt={TimeIcon} preview={false} />
                  <p>
                    {" "}
                    Posted {getTimeAgo(productDetailsData?.created_at || "")}
                  </p>
                </div>
                <div className={styles.eye}>
                  <Image src={EyeIcon} alt={EyeIcon} preview={false} />
                  <p>
                    {productDetailsData?.views}{" "}
                    {productDetailsData?.views && productDetailsData?.views < 2
                      ? "View"
                      : "Views"}
                  </p>
                </div>
                <p className={styles.payment}>
                  <span className={styles.title}>State:</span>{" "}
                  {productDetailsData?.state?.state_name}
                </p>
                <p>
                  <span className={styles.title}>Local Government Area:</span>{" "}
                  {productDetailsData?.local_govt?.local_government_area}
                </p>
              </div>
            </div>

            <div className={styles.leftContainer}>
              <div className={styles.firstSideLeft}>
                {productDetailsData?.add_images?.map((dress) => (
                  <div key={dress.id} className={styles.dressCard}>
                    <div>
                      <Image
                        width={"5.3rem"}
                        height={"4.4rem"}
                        src={dress.add_image}
                        alt={dress.add_image}
                        preview={true}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.secondSideLeft}>
                <div className={styles.promoImage}>
                  <div className={styles.favoriteIcon}>
                    <Image
                      width={30}
                      src={favorite}
                      alt="Favorite"
                      preview={false}
                    />
                  </div>
                  {/* <Image
                  width={"58.6rem"}
                  // height={'58.6rem'}
                  src={Product2}
                  alt="Product2"
                  preview={false}
                  className={styles.productImage}
                /> */}

                  <Image
                    width={"100%"}
                    //   maxWidth={10}
                    src={productDetailsData?.add_images[0]?.add_image}
                    alt="Product2"
                    preview={false}
                    // alt={"my-product"}
                    className={styles.productImage}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.tabs}>
              {/* <Tabs defaultActiveKey="1" items={items} /> */}
              <Tabs
                defaultActiveKey="1"
                onChange={handleTabChange}
                items={items}
              />
            </div>
          </div>

          <div className={styles.rightSide}>
            <Formik
              initialValues={{ message: "", selectedItems: [] }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <div className={styles.card}>
                  <p className={styles.seller}>Safety Tips</p>
                  <ul>
                    {safetyTips?.map((tip) => (
                      <li
                        key={tip.key}
                        style={{
                          listStyleType: "disc",
                          marginLeft: "20px",
                          paddingBlock: "0.2rem",
                          fontSize: "1.4rem",
                        }}
                      >
                        {tip.text}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* //BusinessProfile */}
                {businessDetailsData && businessDetailsData ? (
                  <div className={styles.card}>
                    <p className={styles.seller}>Seller’s Information </p>
                    <div className={styles.flexSeller}>
                      <img
                        src={businessDetailsData?.logo}
                        width={"2rem"}
                        alt="ProductIcon"
                        className={styles.sellerLogo}
                      />
                      <div>
                        <p className={styles.name}>
                          {businessDetailsData?.name}
                        </p>
                        <div className={styles.starWrapper}>
                          <span className={styles.star}>
                            <Image
                              width={20}
                              src={StarYellow}
                              alt="StarYellow"
                              preview={false}
                            />
                            ( {businessDetailsData?.total_rating}{" "}
                            {businessDetailsData &&
                            businessDetailsData?.total_rating > 1
                              ? "ratings"
                              : "rating"}
                            )
                          </span>
                          <span className={styles.dot}>.</span>{" "}
                          <span>
                            {businessDetailsData?.total_followers}
                            {businessDetailsData &&
                            businessDetailsData?.total_followers > 1
                              ? " Followers"
                              : " Follower"}
                          </span>
                        </div>
                      </div>
                      <p>
                        Member Since{" "}
                        {formatDateToMonthYear(
                          businessDetailsData?.created_at || ""
                        )}
                      </p>
                    </div>

                    <div className={styles.social}>
                      <Image
                        src={WhatsappLogo}
                        alt="WhatsappLogo"
                        preview={false}
                      />
                      <Image
                        src={InstagramIcon}
                        alt="InstagramIcon"
                        preview={false}
                      />
                      <Image
                        src={FaceBookStoreIcon}
                        alt="FaceBookStoreIcon"
                        preview={false}
                        height={32}
                      />
                      <Image
                        src={BrowseLogo}
                        alt="BrowseLogo"
                        preview={false}
                      />
                    </div>

                    <div className={styles.flexViewProfile}>
                      <Button
                        onClick={() => handleNavigateToSellersProfile()}
                        text="View Profile"
                      />
                      <br />
                      {user?.id !== businessDetailsData?.user_id && (
                        <Button
                          variant="white"
                          onClick={handleFollowBusiness}
                          disabled={followBusinessMutation}
                          text={
                            userExists
                              ? followBusinessMutation
                                ? "Unfollowing"
                                : "Unfollow"
                              : followBusinessMutation
                              ? "Following"
                              : "Follow"
                          }
                        />
                      )}
                    </div>

                    <Button
                      icon={
                        <Image src={CallLogo} alt="CallLogo" preview={false} />
                      }
                      text={
                        isNumberVisible
                          ? productDetailsData?.user?.number ||
                            "No phone number"
                          : "Click To Show Number"
                      }
                      onClick={() =>
                        handleShowNumber(productDetailsData?.user?.number || "")
                      }
                    />

                    <div className={styles.flag}>
                      <Button
                        icon={
                          <Image
                            src={FlagLogo}
                            alt="FlagLogo"
                            preview={false}
                          />
                        }
                        text="Flag Seller"
                        variant="redOutline"
                        onClick={() => {
                          setFlagSeller(true);
                        }}
                      />
                    </div>

                    <div></div>
                    <Button
                      className={styles.green}
                      icon={
                        <Image src={CopyIcon} alt="CopyIcon" preview={false} />
                      }
                      text="Copy URL"
                      variant="noBg"
                      onClick={() => {
                        handleCopyLink(currenthref || "");
                      }}
                    />
                  </div>
                ) : (
                  // sellersprofile
                  <div className={styles.card}>
                    <p className={styles.seller}>Seller’s Information </p>
                    <div className={styles.flexSeller}>
                      <img
                        src={profileDetailsData?.profile_image ?? ""}
                        width={"2rem"}
                        alt="sellerslogo"
                        className={styles.sellerLogo}
                      />
                      <div>
                        <p className={styles.name}>
                          {profileDetailsData?.store_name || ""}
                        </p>
                        <div className={styles.starWrapper}>
                          <span className={styles.star}>
                            <Image
                              width={20}
                              src={StarYellow}
                              alt="StarYellow"
                              preview={false}
                            />
                            {/* ( {profileDetailsData?.total_rating}{" "}
                        {profileDetailsData &&
                        profileDetailsData?.total_rating > 1
                          ? "ratings"
                          : "rating"}
                        ) */}
                          </span>
                          <span className={styles.dot}>.</span>{" "}
                          <span>
                            {/* {profileDetailsData?.total_followers}
                        {profileDetailsData &&
                        profileDetailsData?.total_followers > 1
                          ? " Followers"
                          : " Follower"} */}
                          </span>
                        </div>
                      </div>
                      <p>
                        Member Since{" "}
                        {formatDateToMonthYear(
                          profileDetailsData?.created_at || ""
                        )}
                      </p>
                    </div>

                    <div className={styles.social}>
                      <Image
                        src={WhatsappLogo}
                        alt="WhatsappLogo"
                        preview={false}
                      />
                      <Image
                        src={InstagramIcon}
                        alt="InstagramIcon"
                        preview={false}
                      />
                      <Image
                        src={FaceBookStoreIcon}
                        alt="FaceBookStoreIcon"
                        preview={false}
                        height={32}
                      />
                      <Image
                        src={BrowseLogo}
                        alt="BrowseLogo"
                        preview={false}
                      />
                    </div>

                    <div className={styles.flexViewProfile}>
                      <Button
                        onClick={() => handleNavigateToSellersProfile()}
                        text="View Profile"
                      />
                      <br />
                      {user?.id !== profileDetailsData?.id && (
                        <Button
                          variant="white"
                          onClick={handleFollowBusiness}
                          disabled={followBusinessMutation}
                          text={
                            userExists
                              ? followBusinessMutation
                                ? "Unfollowing"
                                : "Unfollow"
                              : followBusinessMutation
                              ? "Following"
                              : "Follow"
                          }
                        />
                      )}
                    </div>

                    <Button
                      icon={
                        <Image src={CallLogo} alt="CallLogo" preview={false} />
                      }
                      text={
                        isNumberVisible
                          ? productDetailsData?.user?.number ||
                            "No phone number"
                          : "Click To Show Number"
                      }
                      onClick={() =>
                        handleShowNumber(productDetailsData?.user?.number || "")
                      }
                    />

                    <div className={styles.flag}>
                      <Button
                        icon={
                          <Image
                            src={FlagLogo}
                            alt="FlagLogo"
                            preview={false}
                          />
                        }
                        text="Flag Seller"
                        variant="redOutline"
                        onClick={() => {
                          setFlagSeller(true);
                        }}
                      />
                    </div>

                    <div></div>
                    <Button
                      className={styles.green}
                      icon={
                        <Image src={CopyIcon} alt="CopyIcon" preview={false} />
                      }
                      text="Copy URL"
                      variant="noBg"
                      onClick={() => {
                        handleCopyLink(currenthref || "");
                      }}
                    />
                  </div>
                )}
                <div className={styles.chatCart}>
                  <p className={styles.seller}>Chat with seller</p>

                  <div className={styles.starWrapper}>
                    <p className={styles.message}>Is this available</p>
                    <p className={styles.message}> Where is your location</p>
                    <p className={styles.message}> More Enquiry</p>
                  </div>

                  <Input
                    name="location"
                    placeholder="Write your message here"
                    type="textarea"
                  />
                  <div className={styles.startChat}>
                    <Button text="Start Chat" />
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        {activeKey === "2" && (
          <div>
            <Formik
              initialValues={{ message: "", selectedItems: [] }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <div className={styles.cardreview}>
                  <h2 className={styles.write}>Write A Review</h2>

                  <p className={styles.adding}>
                    Add a rating. Tap on the icons to rate this product
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
                      placeholder="Write  review"
                      type="textarea"
                    />
                  </div>
                  <div className={styles.seeBtn}>
                    <Button
                      onClick={() => {
                        setOpenSuccess(true);
                      }}
                      text="Submit"
                      className="buttonStyle"
                    />
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>

      {relatedAdsData && relatedAdsData?.length > 0 && (
        <section>
          <div className="wrapper">
            <div className={styles.review}>
              <div className={styles.reviewbtn}>
                <p className={styles.title}>Related Ads</p>

                {relatedAdsData && (
                  <div
                    onClick={handleNavigateToRelatedAds}
                    className={styles.btnWrapper}
                  >
                    <p className={styles.btn}>See All</p>
                    <img src={ArrowIcon} alt="ArrowIcon" />
                  </div>
                )}
              </div>
              {/* <p>No Reviews available yet</p> */}
            </div>
          </div>
          <RelatedAds limit={4} canSeeBtn={false} />
        </section>
      )}

      <ModalContent
        open={openSuccess}
        handleCancel={() => setOpenSuccess(false)}
        handleClick={() => {
          setOpenSuccess(false);
        }}
        heading={"Your Rating and Review Has Been Submitted Successfully"}
      />

      <Modal
        open={flagSeller}
        onCancel={() => setFlagSeller(false)}
        centered
        title="Flag Seller"
        footer={null}
      >
        <FlagSeller handleCloseModal={() => setFlagSeller(false)} />
      </Modal>
    </main>
  );
};
export default SmallScreen;