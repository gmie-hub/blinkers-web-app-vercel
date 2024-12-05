import Button from "../../../customs/button/button";
import styles from "./jobDetails.module.scss";
import FlagJobicon from "../../../assets/flag.svg";
import JobLocation from "../../../assets/joblocation.svg";
import StatusBadge from "../../../partials/statusBadge/statusBadge";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import MoreJobsLikeThis from "../jobLikeThis/jobsLikeThis";
import { useNavigate, useParams } from "react-router-dom";
import {  Modal, Spin } from "antd";
import { useState } from "react";
import FlagJob from "./flagJob/flagJob";
import { useQueries } from "@tanstack/react-query";
import { getJobDetails } from "../../request";
import { AxiosError } from "axios";
import { formatAmount, getTimeAgo } from "../../../utils/formatTime";
import DOMPurify from "dompurify";
import JobTypeIcon from "../../../assets/jobtype.svg";
import WorkIcon from "../../../assets/jobarrange.svg";
import JobLevelIon from "../../../assets/joblevel.svg";
import SalaryIcon from "../../../assets/salary.svg";
import RouteIndicator from "../../../customs/routeIndicator";
import { userAtom } from "../../../utils/store";
import { useAtomValue } from "jotai";
import { routes } from "../../../routes";
import ModalContent from "../../../partials/successModal/modalContent";

const JobDetails = () => {
  const navigate = useNavigate();
  const [flagJob, setFlagJob] = useState(false);
  const { id } = useParams();
  const user = useAtomValue(userAtom);
  const [regModal, setRegModal] = useState(false);

  const handleNavigateToMoreJob = () => {
    navigate(`/job/more-jobs-like-this/${id}`);
    window.scrollTo(0, 0);
  };
  const handleNavigateApplyToJob = () => {
    navigate(`/job/apply/${id}`);
    window.scrollTo(0, 0);
  };

  const [getJobDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-jobs-details", id],
        queryFn: () => getJobDetails(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  const JobDetailsData = getJobDetailsQuery?.data?.data;
  const jobDetailsError = getJobDetailsQuery?.error as AxiosError;
  const jobDetailsErrorMessage =
    jobDetailsError?.message || "An error occurred. Please try again later.";

  const getStatus = () => {
    let status;

    switch (JobDetailsData?.status) {
      case "0":
        status = "InActive";
        break;
      case "1":
        status = "Open";
        break;
      case "2":
        status = "Close";
        break;
      default:
        status = "Banned";
    }

    return status;
  };
  const handleFlagJob = () => {
    if (user?.data.is_applicant) {
      setFlagJob(true);
    } else {
      setRegModal(true);
    }
  };
  const handleRegModal = () => {
    navigate(routes?.job?.RegAsApplicant);
  };

  return (
    <main>
      {getJobDetailsQuery?.isLoading ? (
        <Spin />
      ) : getJobDetailsQuery?.isError ? (
        <h1 className="error">{jobDetailsErrorMessage}</h1>
      ) : (
        <div className="wrapper">
          <div>
            <RouteIndicator showBack />
          </div>
          <section className={styles.header}>
            <div>
              <span className={styles.logo}>
                <img
                  className={styles.icon}
                  src={JobDetailsData?.business?.logo}
                  alt="logo"
                />
                <p>{JobDetailsData?.business?.name}</p>
              </span>
              <span className={styles.location}>
                <img src={JobLocation} alt="JobLocation" />
                <p>{JobDetailsData?.location}</p>
              </span>
              <h3 className={styles.jobTitle}>{JobDetailsData?.title}</h3>
              <div className={styles.open}>
                <span style={{ color: "#009900" }}>
                  {getTimeAgo(JobDetailsData?.created_at)}
                </span>
                <div className={styles.dot}></div>

                <span style={{ color: "#828282" }}>
                  {JobDetailsData?.total_applicant} Applicants
                </span>

                <StatusBadge status={getStatus()} />
              </div>
            </div>

            <div className={styles.btnFlex}>
              {JobDetailsData?.status?.toString() === "1" && (
                <div>
                  <Button
                    type="submit"
                    text="Apply For Job"
                    className="buttonStyle"
                    onClick={handleNavigateApplyToJob}
                  />
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  variant="redOutline"
                  text="Flag This Job"
                  className={styles.buttonStyle}
                  icon={<img src={FlagJobicon} alt="FlagJobicon" />}
                  onClick={handleFlagJob}
                />
              </div>
            </div>
          </section>
          <div style={{ marginBlockStart: "4rem" }}>
            {JobDetailsData?.status?.toString() !== "1" && (
              <p style={{ color: "#E21B1B" }}>
                This job is no longer accepting applications
              </p>
            )}

            <section className={styles.container}>
              <div className={styles.info}>
                <img src={JobTypeIcon} alt="TimeIcon" />

                <p>Job Type</p>
              </div>

              <p>{JobDetailsData?.employment_type}</p>

              <div className={styles.info}>
                <img src={JobLevelIon} alt="TimeIcon" />

                <p>Full Time</p>
              </div>

              <p>{JobDetailsData?.level}</p>
              <div className={styles.info}>
                <img src={WorkIcon} alt="TimeIcon" />

                <p>Work Arrangement</p>
              </div>
              <p>{JobDetailsData?.job_type}</p>
              <div className={styles.info}>
                <img src={SalaryIcon} alt="TimeIcon" />

                <p>Salary</p>
              </div>
              <p>
                {formatAmount(parseInt(JobDetailsData?.renumeration || "0"))}{" "}
                <small style={{ color: "#707070" }}>/ month</small>
              </p>
              <span></span>
            </section>
          </div>
          <section className={styles.Description}>
            <div>
              <h3>Job Description:</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(JobDetailsData?.description || ""),
                }}
              />
            </div>

            <div>
              <h3>Key Responsibilities</h3>

              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    JobDetailsData?.responsibilities || ""
                  ),
                }}
              />
            </div>

            <div>
              <h3>Qualifications</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    JobDetailsData?.qualifications || ""
                  ),
                }}
              />{" "}
            </div>
            <div>
              <h3>Benefits</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(JobDetailsData?.benefits || ""),
                }}
              />
            </div>
          </section>
        </div>
      )}
      <section>
        <div className="wrapper">
          <div className={styles.review}>
            <div className={styles.reviewbtn}>
              <p className={styles.title}>More Jobs Like This</p>

              {JobDetailsData?.related_jobs &&
                JobDetailsData?.related_jobs?.length > 4 && (
                  <div
                    onClick={handleNavigateToMoreJob}
                    className={styles.btnWrapper}
                  >
                    <p className={styles.btn}>See All</p>
                    <img src={ArrowIcon} alt="ArrowIcon" />
                  </div>
                )}
            </div>
            {/* <p>No Reviews available yet</p> */}
          </div>
        </div>
        <MoreJobsLikeThis limit={4} canSeeBtn={false} />,
      </section>

      <Modal
        open={flagJob}
        onCancel={() => setFlagJob(false)}
        centered
        title="Flag Job"
        footer={null}
      >
        <FlagJob handleCloseModal={() => setFlagJob(false)} />
      </Modal>

      <ModalContent
        open={regModal}
        handleCancel={() => handleRegModal()}
        handleClick={() => {
          handleRegModal();
        }}
        heading={"Please Register as an applicant before flag this job"}
      />
    </main>
  );
};
export default JobDetails;
