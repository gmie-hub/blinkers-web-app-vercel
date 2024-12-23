import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useQueries } from "@tanstack/react-query";
import { getMyApplications } from "../../request";
import { AxiosError } from "axios";
import { Pagination, Tabs, TabsProps } from "antd";
import { getTimeAgo } from "../../../utils/formatTime";
import CustomSpin from "../../../customs/spin";
import usePagination from "../../../hooks/usePagnation";
import { useState } from "react";
import { userAtom } from "../../../utils/store";
import { useAtomValue } from "jotai";



const MyApplications = () => {
  const navigate = useNavigate();
  const { currentPage, onChange } = usePagination();
  const user = useAtomValue(userAtom);

  const [activeKey, setActiveKey] = useState(
    () => {
    return "1";
  });
  const handleNavigateDetails = (id: number) => {
    navigate(`/job-details/${id}`);
    window.scrollTo(0, 0);
  };

  const [getAllJobQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-jobs", currentPage],
        queryFn: () => getMyApplications(currentPage,user?.id! ),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const JobData = getAllJobQuery?.data?.data?.data || [];
  const jobError = getAllJobQuery?.error as AxiosError;
  const jobErrorMessage =
    jobError?.message || "An error occurred. Please try again later.";


    
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Pending",
    //   children: <BasicInformation businessDetailsData={businessDetailsData} />,
    },
    {
      key: "2",
      label: "Shortlisted",
    //   children: <Gallery businessDetailsData={businessDetailsData} />,
    },
    {
      key: "3",
      label: "Rejected",
    //   children: <Reviews />,
    },
 
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    localStorage.setItem("activeTabKeyBasicInfo", key); // Store the active tab key in localStorage
  };

  return (
    <div className={styles.whyWrapper}>
      {getAllJobQuery?.isLoading ? (
        <CustomSpin />
      ) : getAllJobQuery?.isError ? (
        <h1 className="error">{jobErrorMessage}</h1>
      ) : (
        <>
         <div>
            <Tabs
              className={styles.tabs}
              activeKey={activeKey} // Use the activeKey from state
              onChange={handleTabChange}
              items={items}
            />
          </div>
        
          <div className={styles.cardContainer}>
            {JobData && JobData?.length > 0 && (
              JobData?.map((item) => (
                <div
                  onClick={() => handleNavigateDetails(item?.id)}
                  className={styles.chooseCard}
                  key={item.id}
                >
                  <div className={styles.cardWrapper}>
                    <img
                      className={styles.icon}
                      src={item?.business?.logo}
                      alt="Image2"
                    />
                    <div className={styles.textContent}>
                      <p className={styles.title}>{item?.title}</p>
                      {item?.business?.name}
                    </div>
                  </div>
                  <div>
                    <span>
                      {" "}
                      {item?.employment_type &&
                        item?.employment_type?.length > 0 &&
                        item?.employment_type?.charAt(0)?.toUpperCase() +
                          item?.employment_type?.slice(1)}
                    </span>{" "}
                    <div className={styles.dot}></div>
                    <span>
                      {" "}
                      {item?.job_type &&
                        item?.job_type?.length > 0 &&
                        item?.job_type?.charAt(0)?.toUpperCase() +
                          item?.job_type?.slice(1)}
                    </span>{" "}
                    <div className={styles.dot}></div>
                    <span>
                      {" "}
                      {item?.level &&
                        item?.level?.length > 0 &&
                        item?.level?.charAt(0).toUpperCase() +
                          item?.level?.slice(1)}
                    </span>
                  </div>
                  <p>{getTimeAgo(item?.created_at || "")}</p>
                </div>
              ))
            ) }
          </div>

          <Pagination
            current={currentPage}
            total={getAllJobQuery?.data?.data?.total} // Total number of items
            pageSize={20} // Number of items per page
            onChange={onChange} // Handle page change
            showSizeChanger={false} // Hide the option to change the page size
            style={{
              marginTop: "20px",
              textAlign: "center", // Center the pagination
              display: "flex",
              justifyContent: "center", // Ensure the pagination is centered
            }}
          />
        </>
      )}
    </div>
  );
};
export default MyApplications;
