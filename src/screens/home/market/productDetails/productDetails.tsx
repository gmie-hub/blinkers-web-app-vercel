import styles from "./index.module.scss";
import { Image, Modal, Tabs, TabsProps } from "antd";
import LocationIcon from "../../../../assets/location.svg";
import Button from "../../../../customs/button/button";
import WhatsappLogo from "../../../../assets/whatsapp.svg";
import InstagramIcon from "../../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../../assets/fbIcon.svg";
import BrowseLogo from "../../../../assets/Icon (4).svg";
import CallLogo from "../../../../assets/click.svg";
import FlagLogo from "../../../../assets/flag.svg";
import CopyIcon from "../../../../assets/copy.svg";
import ProfileIcon from "../../../../assets/Avatarprofile.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import { Form, Formik } from "formik";
import RelatedAds from "../../../../partials/relatedAds";
import favorite from "../../../../assets/Icon + container.svg";
import redFavorite from "../../../../assets/redfav.svg";
import Details from "./tabs/details";
import Reviews from "./tabs/productReview";
import EyeIcon from "../../../../assets/eye.svg";
import TimeIcon from "../../../../assets/location-pin-svgrepo-com 2.svg";
import { useEffect, useState } from "react";
import ModalContent from "../../../../partials/successModal/modalContent";
import { useNavigate, useParams } from "react-router-dom";
import FlagSeller from "../flagSeller/flagSeller";
import SmallScreen from "./smallScreenSellerDetails";
import ArrowIcon from "../../../../assets/arrow-right-green.svg";
import {
  formatDateToMonthYear,
  getTimeAgo,
} from "../../../../utils/formatTime";
import { handleCopyLink } from "../../../request";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";
import WriteReviewAds from "../writeReview/reviewAds";
import GeneralWelcome from "../marketLogin/marketLogin";

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
  handleFollowSeller?: () => void;
  isUserFollowingBusiness?: boolean;
  isUserFollowingSeller?: boolean;
  followBusinessMutation?: boolean;
  followSellersMutation?: boolean;
  businessDetailsData?: AllBusinessesDatum;
  profileDetailsData?: UserData;
  hasUserFlaggedSeller?: boolean;
  addToFavHandler?: () => void;
}
const BigScreen = ({
  handleFollowSeller,
  productDetailsData,
  followSellersMutation,
  handleFollowBusiness,
  followBusinessMutation,
  isUserFollowingBusiness,
  isUserFollowingSeller,
  businessDetailsData,
  profileDetailsData,
  hasUserFlaggedSeller,

  addToFavHandler,
}: Props) => {
  const [activeKey, setActiveKey] = useState("1");
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();
  const [flagSeller, setFlagSeller] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  const { id } = useParams();
  const [isNumberVisible, setIsNumberVisible] = useState(false);
  const user = useAtomValue(userAtom);
  const currenthref = location.href;
  const [openLoginModal, setOpenLoginModal] = useState(false);

  console.log(productDetailsData, "productDetailsData");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // On small screens, ensure isFilterVisible is false by default
    if (windowWidth < 1024) {
      //show <SmallScreen Copmpnent/>
      <SmallScreen />;
    } else {
      //show <big Screen Copmpnent/>
      <BigScreen />;
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  // const handleNavigateToSellersProfile = () => {
  //   if (businessDetailsData && businessDetailsData?.id !== undefined) {
  //     navigate(
  //       `/directory-details/${businessDetailsData?.id}/${businessDetailsData?.name}/${businessDetailsData?.about}`
  //     );
  //   } else {
  //     navigate(`/seller-profile/${profileDetailsData?.id}`);
  //   }
  //   window.scrollTo(0, 0);
  // };

  const handleNavigateToSellersProfile = () => {
    if (businessDetailsData && businessDetailsData?.id !== undefined) {
      navigate(
        `/directory-details/${businessDetailsData?.id}/${businessDetailsData?.name}`
      );
    } else {
      navigate(`/seller-profile/${profileDetailsData?.id}`);
    }
    window.scrollTo(0, 0);
  };

  const relatedAdsData = productDetailsData?.related_ads;

  const handleNavigateToRelatedAds = () => {
    navigate(`/related-ads/${id}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Product Details",
      children: <Details productDetailsData={productDetailsData} />,
    },
    {
      key: "2",
      label: "Reviews",
      children: <Reviews id={productDetailsData?.user_id} limit={3} />,
    },
  ];

  const handleShowNumber = (textToCopy: string) => {
    setIsNumberVisible(true);
    if (isNumberVisible) {
      handleCopyLink(textToCopy);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleImages = 4;

  const images = productDetailsData?.add_images || [];

  const handleNext = () => {
    if (currentIndex + maxVisibleImages < images.length) {
      setCurrentIndex(currentIndex + maxVisibleImages);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - maxVisibleImages);
    }
  };

  const visibleImages =
    images &&
    images?.length &&
    images?.slice(currentIndex, currentIndex + maxVisibleImages);

  const handlFlagSeller = () => {
    if (!user) {
      setOpenLoginModal(true);
    } else {
      setFlagSeller(true);
    }
  };

  return (
    <main>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h2>{productDetailsData?.title}</h2>
            <div className={styles.accessories}>
              <p className={styles.subjectBg}>
                {productDetailsData?.category?.title}
              </p>
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
            </div>

            <div className={styles.leftContainer}>
              <div>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={styles.arrowButton}
                >
                  ↑
                </button>

                <div className={styles.firstSideLeft}>
                  {visibleImages &&
                    visibleImages?.length > 0 &&
                    visibleImages?.map((dress) => (
                      <div key={dress.id} className={styles.dressCard}>
                        <div>
                          <Image
                            width={"12rem"}
                            height={"12rem"}
                            src={dress?.image_url || dress?.add_image}
                            alt={dress?.image_url || dress?.add_image}
                            preview={true}
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={currentIndex + maxVisibleImages >= images.length}
                  className={styles.arrowButton}
                >
                  ↓
                </button>
              </div>
              <div className={styles.secondSideLeft}>
                <div className={styles.promoImage}>
                  <div
                    className={styles.favoriteIcon}
                    onClick={addToFavHandler}
                    // onClick={() => {
                    //   if (addToFavHandler) {
                    //     addToFavHandler(id);
                    //   }
                    // }}
                  >
                    <Image
                      width={30}
                      src={
                        productDetailsData?.isFavourite ? redFavorite : favorite
                      }
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

                  <img
                    width={"100%"}
                    src={
                      productDetailsData?.add_images[0]?.image_url ||
                      productDetailsData?.add_images[0]?.add_image
                    }
                    alt={
                      productDetailsData?.add_images[0]?.image_url ||
                      productDetailsData?.add_images[0]?.add_image
                    }
                    // preview={false}
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
                  <h2 className={styles.payment}>
                    {" "}
                    ₦
                    {productDetailsData?.discount_price ||
                      productDetailsData?.price}
                  </h2>
                  <div className={styles.location}>
                    <Image
                      src={LocationIcon}
                      alt="LocationIcon"
                      preview={false}
                    />
                    <p>{productDetailsData?.pickup_address}</p>
                  </div>
                  <p>
                    <span className={styles.title}>State:</span>{" "}
                    {productDetailsData?.state?.state_name}
                  </p>
                  <p>
                    <span className={styles.title}>Local Government Area:</span>{" "}
                    {productDetailsData?.local_govt?.local_government_area}
                  </p>
                </div>

                {/* business profile */}
                {businessDetailsData && businessDetailsData ? (
                  <div className={styles.card}>
                    <p className={styles.seller}>Seller’s Information </p>
                    <div className={styles.flex}>
                      <Image
                        src={businessDetailsData?.logo || ProfileIcon}
                        alt="sellerslogo"
                        className={styles.sellerLogo}
                        preview={true}
                        width={90}
                        height={90}
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
                    </div>
                    <p>
                      Member Since{" "}
                      {formatDateToMonthYear(
                        businessDetailsData?.created_at || ""
                      )}
                    </p>

                    <div
                      style={{ paddingBlock: "2.4rem" }}
                      className={styles.flex}
                    >
                      <Button
                        onClick={() => handleNavigateToSellersProfile()}
                        text="View Profile"
                      />
                      {user?.id !== businessDetailsData?.user_id && (
                        <Button
                          onClick={handleFollowBusiness}
                          disabled={followBusinessMutation}
                          text={
                            isUserFollowingBusiness
                              ? followBusinessMutation
                                ? "Unfollowing"
                                : "Unfollow"
                              : followBusinessMutation
                              ? "Following"
                              : "Follow"
                          }
                          variant="white"
                        />
                      )}
                    </div>
                    <div className={styles.social}>
                      {businessDetailsData.whatsapp && (
                        <Image
                          src={WhatsappLogo}
                          alt="WhatsappLogo"
                          preview={false}
                          onClick={() => {
                            if (businessDetailsData?.whatsapp) {
                              window.open(
                                businessDetailsData.whatsapp,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                      {businessDetailsData?.instagram && (
                        <Image
                          src={InstagramIcon}
                          alt="InstagramIcon"
                          preview={false}
                          onClick={() => {
                            if (businessDetailsData?.instagram) {
                              window.open(
                                businessDetailsData.instagram,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                      {businessDetailsData?.facebook && (
                        <Image
                          src={FaceBookStoreIcon}
                          alt="FaceBookStoreIcon"
                          preview={false}
                          // width={40}
                          height={32}
                          onClick={() => {
                            if (businessDetailsData?.facebook) {
                              window.open(
                                businessDetailsData.facebook,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                      {businessDetailsData?.website && (
                        <Image
                          src={BrowseLogo}
                          alt="BrowseLogo"
                          preview={false}
                          onClick={() => {
                            if (businessDetailsData?.website) {
                              window.open(
                                businessDetailsData.website,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                    </div>
                    <Button
                      icon={<img src={CallLogo} alt="success" />}
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
                        onClick={handlFlagSeller}
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

                    {/* <div className={styles.chatCart}>
                      <p className={styles.seller}>Chat with seller</p>

                      <div className={styles.starWrapper}>
                        <p className={styles.message}>Is this available</p>
                        <p className={styles.message}>
                          {" "}
                          Where is your location
                        </p>
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
                    </div> */}
                  </div>
                ) : (
                  //SellersProfile\\
                  <div className={styles.card}>
                    <p className={styles.seller}>Seller’s Information </p>
                    <div className={styles.flex}>
                      <Image
                        src={profileDetailsData?.profile_image || ProfileIcon}
                        alt="sellerslogo"
                        className={styles.sellerLogo}
                        preview={true}
                        width={90}
                        height={90}
                      />
                      <div>
                        <p className={styles.name}>
                          {profileDetailsData?.name || ""}
                        </p>
                        <div className={styles.starWrapper}>
                          <span className={styles.star}>
                            {/* <Image
                            width={20}
                            src={StarYellow}
                            alt="StarYellow"
                            preview={false}
                          /> */}
                            {/* ( {profileDetailsData?.total_rating }{" "}
                          {profileDetailsData &&
                          profileDetailsData?.total_rating > 1
                            ? "ratings"
                            : "rating"}
                          ) */}
                          </span>
                          {/* <span className={styles.dot}>.</span>{" "} */}
                          {/* <span>{profileDetailsData?.total_followers}{profileDetailsData && profileDetailsData?.total_followers > 1 ? ' Followers' : ' Follower'}</span> */}
                        </div>
                      </div>
                    </div>
                    <p>
                      Member Since{" "}
                      {formatDateToMonthYear(
                        profileDetailsData?.created_at || ""
                      )}
                    </p>

                    <div
                      style={{ paddingBlock: "2.4rem" }}
                      className={styles.flex}
                    >
                      <Button
                        onClick={handleNavigateToSellersProfile}
                        text="View Profile"
                      />
                      {user?.id !== profileDetailsData?.id && (
                        <Button
                          onClick={handleFollowSeller}
                          disabled={followSellersMutation}
                          text={
                            isUserFollowingSeller
                              ? followSellersMutation
                                ? "Unfollowing"
                                : "Unfollow"
                              : followSellersMutation
                              ? "Following"
                              : "Follow"
                          }
                          variant="white"
                        />
                      )}
                    </div>
                    <div className={styles.social}>
                      {profileDetailsData?.whatsapp_address && (
                        <Image
                          src={WhatsappLogo}
                          alt="WhatsappLogo"
                          preview={false}
                          onClick={() => {
                            if (profileDetailsData?.whatsapp_address) {
                              window.open(
                                profileDetailsData.whatsapp_address,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                      {profileDetailsData?.instagram_address && (
                        <Image
                          src={InstagramIcon}
                          alt="InstagramIcon"
                          preview={false}
                          onClick={() => {
                            if (profileDetailsData?.instagram_address) {
                              window.open(
                                profileDetailsData?.instagram_address,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                      {profileDetailsData?.facebook_address && (
                        <Image
                          src={FaceBookStoreIcon}
                          alt="FaceBookStoreIcon"
                          preview={false}
                          // width={40}
                          height={32}
                          onClick={() => {
                            if (profileDetailsData?.facebook_address) {
                              window.open(
                                profileDetailsData.facebook_address,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                      {profileDetailsData?.website_address && (
                        <Image
                          src={BrowseLogo}
                          alt="BrowseLogo"
                          preview={false}
                          onClick={() => {
                            if (profileDetailsData?.website_address) {
                              window.open(
                                profileDetailsData?.website_address,
                                "_blank"
                              );
                            }
                          }}
                        />
                      )}
                    </div>
                    <Button
                      icon={<img src={CallLogo} alt="success" />}
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
                        text={
                          hasUserFlaggedSeller ? "Unflag Seller" : "Flag Seller"
                        }
                        variant="redOutline"
                        onClick={handlFlagSeller}
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

                    {/* <div className={styles.chatCart}>
                      <p className={styles.seller}>Chat with seller</p>

                      <div className={styles.starWrapper}>
                        <p className={styles.message}>Is this available</p>
                        <p className={styles.message}>
                          {" "}
                          Where is your location
                        </p>
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
                    </div> */}
                  </div>
                )}

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
                        }}
                      >
                        {tip.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        {activeKey === "2" && (
          <WriteReviewAds id={productDetailsData?.user_id} />
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
        <FlagSeller
          hasUserFlaggedSeller={hasUserFlaggedSeller}
          sellerId={productDetailsData?.user_id}
          handleCloseModal={() => setFlagSeller(false)}
        />
      </Modal>

      <Modal
        open={openLoginModal}
        onCancel={() => setOpenLoginModal(false)}
        centered
        footer={null}
      >
        <GeneralWelcome handleCloseModal={() => setOpenLoginModal(false)} />
      </Modal>
    </main>
  );
};
export default BigScreen;
