import Icon from "/Container.svg";
import styles from "./sellersProfile.module.scss";
import Reviews from "../market/productDetails/tabs/businessReview";
import Button from "../../../customs/button/button";
import { useNavigate, useParams } from "react-router-dom";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import { App, Image } from "antd";
import StarYellow from "../../../assets/staryellow.svg";
import WhatsappLogo from "../../../assets/whatsapp.svg";
import InstagramIcon from "../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../assets/fbIcon.svg";
import BrowseLogo from "../../../assets/Icon (4).svg";
import ChatIcon from "../../../assets/messages-2.svg";
import FlagLogo from "../../../assets/flag.svg";
import SellersAds from "./postedAds/adsPostedbySeller";
import LocationIcon from "../../../assets/locationnot.svg";
import CallIcon from "../../../assets/callclaim.svg";
import WebICon from "../../../assets/webicon.svg";
import MailIcon from "../../../assets/mailicon.svg";
import StarG from "../../../assets/starger.svg";
import RouteIndicator from "../../../customs/routeIndicator";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  FollowBusiness,
  getApplicantsbyId,
  getFollowersByUser_id,
} from "../../request";
import { AxiosError } from "axios";
import { formatDateToMonthYear } from "../../../utils/formatTime";
import CustomSpin from "../../../customs/spin";
import { userAtom } from "../../../utils/store";
import { useAtomValue } from "jotai";
import { errorMessage } from "../../../utils/errorMessage";

const SellerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentPath = location.pathname;
  const { notification } = App.useApp();
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();

  // const hasReviews = reviewData?.lenght;
  // console.log(hasReviews, "hasReviews");

  // const handleNavigateToReview = () => {
  //   navigate(`/review`);
  //   window.scrollTo(0, 0);
  // };

  const handleNavigateToSellersAds = () => {
    navigate(`/sellers-posted-ads`);
    window.scrollTo(0, 0);
  };

  const handleNavigateToWriteReview = () => {
    navigate(`/write-review/${id}`);
    window.scrollTo(0, 0);
  };

  const [getSellersDetailsQuery, getBusinessFollowersQuery] = useQueries({
    queries: [
      // {
      //   queryKey: ["get-business-details", id],
      //   queryFn: () => getBusinessById(parseInt(id!)),
      //   retry: 0,
      //   refetchOnWindowFocus: true,
      //   enabled: !!id,
      // },
      {
        queryKey: ["get-sellers-details", id],
        queryFn: () => getApplicantsbyId(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
      {
        queryKey: ["get-business-followers", id],
        queryFn: () => getFollowersByUser_id(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  const userExists = getBusinessFollowersQuery?.data?.data?.data?.some(
    (item) => item?.user_id === user?.id
  );

  console.log(userExists, "userExists");

  const sellersDetailsData = getSellersDetailsQuery?.data?.data;
  const sellersDetailsError = getSellersDetailsQuery?.error as AxiosError;
  const sellersDetailsErrorMessage =
  sellersDetailsError?.message ||
    "An error occurred. Please try again later.";

  const followBusinessMutation = useMutation({
    mutationFn: FollowBusiness,
    mutationKey: ["follow-business"],
  });

  const followBusinessHandler = async () => {
    const payload: Partial<FollowBusiness> = {
      business_id: sellersDetailsData?.id,
      user_id: user?.id,
      action: userExists ? "unfollow" : "follow",
    };

    try {
      await followBusinessMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-business-followers"],
          });
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error),
      });
      console.log(error, "eee");
    }
  };
  const handleFollowBusiness = () => {
    if (!user) {
      notification.error({
        message: "Log in required",
        description: "You need to log in to access this page!",
        placement: "top",
        duration: 4,
        onClose: () => {
          navigate(`/login?redirect=${currentPath}`);
        },
      });
    } else {
      followBusinessHandler();
    }
  };

  return (
    <>
      {getSellersDetailsQuery?.isLoading ? (
        <CustomSpin />
      ) : getSellersDetailsQuery?.isError ? (
        <h1 className="error">{sellersDetailsErrorMessage}</h1>
      ) : (
        <div className="wrapper">
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

            <RouteIndicator showBack />

            <div className={styles.mainContainer}>
              <div className={styles.leftSection}>
                <div className={styles.card}>
                  <div>
                    <div className={styles.passport}>
                      <img src={sellersDetailsData?.profile_image!} alt="ProductIcon" className={styles.sellerLogo} />

                      <div className={styles.detailsflex}>
                        <p className={styles.name}>
                          {sellersDetailsData?.store_name}
                        </p>
                        <div className={styles.starWrapper}>
                          <span className={styles.star}>
                            <Image
                              width={20}
                              src={StarYellow}
                              alt="StarYellow"
                              preview={false}
                            />
                            {/* ({sellersDetailsData?.total_rating}
                            {sellersDetailsData &&
                            sellersDetailsData?.total_rating < 2
                              ? " rating"
                              : " ratings"}
                            ) */}
                            <span className={styles.dot}></span>{" "}
                            <span>
                              {/* {sellersDetailsData?.total_followers}{" "}
                              {sellersDetailsData &&
                              sellersDetailsData?.total_followers < 2
                                ? "Follower"
                                : "Followers"} */}
                            </span>
                          </span>
                        </div>
                      </div>

                      <p>
                        Member Since{" "}
                        {formatDateToMonthYear(
                          sellersDetailsData?.created_at || ""
                        )}
                      </p>
                      <p style={{ paddingBlock: "0.2rem" }}>
                        Number of Ads Posted: <span> {sellersDetailsData?.total_ads}</span>{" "}
                      </p>
                    </div>
                  </div>
                  <div className={styles.followBtn}>
                    {user?.id !== sellersDetailsData?.id && (
                      <Button
                        disabled={followBusinessMutation?.isPending}
                        onClick={handleFollowBusiness}
                        text={
                          userExists
                            ? followBusinessMutation?.isPending
                              ? "Unfollowing"
                              : "Unfollow"
                            : followBusinessMutation?.isPending
                            ? "Following"
                            : "Follow"
                        }
                        variant="green"
                      />
                    )}
                    {user?.id !== sellersDetailsData?.id && (
                      <Button
                        variant="white"
                        text="Write A Review"
                        icon={<Image src={StarG} alt="star" preview={false} />}
                        onClick={() => {
                          handleNavigateToWriteReview();
                        }}
                      />
                    )}
                  </div>
                  <div></div>
                  <div className={styles.info}>
                    <div className={styles.infos}>
                      <Image src={MailIcon} alt="MailIcon" preview={false} />

                      <p>{sellersDetailsData?.email}</p>
                    </div>
                    <div className={styles.infos}>
                      <Image src={CallIcon} alt="CallIcon" preview={false} />

                      <p>{sellersDetailsData?.number || "NA"}</p>
                    </div>
                    <div className={styles.infos}>
                      <Image
                        src={LocationIcon}
                        alt="LocationIcon"
                        preview={false}
                      />
                      {sellersDetailsData?.address}
                    </div>{" "}
                    <div className={styles.infos}>
                      <Image src={WebICon} alt="WebICon" preview={false} />

                      <p>{sellersDetailsData?.website_address || "Na"}</p>
                    </div>{" "}
                  </div>

                  <div className={styles.chatBtn}>
                    <Button
                      variant="white"
                      icon={
                        <Image src={ChatIcon} alt="CallLogo" preview={false} />
                      }
                      text="  Chat With Seller"
                    />
                  </div>

                  {/* <div className={styles.flag}> */}
                  <Button
                    icon={
                      <Image src={FlagLogo} alt="FlagLogo" preview={false} />
                    }
                    text="Flag Seller"
                    variant="redOutline"
                  />
                  {/* </div> */}

                  <div className={styles.social}>
                    <Image
                      src={WhatsappLogo}
                      alt="WhatsappLogo"
                      preview={false}
                      style={{ cursor: "pointer" }}
                      
                    />
                    <Image
                      src={InstagramIcon}
                      alt="InstagramIcon"
                      preview={false}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (sellersDetailsData?.instagram_address) {
                          window.open(
                            sellersDetailsData?.instagram_address,
                            "_blank"
                          );
                        }
                      }}
                    />
                    <Image
                      src={FaceBookStoreIcon}
                      alt="FaceBookStoreIcon"
                      preview={false}
                      // width={32}
                      height={32}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (sellersDetailsData?.facebook_address) {
                          window.open(sellersDetailsData.facebook_address, "_blank");
                        }
                      }}
                    />
                    <Image
                      src={BrowseLogo}
                      alt="BrowseLogo"
                      preview={false}
                      style={{ cursor: "pointer" }}
                      // onClick={() => {
                      //   if (sellersDetailsData?.website) {
                      //     window.open(sellersDetailsData.website, "_blank");
                      //   }
                      // }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.rightSection}>
                {/* {hasReviews !== 0 && ( */}
                {/* <div className={styles.reviewbtn}>
                <p className={styles.title}> Review</p>

                <div
                  onClick={handleNavigateToReview}
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
              </div> */}
                {/* )} */}
                <Reviews canSeeAllBtn={false} limit={4} />
              </div>
            </div>
            <div>
              <div>
                <div className={styles.reviewbtn}>
                  <p className={styles.title}> Ads Posted By This Seller</p>

                  <div
                    onClick={handleNavigateToSellersAds}
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
            </div>
          </div>
        </div>
      )}
      <SellersAds showHeading={false} limit={4} />
    </>
  );
};
export default SellerProfile;
