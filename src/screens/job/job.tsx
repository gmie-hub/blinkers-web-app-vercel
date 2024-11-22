import styles from "./job.module.scss";
import { Image, Pagination } from "antd";
import Product2 from "../../assets/Image.svg";
import Product3 from "../../assets/Image (1).svg";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "/Container.svg";
import SearchInput from "../../customs/searchInput";
import Button from "../../customs/button/button";
import job1 from "../../assets/job1.svg";
import job2 from "../../assets/job2.svg";
import Section2 from "./cards/cards";
import { cardData } from "./data";



const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set the number of items per page
  const navigate = useNavigate();

  // Calculate the data to display for the current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirst, indexOfLast);

  // Handle page change
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNavigateToNotClaim = useCallback(
    (id: number) => {
      navigate(`/not-claim/${id}`);
    },
    [navigate]
  );

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
            />

            <Button
              icon={<Image src={job2} alt={job2} preview={false} />}
              className={styles.WhiteButtonStyle}
              text="Register as An Applicant"
              variant="white"
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
    </div>
  );
};

export default Jobs;
