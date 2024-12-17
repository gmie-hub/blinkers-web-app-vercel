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


const MyBusinesses = () => {
  const user = useAtomValue(userAtom);

  const [getBusinessDetailsQuery, ] = useQueries({
    queries: [
      {
        queryKey: ["get-business-details", user?.business?.id],
        queryFn: () => getBusinessById(user?.business?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.business?.id,
      },

  ]})

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;
  // const businessDetailsError = getBusinessDetailsQuery?.error as AxiosError;
  // const businessDetailsErrorMessage =
  //   businessDetailsError?.message ||
  //   "An error occurred. Please try again later.";

  
  return (
    <>
      <div className="wrapper">
   

        
        <div className={styles.mainContent}>
          <div className={styles.card}>
            <img className={styles.profileImg} src={ProfileImg} alt="ProfileImg" />
            <p>Shop With Rinsy</p>

            <div className={styles.info}>
              <Image src={TimeIcon} alt="TimeIcon" preview={false} />

              <div className={styles.open}>
                <p>Opening Hours</p>
                <p>Monday - Fridays (10am- 11pm)</p>
              </div>
            </div>
            <div className={styles.info}>
              <Image src={LocationIcon} alt="LocationIcon" preview={false} />
              4, blinkers street, Lekki, Nigeria
            </div>
            <div className={styles.info}>
              <Image src={CallIcon} alt="CallIcon" preview={false} />

              <p>09012345678</p>
            </div>
            <div style={{marginBlockStart:'2.4rem'}}>
            <Button
            className={businessDetailsData?.business_status?.toString() !== '2' ? styles.inview :  ''}
             text={businessDetailsData?.business_status?.toString() !== '2' ? "Currently in Review" : 'View Business Information'}
            />
            </div>
          

          </div>
        </div>
      </div>
    </>
  );
};
export default MyBusinesses;
