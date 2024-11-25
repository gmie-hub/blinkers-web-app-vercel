import styles from "./job.module.scss";
import { Image, Pagination } from "antd";
import { useState } from "react";
import Icon from "/Container.svg";
import SearchInput from "../../customs/searchInput";
import Button from "../../customs/button/button";
import job1 from "../../assets/job1.svg";
import job2 from "../../assets/job2.svg";
import { cardData } from "./data";
import { useNavigate } from "react-router-dom";
import ModalContent from "../../partials/successModal/modalContent";
import warn from "../../assets/warning-circle-svgrepo-com 2.svg";
import Section2 from "./cards/cards";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);

  // Calculate the data to display for the current page
  //   const indexOfLast = currentPage * itemsPerPage;
  //   const indexOfFirst = indexOfLast - itemsPerPage;
  //   const currentCards = cardData.slice(indexOfFirst, indexOfLast);

  // Handle page change
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNavigateRegisterAsAnApplicant = () => {
    navigate("/job/register-as-applicant");
    window.scrollTo(0, 0);
  };

  
  const handleNavigateAddBusiness= () => {
    // navigate("/job/add-business"); 
       navigate("/post-job");


    window.scrollTo(0, 0);
  };

  // const handleNavigatePostJob = () => {
  //   navigate("/post-job");
  //   window.scrollTo(0, 0);
  // };


  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
          }}
        >
          <div className={styles.home}>
            <p className={styles.picHead}>Jobs</p>
          </div>
          <div>
            <div className={styles.searchWrapper}>
              <SearchInput
                placeholder="Search businesses..."
                // width="40rem"
                isBtn={true}
              />
            </div>
          </div>
          <div className={styles.btnFlex}>
            <Button
              icon={<Image src={job1} alt={job1} preview={false} />}
              className={styles.buttonStyle}
              text="Post a Job"
              variant="white"
              // onClick={() => setOpenSuccess(true)}
              onClick={handleNavigateAddBusiness}
            />

            <Button
              icon={<Image src={job2} alt={job2} preview={false} />}
              className={styles.WhiteButtonStyle}
              text="Register as An Applicant"
              variant="white"
              onClick={handleNavigateRegisterAsAnApplicant}
            />
          </div>
        </div>
        <Section2 />
      </div>

      <Pagination
        current={currentPage}
        total={cardData.length} // Total number of items
        pageSize={itemsPerPage} // Number of items per page
        onChange={onPageChange} // Handle page change
        showSizeChanger={false} // Hide the option to change the page size
        style={{
          marginTop: "20px",
          textAlign: "center", // Center the pagination
          display: "flex",
          justifyContent: "center", // Ensure the pagination is centered
        }}
      />

      <ModalContent
        icon={<img src={warn} alt="warn" />}
        open={openSuccess}
        handleCancel={() => setOpenSuccess(false)}
        handleClick={() => {
          setOpenSuccess(false);
        }}
        BtnText='Add Business To Directory'
        heading="Business Not Added To Directory"
        text={
          "It looks like your business has not been registered in our directory, Add your business to the directory now to be able to post jobs."
        }
      />
    </div>
  );
};

export default Jobs;
