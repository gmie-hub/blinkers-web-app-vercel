const routeData = [
  { name: "HOME PAGE", value: "home_page", route: "/" },
  { name: "ALL ADS", value: "all_ads", route: "/market" },
  { name: "POST ADS", value: "post_ads", route: "/create-ad" },
  {
    name: "REGISTER AS SELLER",
    value: "register_as_seller",
    route: "/seller-signUp",
  },

  // Profile Tabs
  { name: "MY ADS", value: "my_ads", route: "/profile", tabKey: "7" },
  { name: "MY FAVORITE", value: "my_favorite", route: "/profile", tabKey: "8" },
  {
    name: "MY APPLICANT PROFILE",
    value: "my_applicant_profile",
    route: "/profile",
    tabKey: "1",
  },
  {
    name: "MY JOBS SELLER",
    value: "my_jobs_seller",
    route: "/profile",
    tabKey: "6",
  },
  {
    name: "MY JOBS BUSINESS OWNER",
    value: "my_jobs_business_owner",
    route: "/profile",
    tabKey: "6",
  },
  {
    name: "MY BUSINESS PROFILE",
    value: "my_business_profile",
    route: "/profile",
    tabKey: "2",
  },
  { name: "MY PROFILE", value: "my_profile", route: "/profile", tabKey: "1" },
  { name: "EDIT JOB", value: "edit_job", route: "/profile", tabKey: "6" },

  // Others
  { name: "REVIEWS", value: "reviews", route: "/reviews" },
  { name: "AUDIENCE", value: "audience", route: "/audience" },
  { name: "MY PLAN", value: "my_plan", route: "/plans" },
  { name: "CHAT", value: "chat", route: "/chat" },
  {
    name: "VIEW APPLICANTS",
    value: "view_applicants",
    route: "/jobs/applicants",
  },
  { name: "CATEGORIES PAGE", value: "categories_page", route: "/categories" },

  { name: "POST A JOB", value: "post_a_job", route: "/post-job" },
  {
    name: "REGISTER AS APPLICANT",
    value: "register_as_applicant",
    route: "/job/register-as-applicant",
  },
  {
    name: "CREATE BUSINESS",
    value: "create_business",
    route: "/job/add-business",
  },
  {
    name: "DIRECTORY HOMEPAGE",
    value: "directory_homepage",
    route: "/directory",
  },
  { name: "JOB HOMEPAGE", value: "job_homepage", route: "/jobs" },
  { name: "HELP", value: "help", route: "/contact-us" },
];

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { App, Pagination, Tabs, TabsProps } from "antd";
import { deleteAds, getUserNotifications, ReadNotification } from "../request";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { userAtom } from "../../utils/store";
import { useAtom } from "jotai";
import usePagination from "../../hooks/usePagnation";
import Icon from "/Container.svg";
import ArrowIcon from "../../assets/arrow-right-noty.svg";
import JobIcon from "../../assets/jobNotyIcon.svg";
import BusinessIcon from "../../assets/businessNotyIcon.svg";
import NotyIcon from "../../assets/Notification.svg";
import { errorMessage } from "../../utils/errorMessage";
import ReusableModal from "../../partials/deleteModal/deleteModal";
import SuccessModalContent from "../../partials/sucessModal";
// import FileIcon from '../../assets/file.svg';
import CustomSpin from "../../customs/spin";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { formatDateToDayMonthYear } from "../../utils/formatTime";

const Notification = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [user] = useAtom(userAtom);
  const [activeKey, setActiveKey] = useState("general");
  // const { currentPage, onChange } = usePagination();
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [markAll, setMarkAll] = useState(false);
  const navigate = useNavigate();
  const [openMarkAll, setOpenMarkAll] = useState(false);
  const { currentPage, setCurrentPage, onChange, pageNum } = usePagination();
  useEffect(() => {
    if (currentPage !== pageNum) {
      setCurrentPage(pageNum);
    }
  }, [pageNum, currentPage, setCurrentPage]);

  console.log(openMarkAll, "openMarkAll");

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

  const [getAllUserNotificationQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-notification", activeKey, currentPage],
        queryFn: () =>
          getUserNotifications(user?.id, undefined, activeKey, currentPage),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const notifyData = getAllUserNotificationQuery?.data?.data?.data;
  const notifyError = getAllUserNotificationQuery?.error as AxiosError;
  const notifyErrorMessage =
    notifyError?.message || "An error occurred. Please try again later.";

  const items: TabsProps["items"] = [
    { key: "", label: "All" },
    { key: "ad", label: "Market" },
    { key: "business", label: "Business" },
    { key: "job", label: "Job" },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    localStorage?.setItem("activeTabKeyBasicInfo", key);
  };

  const readNotificationMutation = useMutation({
    mutationFn: ReadNotification,
    mutationKey: ["read-notification"],
  });
  const readNotificationHandler = async (id?: number) => {
    const payload = {
      // ids: [id],
      // mark_all: markAll,
      user_id: user?.id,
      ...(markAll === false && { ids: [id] }),
      ...(markAll === true && { mark_all: markAll }),
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

  const getRouteFromNotification = (notificationValue: string) => {
    const match = routeData.find((item) => item.value === notificationValue);

    if (match) {
      if (match.route === "/profile" && match.tabKey) {
        localStorage.setItem("activeTabKeyProfile", match.tabKey);
      }

      navigate(match.route);
      window.scroll(0, 0);
    } else {
      console.warn("No matching route for notification:", notificationValue);
    }
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
          {getAllUserNotificationQuery?.isLoading ? (
            <CustomSpin />
          ) : getAllUserNotificationQuery?.isError ? (
            <h1 className="error">{notifyErrorMessage}</h1>
          ) : (
            <>
              <div className={styles.notificationActions}>
                {/* <div
              onClick={() => setIsDeleteModal(true)}
              style={{ display: "flex", gap: "1rem", cursor: "pointer" }}
            >
              <img src={DoneIcon} alt="DoneIcon" />
              <p style={{ color: "#E21B1B" }}> Clear Notification</p>
            </div> */}
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
                      if (item?.is_read === 0) {
                        readNotificationHandler(item?.id);
                      }
                      getRouteFromNotification(item?.notification?.route);
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
                      <div>
                        <div className={styles.notiIcon}>
                          {activeKey === "ad" ? (
                            <img src={NotyIcon} alt=" NotyIcon" />
                          ) :activeKey === "business" ? (
                            <img src={BusinessIcon} alt=" BusinessIcon" />
                          ) : (
                            activeKey=== "job" ?
                            <img src={JobIcon} alt=" JobIcon" /> :
                            <img src={NotyIcon} alt=" NotyIcon" />
                          )}
                          <div>
                            <h3 className={styles.title}>{item?.title}</h3>

                            <h4 className={styles.answer}>
                              {item?.description}
                            </h4>
                            <p className={styles.time}>
                              {formatDateToDayMonthYear(item?.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <img src={ArrowIcon} alt=" ArrowIcon" />

                      {/* <span
                        className={`${styles.arrow} ${
                          activeIndex === uniqueKey ? styles.activeArrow : ""
                        }`}
                      >
                        ▼
                      </span> */}
                    </div>
                    {/* <div>
                      <div className={styles.questionRow}>
                        <h3>{item?.title}</h3>
                        <p className={styles.answer}>{item?.description}</p>
                      </div>
                      <span
                        className={`${styles.arrow} ${
                          activeIndex === uniqueKey ? styles.activeArrow : ""
                        }`}
                      >
                        ▼
                      </span>
                    </div> */}

                    {/* {activeIndex === uniqueKey && (
                  <p className={styles.answer}>{item?.description}</p>
                )} */}
                  </div>
                );
              })}

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
            </>
          )}
        </div>
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
        // Icon={<img src={FileIcon} alt="FileIcon" />}
        message="Mark all as read"
        handleClick={() => readNotificationHandler()}
      />
    </>
  );
};

export default Notification;
