import styles from "./styles.module.scss";
import { useQueries } from "@tanstack/react-query";
import { deleteAds, getMyAdzByUserId } from "../../request";
import { AxiosError } from "axios";
import usePagination from "../../../hooks/usePagnation";
import { formatDateToMonthYear } from "../../../utils/formatTime";
import { App, Pagination } from "antd";
import Button from "../../../customs/button/button";
// import EditIcon from "../../../assets/editgreen.svg";
// import DeleteIcon from "../../../assets/deleteicon.svg";
import CustomSpin from "../../../customs/spin";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../utils/store";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "../../../utils/errorMessage";
import ReusableModal from "../../../partials/deleteModal/deleteModal";
import ModalContent from "../../../partials/successModal/modalContent";
import { useState } from "react";

const MyAds = () => {
  const { currentPage, onChange } = usePagination();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSucessful] = useState(false);
  const [indexData, setIndexData] = useState<ProductDatum>();

  console.log(indexData, "indexData");

  // Check if an ad has expired

  const handleEditAds = (id: number) => {
    navigate(`/edit-ad/${id}`);
  };

  const deleteAdsMutation = useMutation({ mutationFn: deleteAds });

  const DeleteAdsHandler = async (id: number) => {
    try {
      await deleteAdsMutation.mutateAsync(
        {
          id: id,
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "deleted Successfully",
            });
            setIsDeleteModal(false);
            setIsDeleteSucessful(true);

            queryClient.refetchQueries({
              queryKey: ["get-my-market"],
            });
          },
        }
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  const handleDelete = (data: ProductDatum) => {
    setIndexData(data);
    setIsDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setIndexData({} as ProductDatum);
    setIsDeleteModal(false);
  };

  const [getAdsByUserIdQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-my-market",user?.id],
        queryFn: () => getMyAdzByUserId(user?.id),
        refetchOnWindowFocus: true,
        enabled:!!user?.id
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
                const expired =item?.status ===4;

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
                        </h3>{" "}
                        <p className={styles.para}>
                          {formatDateToMonthYear(item.created_at) || ""}
                        </p>
                        <p className={styles.para}>
                          {item.local_govt?.local_government_area || ""},{" "}
                          {item?.state?.state_name}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5rem",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className={styles.price}>{item.price || ""}</p>
                        {!expired && (
                          <div>
                            {/* <img
                              // className={styles.proImage}
                              src={EditIcon}
                              alt="EditIcon"
                              width={40}
                              onClick={()=>{handleEditAds(item?.id)}}
                            /> */}
                            <p
                              onClick={() => {
                                handleEditAds(item?.id);
                              }}
                            >
                              Edit
                            </p>
                            {/* <img
                              // className={styles.proImage}
                              src={DeleteIcon}
                              alt="DeleteIcon"
                              width={40}
                              onClick={() => handleDelete(item)}

                            /> */}
                            <p
                              onClick={() => {
                                handleDelete(item);
                              }}
                            >
                              Delete
                            </p>
                          </div>
                        )}
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
      <ReusableModal
        open={isDeleteModal}
        handleCancel={handleCloseDelete}
        handleConfirm={() => DeleteAdsHandler(indexData?.id || 0)}
        title={`Are you sure you want to delete ${
          indexData?.title || "this item"
        }?`}
        description="All details about this Ad will be deleted along with the user applications."
        confirmText="Yes, Delete Ad"
        cancelText="No, Go Back"
        disabled={deleteAdsMutation?.isPending}
      />

      <ModalContent
        open={isDeleteSuccessful}
        handleCancel={() => {
          setIsDeleteSucessful(false);
        }}
        handleClick={() => {
          setIsDeleteSucessful(false);
        }}
        text={"Ad Deleted Successfully"}
      />
    </div>
  );
};

export default MyAds;
