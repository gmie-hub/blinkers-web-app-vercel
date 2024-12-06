import styles from "./job.module.scss";
import { Image, notification } from "antd";
import { useState } from "react";
import Icon from "/Container.svg";
import SearchInput from "../../customs/searchInput";
import Button from "../../customs/button/button";
import job1 from "../../assets/job1.svg";
import job2 from "../../assets/job2.svg";
import { useNavigate, useParams } from "react-router-dom";
import ModalContent from "../../partials/successModal/modalContent";
import warn from "../../assets/warning-circle-svgrepo-com 2.svg";
import Section2 from "./cards/cards";
import { userAtom } from "../../utils/store";
import { useAtomValue } from "jotai";
import { routes } from "../../routes";

const Jobs = () => {
  const navigate = useNavigate();
  const [openAddBusiness, setOpenAddBusiness] = useState(false);
  let { search } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(search || "");
  const user = useAtomValue(userAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search query state
  };

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
    console.log("Search Term Sent:", searchTerm);
    search = "";
  };

  const handleNavigateRegisterAsAnApplicant = () => {
    navigate("/job/register-as-applicant");
    window.scrollTo(0, 0);
  };


 
  const handleNavigateAddBusiness = () => {
    const currentPath = location.pathname;
  
    if (!user) {
      // Show notification before navigating
      notification.error({
        message: 'Log in required',
        description: 'You need to log in to access this page!',
        placement: 'top',
        duration: 4, 
        onClose: () => {
          navigate(`/login?redirect=${currentPath}`);
        },
      });
    } else if (
      user?.data?.claim_status === null ||
      user?.data?.claim_status?.toString() === '2'
    ) {
      setOpenAddBusiness(true);
    } else {
      navigate(routes.job.postJob);
    }
  
    window.scrollTo(0, 0);
  };
  
  
  const handleCloseBusinessModal = () => {
    setOpenAddBusiness(false);
    navigate(routes.job.AddBusiness);
  };


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
                placeholder="Search for a Job..."
                // width="40rem"
                // isBtn={true}
                onChange={handleInputChange}
              >
                <Button
                  type="button"
                  variant="green"
                  text="Search"
                  className={styles.searchBtn}
                  onClick={handleSearch} // Set appliedSearchTerm here
                />
              </SearchInput>
            </div>
          </div>
          <div className={styles.btnFlex}>
            <Button
              icon={<Image src={job1} alt={job1} preview={false} />}
              className={styles.buttonStyle}
              text="Post a Job"
              variant="white"
              onClick={handleNavigateAddBusiness}
            />

            {!user?.data?.is_applicant && (
              <Button
                icon={<Image src={job2} alt={job2} preview={false} />}
                className={styles.WhiteButtonStyle}
                text="Register as An Applicant"
                variant="white"
                onClick={handleNavigateRegisterAsAnApplicant}
              />
            )}
          </div>
        </div>
        <Section2 searchTerm={appliedSearchTerm} />
      </div>

      <ModalContent
        icon={<img src={warn} alt="warn" />}
        open={openAddBusiness}
        handleCancel={() => setOpenAddBusiness(false)}
        handleClick={handleCloseBusinessModal}
        BtnText="Add Business To Directory"
        heading="Business Not Added To Directory"
        text={
          "It looks like your business has not been registered in our directory, Add your business to the directory now to be able to post jobs."
        }
      />
      {/* <ModalContent
        icon={<img src={warn} alt="warn" />}
        open={loginModal}
        handleCancel={() => setOpenLoginModal(false)}
        handleClick={handleNavigateToLogin}
        BtnText="Login"
        heading="Please Login to continue"
      /> */}
    </div>
  );
};

export default Jobs;
