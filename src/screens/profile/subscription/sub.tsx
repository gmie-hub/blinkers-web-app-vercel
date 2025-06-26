import styles from "./styles.module.scss";
import { CheckCircleFilled } from "@ant-design/icons";
import Button from "../../../customs/button/button";
import { useNavigate } from "react-router-dom";
import { getApplicantsbyId } from "../../request";
import { useQueries } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../utils/store";
import { AxiosError } from "axios";
import Platinum from "../../../assets/platinum.svg";
import Free from "../../../assets/Frame 1618872852.svg";
import Gold from "../../../assets/gold.svg";
import {
  formatAmount,
  formatDateToDayMonthYear,
  getTimeFromDate,
} from "../../../utils/formatTime";
import CustomSpin from "../../../customs/spin";

const features = Array(12).fill("10 products advert");

const SubscriptionCard = () => {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const [getProfileQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-profile"],
        queryFn: () => getApplicantsbyId(user?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.id,
      },
    ],
  });

  const profileData = getProfileQuery?.data?.data;
  const profileDetailsError = getProfileQuery?.error as AxiosError;
  const profileDetailsErrorMessage =
    profileDetailsError?.message ||
    "An error occurred. Please try again later.";

  const getPlanImage = () => {
    const planName = profileData && profileData?.plan_name?.toLowerCase();
    if (planName === "gold") return Gold;
    if (planName === "free") return Free;
    return Platinum;
  };
  const description = profileData && profileData?.subscription?.pricing?.plan
?.description
  const features = description?.split(',');

  return (
    // <>
    //    {getProfileQuery?.isLoading ? (
    //         <CustomSpin />
    //       ) : getProfileQuery?.isError ? (
    //         <h1 className="error">{profileDetailsErrorMessage}</h1>
    //       ) : (
      <div className={styles.card}>
      <div className={styles.header}>
        <img
          src={getPlanImage()}
          alt={`${profileData?.plan_name} plan`}
          className={styles.planImage}
        />

        <span className={styles.planName}>{profileData?.plan_name} Plan</span>
      </div>
      <h2 className={styles.price}>
        {profileData?.subscription?.pricing?.duration} months plan -{" "}
        {formatAmount(profileData?.subscription?.pricing?.price)}
      </h2>
      <p className={styles.bill}>Billing cycles</p>

      <div className={styles.timeline}>
        <div className={styles.line}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.dates}>
          <span>
            {formatDateToDayMonthYear(profileData?.subscription?.created_at)}
            {/* {getTimeFromDate(profileData?.subscription?.created_at)} */}
          </span>
          <span>
            {formatDateToDayMonthYear(profileData?.subscription?.expires_at)}
            {/* {getTimeFromDate(profileData?.subscription?.expires_at)} */}
          </span>
        </div>
      </div>

      <div className={styles.included}>
        <h4>What's included</h4>
        <ul>
          {features?.map((item:any, index:number) => (
            <li key={index}>
              <CheckCircleFilled style={{ color: "green" }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.buttons}>
        <Button
          // variant="  "
          // className={"buttonStyle"}
          onClick={() => {
            navigate("/pricing");
            window.scroll(0, 0);
          }}
        >
          Modify Subscription plan
        </Button>
        {/* <Button
          variant="redOutline"
          // className={"buttonStyle"}
        >
          Cancel Subscription
        </Button> */}
      </div>
    </div>
    //       )}
    // </>
  
  );
};

export default SubscriptionCard;
