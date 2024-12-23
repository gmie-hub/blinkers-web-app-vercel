import styles from "./styles.module.scss";
import { useQueries } from "@tanstack/react-query";
import {  getMyAdzByUserId } from "../../request";
import { AxiosError } from "axios";
import usePagination from "../../../hooks/usePagnation";
import { formatDateToMonthYear } from "../../../utils/formatTime";
import { Pagination } from "antd";
import Button from "../../../customs/button/button";
import EditIcon from "../../../assets/editgreen.svg";
import DeleteIcon from "../../../assets/deleteicon.svg";
import CustomSpin from "../../../customs/spin";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../utils/store";


const MyAds = () => {
    const { currentPage, onChange } = usePagination();
    const user = useAtomValue(userAtom);

    // Check if an ad has expired
    const isExpired = (createdAt: string): boolean => {
      const expirationDate = new Date(createdAt);
      const today = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30); // 30 days expiration logic
      return today > expirationDate;
    };
  

    const [getAdsByUserIdQuery] = useQueries({
      queries: [
        {
          queryKey: ["get-my-market", ],
          queryFn: () => getMyAdzByUserId(user?.id!),
          refetchOnWindowFocus: true,
        },
      ],
    });
  
    const adsData = getAdsByUserIdQuery?.data?.data?.data || [];
    const adsError = getAdsByUserIdQuery?.error as AxiosError;
    const adsErrorMessage =
      adsError?.message || "An error occurred. Please try again later.";
  
    return (
      <div className={styles.whyWrapper}>
        {getAdsByUserIdQuery?.isLoading ? (
        <CustomSpin />
      ) : getAdsByUserIdQuery?.isError ? (
        <h1 className="error">{adsErrorMessage}</h1>
      ) : (
        <>
        <div className={styles.cardContainer}>
          {adsData &&
            adsData?.length > 0 &&
            adsData?.map((item:ProductDatum, index:number) => {
              const expired = isExpired(item?.created_at);
  
              return (
                <div
                  className={`${styles.chooseCard} ${
                    expired ? styles.expired : ""
                  }`}
                  key={index}
                >
                  <img
                    className={styles.proImage}
                    src={item?.add_images[0]?.add_image}
                    alt="Product"
                    width={150}
                    height={150}
                  />
  
                  <div className={styles.textContent}>
                    <div>
                    <h3 style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 20
                        ? `${item?.title?.slice(0, 20)}...`
                        : item?.title}
                    </h3>                      <p className={styles.para}>
                        {formatDateToMonthYear(item.created_at) || ""}
                      </p>
                      <p className={styles.para}>
                        {item.local_govt?.local_government_area || ""},{" "}
                        {item?.state?.state_name}
                      </p>
                    </div>
                    <div style={{display:'flex', gap:'5rem', justifyContent:"space-between"}}>
                    <p className={styles.price}>{item.price || ""}</p>
                    {!expired &&
                    <div>
                    <img
                    // className={styles.proImage}
                    src={EditIcon}
                    alt="EditIcon"
                 
                  />
                    <img
                    // className={styles.proImage}
                    src={DeleteIcon}
                    alt="DeleteIcon"
                 
                  />

                    </div>}
                  
  

                    </div>
                  </div>
                  {expired && (
                    <>
                    {/* <p>EXPIRED AD</p> */}

                    
                    <Button
                    type="button"
                    className={styles.activateBtn}
                    text="Activate Ad"
                  />
                  </>
                  )}
  
               
                </div>
              );
            })}
        </div>
        <Pagination
          current={currentPage}
          total={getAdsByUserIdQuery?.data?.data?.total} // Total number of items
          pageSize={20} // Number of items per page
          onChange={onChange} // Handle page change
          showSizeChanger={false} // Hide the option to change the page size
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        />
        </>
      )}
      </div>
    );
  };
  
  export default MyAds;
  

