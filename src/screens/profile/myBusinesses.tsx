import styles from "./styles.module.scss";
import TimeIcon from "../../assets/time42.svg";
import { Image } from "antd";
import CallIcon from "../../assets/callclaim.svg";
import LocationIcon from "../../assets/locationnot.svg";
import Button from "../../customs/button/button";
import ProfileImg from "../../assets/Product.svg";
import { getBusinessById } from "../request";
import { userAtom } from "../../utils/store";
import { useAtomValue } from "jotai";
import { useQueries } from "@tanstack/react-query";
import Index from "./businessInformation/basicInfomation";
import { useState } from "react";
import { AxiosError } from "axios";
import CustomSpin from "../../customs/spin";

const MyBusinesses = () => {
  const user = useAtomValue(userAtom);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  const [getBusinessDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-business-details", user?.business?.id],
        queryFn: () => getBusinessById(user?.business?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.business?.id,
      },
    ],
  });

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;
  const businessDetailsError = getBusinessDetailsQuery?.error as AxiosError;
  const businessDetailsErrorMessage =
    businessDetailsError?.message ||
    "An error occurred. Please try again later.";

  return (
    <>
       {getBusinessDetailsQuery?.isLoading ? (
        <CustomSpin />
      ) : getBusinessDetailsQuery?.isError ? (
        <h1 className="error">{businessDetailsErrorMessage}</h1>
      ) : (
      showBusinessInfo === false && (
        <div className="wrapper">
          <div className={styles.mainContent}>
            <div className={styles.card}>
              <img
                className={styles.profileImg}
                src={ProfileImg}
                alt="ProfileImg"
              />
              <p>{user?.business?.name}</p>

              <div className={styles.info}>
                <Image src={TimeIcon} alt="TimeIcon" preview={false} />

                <div className={styles.open}>
                  <p>Opening Hours</p>
                  {/* <p>Monday - Fridays (10am- 11pm)</p> */}
                </div>
              </div>
              <div className={styles.info}>
                <Image src={LocationIcon} alt="LocationIcon" preview={false} />
                {user?.address}
              </div>
              <div className={styles.info}>
                <Image src={CallIcon} alt="CallIcon" preview={false} />

                <p>{user?.number}</p>
              </div>
              <div style={{ marginBlockStart: "2.4rem" }}>
                <Button
                disabled={businessDetailsData?.business_status?.toString() !== "2"}
                  onClick={() => setShowBusinessInfo(true)}
                  className={
                    businessDetailsData?.business_status?.toString() !== "2"
                      ? styles.inview
                      : ""
                  }
                  text={
                    businessDetailsData?.business_status?.toString() !== "2"
                      ? "Currently in Review"
                      : "View Business Information"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )
    )}
      {showBusinessInfo && <Index />}
    </>
  );
};
export default MyBusinesses;
