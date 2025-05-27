import { useState } from "react";
import styles from "./index.module.scss";
import { Pagination, Tabs, TabsProps } from "antd";
import { getUserNotifications, ReadNotification } from "../request";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { userAtom } from "../../utils/store";
import { useAtom } from "jotai";
import usePagination from "../../hooks/usePagnation";

const Notification = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [activeKey, setActiveKey] = useState("0");
  const { currentPage, onChange } = usePagination();
  const queryClient = useQueryClient();

  const toggleFAQ = (uniqueKey: string | null) => {
    setActiveIndex((prevKey) => (prevKey === uniqueKey ? null : uniqueKey));
  };

  const [getAllUserNotificationQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-notification",activeKey],
        queryFn: () => getUserNotifications(user?.id,parseInt(activeKey)),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    
    ],
  });

  const notifyData = getAllUserNotificationQuery?.data?.data?.data;
  // const  notifyTotal = getAllUserNotificationQuery?.data?.data?.total;

  const items: TabsProps["items"] = [
    { key: "0", label: "Unread" },
    { key: "1", label: "Read" },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    localStorage?.setItem("activeTabKeyBasicInfo", key);
  };
  
  const readNotificationMutation = useMutation({
    mutationFn: ReadNotification,
    mutationKey: ["read-notification"],
  });
  const readNotificationHandler = async (id:number) => {
    const payload = {
      ids: [id],
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
    } catch (error) {
      console.error("Unexpected error", error);
    }
  };

  return (
    <div className="wrapper">
      <h2> Notifications</h2>

      {/* General Questions */}

      <div className={styles.card}>
        <div>
          <Tabs
            className={styles.tabs}
            activeKey={activeKey}
            onChange={handleTabChange}
            items={items}
          />
        </div>
        {notifyData?.map((item: NotificationDatum, index: number) => {
          const uniqueKey = `faq-${index}`;
          return (
            <div
              key={uniqueKey}
              className={`${styles.faq} ${
                activeIndex === uniqueKey ? styles.active : ""
              }`}
              onClick={() => {toggleFAQ(uniqueKey);
                // if (item?.is_read === 0) {
                //     readNotificationHandler(item?.id);
                //   }
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
  );
};

export default Notification;
