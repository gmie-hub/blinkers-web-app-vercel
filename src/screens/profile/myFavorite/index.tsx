import styles from "./myFavorite.module.scss";
import { useQueries } from "@tanstack/react-query";
import {  getMyAdzByUserId } from "../../request";
import { AxiosError } from "axios";
import usePagination from "../../../hooks/usePagnation";
import { formatDateToMonthYear } from "../../../utils/formatTime";
import {  Pagination } from "antd";
import CustomSpin from "../../../customs/spin";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../utils/store";
import favorite from "../../../assets/Icon + container.svg";

const MyFavorite = () => {
  const { currentPage, onChange } = usePagination();
  const user = useAtomValue(userAtom);


 
  const [getAdsByUserIdQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-my-market", user?.id],
        queryFn: () => getMyAdzByUserId(user?.id!),
        refetchOnWindowFocus: true,
        enabled: !!user?.id,
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
              adsData?.map((item: ProductDatum, index: number) => {

                return (
                  <div
                    className={`${styles.chooseCard}                   }`}
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
                      <div style={{ marginBottom: "50px" }}>
                        <h3 style={{ color: "#4F4F4F" }}>
                          {item?.title && item?.title?.length > 20
                            ? `${item?.title?.slice(0, 20)}...`
                            : item?.title}
                        </h3>{" "}
                        <p className={styles.para}>
                          {formatDateToMonthYear(item.created_at) || ""}
                        </p>
                        <p className={styles.para}>
                          {item.local_govt?.local_government_area || ""},{" "}
                          {item?.state?.state_name}
                        </p>
                      </div>

                      <div className={styles.favorite}>
                        <span style={{ color: "#222222", fontWeight: "600" }}>
                          {/* ₦{item?.price} */}
                          {item?.discount_price === "" ? (
                            <span>{`₦${item?.price}`}</span>
                          ) : (
                            <span className={styles.canceledText}>
                              {`₦${item?.price}`}{" "}
                            </span>
                          )}
                          <span>
                            {" "}
                            {item?.discount_price &&
                              `₦${item?.discount_price} `}
                          </span>
                        </span>
                        <div>
                          <img src={favorite} alt="" />
                        </div>


                      </div>
                    </div>
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

export default MyFavorite;
