import Button from "../../../customs/button/button";
import styles from "./jobDetails.module.scss";
import Joblogo from "../../../assets/joblogo.svg";
import FlagJobicon from "../../../assets/flag.svg";
import JobLocation from "../../../assets/joblocation.svg";
import StatusBadge from "../../../partials/statusBadge/statusBadge";
import ArrowIcon from "../../../assets/arrow-right-green.svg";
import MoreJobsLikeThis from "../jobLikeThis/jobsLikeThis";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useState } from "react";
import FlagJob from "./flagJob/flagJob";

const JobDetails = () => {
  const navigate = useNavigate();
  const [flagJob, setFlagJob] = useState(false);

  const handleNavigateToMoreJob = () => {
    navigate("/job/more-jobs-like-this");
    window.scrollTo(0, 0);

  }; 
  const handleNavigateApplyToJob = () => {
    navigate("/job/apply");
    window.scrollTo(0, 0);
  };


  const status = "open"
  return (
    <main>
      <div className="wrapper">
        <section className={styles.header}>
          <div>
            <span className={styles.logo}>
              <img src={Joblogo} alt="Joblogo" />
              <p>Stripe</p>
            </span>
            <span className={styles.location}>
              <img src={JobLocation} alt="JobLocation" />
              <p>4, blinkers street, Lekki, Nigeria</p>
            </span>
            <h3 className={styles.jobTitle}>Customer Experience Manager</h3>
            <div className={styles.open}>
              <span style={{ color: "#009900" }}>10 hours ago</span>
              <div className={styles.dot}></div>

              <span style={{ color: "#828282" }}>20 Applicants</span>
              <StatusBadge status={status} />
            </div>
          </div>

          <div className={styles.btnFlex}>
            { status === 'open' &&
               <div>
               <Button
                 type="submit"
                 text="Apply For Job"
                 className="buttonStyle"
                 onClick={handleNavigateApplyToJob}
               />
             </div>

            }
         
            <div>
              <Button
                type="submit"
                variant="redOutline"
                text="Flag This Job"
                className={styles.buttonStyle}
                icon={<img src={FlagJobicon} alt="FlagJobicon" />}
                onClick={()=>{setFlagJob(true)}}
              />
            </div>
            {
                status !== 'open'
                &&
                <p>This job is no longer accepting applications</p>
            }
          </div>
        </section>
        <section className={styles.container}>
          <p>Job Type</p>
          <p>Job Level</p>
          <p>Full Time</p>
          <p>Mid level</p>
          <p>Work Arrangement</p>
          <p>Remote</p>
          <p>Salary</p>
          <p>
            NGN 250,000 <small style={{ color: "#707070" }}>/ month</small>
          </p>
          <span></span>
        </section>
        <section className={styles.Description}>
          <div>
            <h3>Job Description:</h3>
            <p>
              As the Customer Experience Manager, you will be responsible for
              ensuring that every touchpoint with our customers is smooth,
              engaging, and positive. You will play a key role in shaping the
              customer journey, from onboarding to ongoing support, while
              working closely with various departments to improve processes and
              services.
            </p>
          </div>

          <div>
            <h3>Key Responsibilities</h3>

            <ul className={styles.list}>
              <li>
                Design and implement strategies to improve the overall customer
                experience, ensuring satisfaction at every stage of the customer
                journey.
              </li>
              <li>
                Analyze customer feedback, conduct surveys, and use data to
                drive improvements in service quality and customer engagement.
              </li>
              <li>
                Develop and manage customer support processes, ensuring timely
                and effective resolutions for customer inquiries and complaints.
              </li>
              <li>
                Collaborate with product, marketing, and sales teams to align
                the customer experience with brand values and business goals.
              </li>
              <li>
                Monitor key customer experience metrics, such as NPS (Net
                Promoter Score), CSAT (Customer Satisfaction), and churn rates.
              </li>
              <li>
                Train and mentor customer support teams to deliver outstanding
                service, implementing best practices for customer interactions.
              </li>
            </ul>
          </div>

          <div>
            <h3>Qualifications</h3>
            <ul className={styles.list}>
              <li>
                Bachelor’s degree in Business, Marketing, or a related field.
              </li>
              <li>
                3+ years of experience in customer experience, customer service,
                or a similar role.
              </li>
              <li>
                Strong leadership and communication skills with a customer-first
                mentality.
              </li>
              <li>
                Experience with customer feedback tools and CRM systems (e.g.,
                Zendesk, Salesforce, or HubSpot).
              </li>
              <li>
                Ability to analyze data and customer feedback to identify trends
                and actionable insights.
              </li>
              <li>
                Proven track record of driving customer satisfaction, loyalty,
                and retention.
              </li>
              <li>
                Excellent problem-solving skills and the ability to think
                strategically.
              </li>
            </ul>
          </div>
          <div>
            <h3>Benefits</h3>
            <ul className={styles.list}>
              <li>Opportunities for professional development and growth.</li>
              <li>A dynamic, inclusive, and collaborative work environment.</li>
              <li>
                [Any additional benefits: health insurance, remote work,
                flexible hours, etc.]
              </li>
            </ul>
          </div>
        </section>
      </div>
      <section>
        <div className="wrapper">
          <div className={styles.review}>
            <div className={styles.reviewbtn}>
              <h1>More Jobs Like This</h1>

              <div
                onClick={handleNavigateToMoreJob}
                className={styles.btnWrapper}
              >
                <p className={styles.btn}>See All</p>
                <img src={ArrowIcon} alt="ArrowIcon" />
              </div>
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
    </main>
  );
};
export default JobDetails;
