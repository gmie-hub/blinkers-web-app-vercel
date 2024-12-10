import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { getTimeAgo } from "../../../utils/formatTime";
import { AxiosError } from "axios";
import { useQueries } from "@tanstack/react-query";
import { getJobDetails } from "../../request";
import RouteIndicator from "../../../customs/routeIndicator";
import CustomSpin from "../../../customs/spin";

interface Props {
  canSeeBtn?: boolean;
  limit?: number;
}

const MoreJobsLikeThis = ({ canSeeBtn = true, limit }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [getJobDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-jobs-details", id],
        queryFn: () => getJobDetails(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        // enabled:!!id
      },
    ],
  });

  const JobDetailsData = getJobDetailsQuery?.data?.data;
  const jobDetailsError = getJobDetailsQuery?.error as AxiosError;
  const jobDetailsErrorMessage =
    jobDetailsError?.message || "An error occurred. Please try again later.";

  const reletedJob = JobDetailsData?.related_jobs;

  const relatedJobsData =
    reletedJob && reletedJob?.length > 0
      ? reletedJob.slice(0, limit)
      : reletedJob;

  const businessReviewErrorMessage = "Failed to load reviews";
  const handleNavigateDetails = (id: number) => {
    navigate(`/job-details/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="wrapper">
      <div className={styles.whyWrapper}>
        {canSeeBtn && (
          // <div onClick={() => navigate(-1)} className={styles.back}>
          //   <img src={BackIcon} alt="BackIcon" />
          //   <p>Back</p>
          // </div>
          <RouteIndicator showBack />
        )}

        {getJobDetailsQuery?.isLoading ? (
           <CustomSpin />
        ) : getJobDetailsQuery?.isError ? (
          <h1 className="error">{jobDetailsErrorMessage}</h1>
        ) : (
          <div className={styles.cardContainer}>
            {/* Only map through the data if it's not empty */}
            {relatedJobsData && relatedJobsData.length > 0 ? (
              relatedJobsData?.map((item: any, index: any) => (
                <div
                  onClick={() => handleNavigateDetails(item?.id)}
                  className={styles.chooseCard}
                  key={index}
                >
                  <div className={styles.cardWrapper}>
                    {/* <div className={styles.icon}>{item.icon}</div> */}
                    <div className={styles.textContent}>
                      <h3>{item?.title}</h3>
                      <p>Blinkers Nigeria</p>
                      {/* <p>{card.value}</p> Assuming card has a value to display */}
                    </div>
                  </div>
                  <div className={styles.full}>
                    <span>{item?.employment_type}</span>{" "}
                    <span className={styles.dot}></span>
                    <span>{item?.job_type}</span>{" "}
                    <span className={styles.dot}></span>
                    <span>{item?.level}</span>
                    <p className={styles.posted}>
                      {getTimeAgo(item?.created_at || "")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>{businessReviewErrorMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreJobsLikeThis;
