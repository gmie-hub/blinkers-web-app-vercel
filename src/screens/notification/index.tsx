import { useState } from "react";
import styles from "./index.module.scss";
import { App, Pagination, Tabs, TabsProps } from "antd";
import { deleteAds, getUserNotifications, ReadNotification } from "../request";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { userAtom } from "../../utils/store";
import { useAtom } from "jotai";
import usePagination from "../../hooks/usePagnation";
import Icon from "/Container.svg";
import DoneIcon from "../../assets/deleteicon.svg";
import { errorMessage } from "../../utils/errorMessage";
import ReusableModal from "../../partials/deleteModal/deleteModal";
import SuccessModalContent from "../../partials/sucessModal";
import FileIcon from '../../assets/file.svg';

const Notification = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [activeKey, setActiveKey] = useState("0");
  const { currentPage, onChange } = usePagination();
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [markAll, setMarkAll] = useState(false);
  const [openMarkAll, setOpenMarkAll] = useState(false);

  const handleCloseDelete = () => {
    setIsDeleteModal(false);
  };
  const clearNotyMutation = useMutation({ mutationFn: deleteAds });

  const clearNotyHandler = async (id: number) => {
    try {
      await clearNotyMutation.mutateAsync(
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

  const toggleFAQ = (uniqueKey: string | null) => {
    setActiveIndex((prevKey) => (prevKey === uniqueKey ? null : uniqueKey));
  };

  const [getAllUserNotificationQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-notification", activeKey],
        queryFn: () => getUserNotifications(user?.id),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const notifyData = getAllUserNotificationQuery?.data?.data?.data;
  // const  notifyTotal = getAllUserNotificationQuery?.data?.data?.total;

  const items: TabsProps["items"] = [
    { key: "0", label: "General" },
    { key: "1", label: "Business" },
    { key: "2", label: "Job" },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    localStorage?.setItem("activeTabKeyBasicInfo", key);
  };

  const readNotificationMutation = useMutation({
    mutationFn: ReadNotification,
    mutationKey: ["read-notification"],
  });
  const readNotificationHandler = async (id: number) => {
    const payload = {
      ids: [id],
      mark_all: markAll,
      // ...(markAll === false && { ids: [id] }),


    };

    try {
      await readNotificationMutation.mutateAsync(payload, {
        onSuccess: () => {
          console.log("Notification marked as read");
          // Maybe refetch notifications or show a success message
          queryClient.refetchQueries({
            queryKey: ["get-all-notification"],
          });
        },
        onError: (error) => {
          console.error("Error reading notification", error);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
    setOpenMarkAll(false);

    setMarkAll(false);
  };

  return (
    <>
      <div className="wrapper">
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${Icon})`,
          }}
        >
          <div className={styles.home}>
            <p className={styles.picHead}>Notifications</p>
            <p className={styles.picPara}>
              Stay updated and never miss anything
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <Tabs
              className={styles.tabs}
              activeKey={activeKey}
              onChange={handleTabChange}
              items={items}
            />
          </div>
          <div className={styles.notificationActions}>
            <div
              onClick={() => setIsDeleteModal(true)}
              style={{ display: "flex", gap: "1rem", cursor: "pointer" }}
            >
              <img src={DoneIcon} alt="DoneIcon" />
              <p style={{ color: "#E21B1B" }}> Clear Notification</p>
            </div>
            <p
              onClick={() => {
                setOpenMarkAll(true);

                setMarkAll(true);
              }}
              style={{ color: "#159FAF", cursor: "pointer" }}
            >
              Mark all as read
            </p>
          </div>

          {notifyData?.map((item: NotificationDatum, index: number) => {
            const uniqueKey = `faq-${index}`;
            return (
              <div
                key={uniqueKey}
                className={`${styles.faq} ${
                  activeIndex === uniqueKey ? styles.active : ""
                }`}
                onClick={() => {
                  toggleFAQ(uniqueKey);
                  if (item?.is_read === 0) {
                    readNotificationHandler(item?.id);
                  }
                }}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  backgroundColor: item?.is_read === 0 ? "#F4FEFC" : "#fff",
                }}
              >
                <div className={styles.questionRow}>
                  <h3>{item?.title}</h3>
                  <span
                    className={`${styles.arrow} ${
                      activeIndex === uniqueKey ? styles.activeArrow : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
                {activeIndex === uniqueKey && (
                  <p className={styles.answer}>{item?.description}</p>
                )}
              </div>
            );
          })}
        </div>
        <Pagination
          current={currentPage}
          total={getAllUserNotificationQuery?.data?.data?.total}
          pageSize={20}
          onChange={onChange}
          showSizeChanger={false}
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
      <ReusableModal
        open={isDeleteModal}
        handleCancel={handleCloseDelete}
        handleConfirm={() => clearNotyHandler(0)}
        title={"Are You Sure You Want to Clear This Notification?"}
        description="This action cannot be reversed"
        confirmText={
          clearNotyMutation?.isPending
            ? "loading... "
            : "Yes, Clear Notifications"
        }
        cancelText="No, Go Back"
        disabled={clearNotyMutation?.isPending}
      />

      <SuccessModalContent
        openSuccess={openMarkAll}
        text="You are about to mark all Notification as read. Are you sure you want to continue?"
        onClose={() => {
          setMarkAll(false);
          setOpenMarkAll(false);
        }}
        buttonText={"Yes, Mark all as read"}
        show2Button={true}
        showButton={false}
        icon={<img src={FileIcon} alt="FileIcon" />}        
        message="Mark all as read"
        // handleClick={MarkasPaidHandler}
      />
    </>
  );
};

export default Notification;
