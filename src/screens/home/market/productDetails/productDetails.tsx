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
import { useEffect, useState } from "react";
import ModalContent from "../../../../partials/successModal/modalContent";
import { useNavigate, useParams } from "react-router-dom";
import FlagSeller from "../flagSeller/flagSeller";
import SmallScreen from "./smallScreenSellerDetails";
import ArrowIcon from "../../../../assets/arrow-right-green.svg";
import { formatDateToMonthYear, getTimeAgo } from "../../../../utils/formatTime";
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
  userExists?: boolean;
  followBusinessMutation?: boolean;
  businessDetailsData?: AllBusinessesDatum;
  profileDetailsData?:UserData
}
const BigScreen = ({
  productDetailsData,
  handleFollowBusiness,
  followBusinessMutation,
  userExists,
  businessDetailsData,
  profileDetailsData,
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

  console.log(businessDetailsData, 'businessDetailsData')

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
  console.log(businessDetailsData?.id ,'businessDetailsData?.id ')

  const handleNavigateToSellersProfile = () => {
    if(businessDetailsData && businessDetailsData?.id !==undefined){
      navigate(`/directory-details/${businessDetailsData?.id }`);

    }
    else{
      navigate(`/sellers-profile/${profileDetailsData?.id}`);

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
      children: <Reviews limit={3} />,
    },
  ];

  const handleShowNumber = (textToCopy: string) => {
    setIsNumberVisible(true);
    if (isNumberVisible) {
      handleCopyLink(textToCopy);
    }
  };

  console.log('jum')

  return (
    <main>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h2>{productDetailsData?.title}</h2>
            <div className={styles.accessories}>
              <p className={styles.subjectBg}>{productDetailsData?.category?.title}</p>{" "}
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
              <div className={styles.firstSideLeft}>
                {productDetailsData?.add_images
                  ?.slice(1) // Start from index 1
                  ?.map((dress) => (
                    <div key={dress.id} className={styles.dressCard}>
                      <div>
                        <Image
                          width={"12rem"}
                          height={"12rem"}
                          src={dress?.add_image}
                          alt={dress?.add_image}
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

                  <img
                    width={"100%"}
                    src={productDetailsData?.add_images[0]?.add_image}
                    alt={productDetailsData?.add_images[0]?.add_image}
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
                {businessDetailsData && businessDetailsData ?
                <div className={styles.card}>
                  <p className={styles.seller}>Seller’s Information </p>
                  <div className={styles.flex}>
                    <img
                      src={businessDetailsData?.logo}
                      alt="sellerslogo"
                      className={styles.sellerLogo}
                    />
                    <div>
                      <p className={styles.name}>{businessDetailsData?.name}</p>
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
                        <span>{businessDetailsData?.total_followers}{businessDetailsData && businessDetailsData?.total_followers > 1 ? ' Followers' : ' Follower'}</span>
                      </div>
                    </div>
                  </div>
                  <p>Member Since {formatDateToMonthYear(businessDetailsData?.created_at || '')}</p>

                  <div
                    style={{ paddingBlock: "2.4rem" }}
                    className={styles.flex}
                  >
                    <Button
                      onClick={() => handleNavigateToSellersProfile()}
                      text="View Profile"
                    />
                    { user?.id !== businessDetailsData?.user_id &&

                    <Button
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
                      variant="white"
                    />}
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
                    <Image
                      src={FaceBookStoreIcon}
                      alt="FaceBookStoreIcon"
                      preview={false}
                      // width={40}
                      height={32}
                      onClick={() => {
                        if (businessDetailsData?.facebook) {
                          window.open(businessDetailsData.facebook, "_blank");
                        }
                      }}
                    />
                    <Image src={BrowseLogo} alt="BrowseLogo" preview={false}
                    onClick={() => {
                      if (businessDetailsData?.website) {
                        window.open(businessDetailsData.website, "_blank");
                      }
                    }} />
                  </div>
                  <Button
                    icon={<img src={CallLogo} alt="success" />}
                    text={
                      isNumberVisible
                        ? productDetailsData?.user?.number || "No phone number"
                        : "Click To Show Number"
                    }
                    onClick={() =>
                      handleShowNumber(productDetailsData?.user?.number || "")
                    }
                  />

                  <div className={styles.flag}>
                    <Button
                      icon={
                        <Image src={FlagLogo} alt="FlagLogo" preview={false} />
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
                </div>


                :


//SellersProfile\\
                 <div className={styles.card}>
                  <p className={styles.seller}>Seller’s Information </p>
                  <div className={styles.flex}>
                    <img
                      src={profileDetailsData?.profile_image!}
                      alt="sellerslogo"
                      className={styles.sellerLogo}
                    />
                    <div>
                      <p className={styles.name}>{profileDetailsData?.store_name || ''}</p>
                      <div className={styles.starWrapper}>
                        <span className={styles.star}>
                          <Image
                            width={20}
                            src={StarYellow}
                            alt="StarYellow"
                            preview={false}
                          />
                          {/* ( {profileDetailsData?.total_rating }{" "}
                          {profileDetailsData &&
                          profileDetailsData?.total_rating > 1
                            ? "ratings"
                            : "rating"}
                          ) */}
                        </span>
                        <span className={styles.dot}>.</span>{" "}
                        {/* <span>{profileDetailsData?.total_followers}{profileDetailsData && profileDetailsData?.total_followers > 1 ? ' Followers' : ' Follower'}</span> */}
                      </div>
                    </div>
                  </div>
                  <p>Member Since {formatDateToMonthYear(profileDetailsData?.created_at || '')}</p>

                  <div
                    style={{ paddingBlock: "2.4rem" }}
                    className={styles.flex}
                  >
                    <Button
                      onClick={ handleNavigateToSellersProfile}
                      text="View Profile"
                    />
                    { user?.id !== profileDetailsData?.id &&

                    <Button
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
                      variant="white"
                    />}
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
                      onClick={() => {
                        if (profileDetailsData?.instagram_address) {
                          window.open(profileDetailsData?.instagram_address, "_blank");
                        }
                      }}
                    />
                    <Image
                      src={FaceBookStoreIcon}
                      alt="FaceBookStoreIcon"
                      preview={false}
                      // width={40}
                      height={32}
                      onClick={() => {
                        if (profileDetailsData?.facebook_address) {
                          window.open(profileDetailsData.facebook_address, "_blank");
                        }
                      }}
                    />
                    <Image src={BrowseLogo} alt="BrowseLogo" preview={false}
                      onClick={() => {
                        if (profileDetailsData?.website_address) {
                          window.open(profileDetailsData.website_address, "_blank");
                        }
                      }} />
                  </div>
                  <Button
                    icon={<img src={CallLogo} alt="success" />}
                    text={
                      isNumberVisible
                        ? productDetailsData?.user?.number || "No phone number"
                        : "Click To Show Number"
                    }
                    onClick={() =>
                      handleShowNumber(productDetailsData?.user?.number || "")
                    }
                  />

                  <div className={styles.flag}>
                    <Button
                      icon={
                        <Image src={FlagLogo} alt="FlagLogo" preview={false} />
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
                </div> 
                }

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
export default BigScreen;
