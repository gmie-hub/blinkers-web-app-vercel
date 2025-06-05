import { useNavigate } from "react-router-dom";
import styles from "./card.module.scss";
import { useQueries } from "@tanstack/react-query";
import { getAllJobs } from "../../request";
import { AxiosError } from "axios";
import { Pagination, Image } from "antd";
import { getTimeAgo } from "../../../utils/formatTime";
import FaArrowLeft from "../../../assets/backArrow.svg";
import Button from "../../../customs/button/button";
import CustomSpin from "../../../customs/spin";
import usePagination from "../../../hooks/usePagnation";
import { useEffect } from "react";
import { sanitizeUrlParam } from "../../../utils";
import LocationIcon from "../../../assets/locationrelated.svg";

interface Props {
  searchTerm: string;
  resetSearchTerm: () => void;
}

const JobLists = ({ searchTerm, resetSearchTerm }: Props) => {
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, onChange, pageNum } = usePagination();
  useEffect(() => {
    if (currentPage !== pageNum) {
      setCurrentPage(pageNum);
    }
  }, [pageNum, currentPage, setCurrentPage]);

  // const handleNavigateDetails = (
  //   id: number,
  //   title: string,
  //   description:string,
  // ) => {
  //   navigate(
  //     `/job-details/${id}/${sanitizeUrlParam(title)}/${sanitizeUrlParam(description)}`
  //   );
  //   window.scrollTo(0, 0);
  // };

  const handleNavigateDetails = (
    id: number,
    title: string,
  ) => {
    navigate(
      `/job-details/${id}/${sanitizeUrlParam(title)}`
    );
    window.scrollTo(0, 0);
  };

  const [getAllJobQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-jobs", currentPage, searchTerm],
        queryFn: () => getAllJobs(currentPage, searchTerm),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const JobData = getAllJobQuery?.data?.data?.data || [];
  const jobError = getAllJobQuery?.error as AxiosError;
  const jobErrorMessage =
    jobError?.message || "An error occurred. Please try again later.";

  const handleBack = () => {
    resetSearchTerm();
    setCurrentPage(1);
    navigate("/jobs");
    getAllJobQuery.refetch();
  };

  return (
    <div className={styles.whyWrapper}>
      {getAllJobQuery?.isLoading ? (
        <CustomSpin />
      ) : getAllJobQuery?.isError ? (
        <h1 className="error">{jobErrorMessage}</h1>
      ) : (
        <>
          {/* <p>{searchTerm?.length > 0 && "Viewall"}</p> */}
          {searchTerm?.length > 0 && JobData?.length > 0 && (
            <div>
              <Button
                type="button"
                className="buttonStyle"
                onClick={handleBack}
                text="view all jobs"
                icon={<img src={FaArrowLeft} alt="FaArrowLeft" />}
              />
              <br />
              <br />
            </div>
          )}

          <div className={styles.cardContainer}>
            {JobData && JobData?.length > 0 ? (
              JobData?.map((item) => (
                <div
                  onClick={() =>
                    handleNavigateDetails(
                      item?.id,
                      item?.title,
                    )
                  }
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
                        item?.level?.charAt(0)?.toUpperCase() +
                          item?.level?.slice(1)}
                    </span>
                  </div>
                  <p>{getTimeAgo(item?.created_at || "")}</p>
                  {item?.location && (
                    <div style={{ display: "flex" }}>
                      <Image width={20} src={LocationIcon} alt="LocationIcon" />
                      <p>{item?.location}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <section style={{ width: "100%" }}>
                <div className="noDataContainer">
                  <p>No data available</p>
                  <Button
                    type="button"
                    className="buttonStyle"
                    onClick={handleBack}
                    text="view all jobs"
                    icon={<img src={FaArrowLeft} alt="FaArrowLeft" />}
                  />
                </div>
              </section>
            )}
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
export default JobLists;
