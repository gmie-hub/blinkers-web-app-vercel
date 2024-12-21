import styles from "./directory.module.scss";
import { Image, notification, Pagination } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "/Container.svg";
import SearchInput from "../../customs/searchInput";
import CallIcon from "../../assets/callrelated.svg";
import LocationIcon from "../../assets/locationrelated.svg";
import { useQueries } from "@tanstack/react-query";
import { getAllBusiness } from "../request";
import { AxiosError } from "axios";
import Button from "../../customs/button/button";
import CustomSpin from "../../customs/spin";
import FaArrowLeft from "../../assets/backArrow.svg";
import usePagination from "../../hooks/usePagnation";
import { userAtom } from "../../utils/store";
import { useAtomValue } from "jotai";

const Directory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  let { search } = useParams();
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(search || "");
  const { currentPage, setCurrentPage, onChange } = usePagination();
  const currentPath = location.pathname;
  const user = useAtomValue(userAtom);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search query state
  };
  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
  };

  const handleNavigateDirectory = (id: number) => {
    navigate(`/directory-details/${id}`);
    window.scroll(0,0)
  };

  const [getAllDirectoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-directory", appliedSearchTerm, currentPage],
        queryFn: () => getAllBusiness(appliedSearchTerm, currentPage),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const directoryData = getAllDirectoryQuery?.data?.data?.data || [];
  const directoryError = getAllDirectoryQuery?.error as AxiosError;
  const directoryErrorMessage =
    directoryError?.message || "An error occurred. Please try again later.";

  const handleBack = () => {
    setAppliedSearchTerm("");
    setSearchTerm("");
    setCurrentPage(1);
    navigate("/directory");
    getAllDirectoryQuery?.refetch();
  };
  const handleAddDirectory = () =>{
    if (!user) {
      notification.error({
        message: "Log in required",
        description: "You need to log in to access this page!",
        placement: "top",
        duration: 4,
        onClose: () => {
          navigate(`/login?redirect=${currentPath}`);
        },
      });
    } 
    else if(user?.business === null){
      navigate('/job/add-business')
    } else 
    navigate("/profile/2")
  }

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
            <p className={styles.picHead}>Directory</p>
            <p className={styles.picPara}>Explore various business listings</p>
          </div>
          <div className={styles.searchWrapper}>
            <SearchInput
              placeholder="Search Businesses..."
              // width="40rem"
              // isBtn={true}

              onChange={handleInputChange}
            >
              <Button
                type="button"
                variant="green"
                text="Search"
                className={styles.searchBtn}
                onClick={handleSearch}
              />
            </SearchInput>
          </div>
          <div style={{display:'flex', justifyContent:'center', marginBlockStart:'2.4rem'}}>
          <Button
            type="button"
            variant="white"
            text={!user   ||  user?.claim_status === null ||
              user?.claim_status?.toString() === "2" ||
              user?.claim_status?.toLowerCase() === "rejected" ?
               "Add your Business to Directory":  user?.claim_status?.toLowerCase()  === 'pending'?
                'Your business is pending review' :   user?.business?.name}
            className={styles.buttonStyle}
            onClick={handleAddDirectory}
          />
        </div>
        </div>
      </div>
      <div className={styles.whyWrapper}>
      

        {getAllDirectoryQuery?.isLoading ? (
          <CustomSpin />
        ) : getAllDirectoryQuery?.isError ? (
          <h1 className="error">{directoryErrorMessage}</h1>
        ) : (
          <>
            {appliedSearchTerm?.length > 0 && directoryData?.length > 0 && (
              <div>
                <Button
                  type="button"
                  className="buttonStyle"
                  onClick={handleBack}
                  text="view all"
                  icon={<img src={FaArrowLeft} alt="FaArrowLeft" />}
                />
                <br />
                <br />
              </div>
            )}

            <section className={styles.promoImageContainer}>
              {directoryData && directoryData?.length > 0 ? (
                directoryData?.map((item: any, index: number) => (
                  <div
                    className={styles.promoImage}
                    key={index}
                    onClick={() => handleNavigateDirectory(item?.id)}
                  >
                    <img
                      src={item?.logo}
                      alt="Image2"
                      className={styles.proImage}
                    />
                    <div className={styles.productList}>
                      <p className={styles.title}>
                        {/* {item?.name} */}
                        {item?.name && item?.name?.length > 20
                          ? item?.name?.slice(0, 20) + "..."
                          : item?.name}
                      </p>
                      {item?.address && (
                        <div className={styles.info}>
                          <Image
                            width={20}
                            src={LocationIcon}
                            alt="LocationIcon"
                          />
                          <p>
                            {item?.address && item?.address?.length > 20
                              ? item?.address?.slice(0, 20) + "..."
                              : item?.address}
                          </p>
                        </div>
                      )}
                      <div className={styles.info}>
                        <Image width={20} src={CallIcon} alt="CallIcon" />

                        <p>{item?.phone}</p>
                      </div>{" "}
                      <div className={styles.subjectBg}>
                        {item?.category?.title}
                      </div>
                    </div>
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
            </section>

            <Pagination
              current={currentPage}
              total={getAllDirectoryQuery?.data?.data?.total} // Total number of items
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
    </div>
  );
};

export default Directory;
