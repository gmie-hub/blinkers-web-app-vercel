import { useState } from "react";
import styles from "./basicInfo.module.scss";
import { Tabs, TabsProps } from "antd";
import job1 from "../../../../assets/job1.svg";
import Button from "../../../../customs/button/button";
import edit from "../../../../assets/edit-2.svg";
import { getBusinessById } from "../../../request";
import { useQueries } from "@tanstack/react-query";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";
import { AxiosError } from "axios";
import Gallery from "../gallery/gallery";
import BasicInformation from "./basicInfo";
import Reviews from "../review/review";
import CustomSpin from "../../../../customs/spin";
import { routes } from "../../../../routes";
import { useNavigate } from "react-router-dom";
import JobPosted from "../postedJob/postedJob";

interface BasicInformationProps {
  title?: string;
  name?: JSX.Element | string;
  icon?: JSX.Element;
}

export default function Index({}: BasicInformationProps) {
  const [activeKey, setActiveKey] = useState("1");
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  console.log(activeKey)
  const [getBusinessDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-business-details", user?.business?.id],
        queryFn: () => getBusinessById(user?.business?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.business?.id,
      },
    ],
  });

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;
  const businessDetailsError = getBusinessDetailsQuery?.error as AxiosError;
  const businessDetailsErrorMessage =
    businessDetailsError?.message ||
    "An error occurred. Please try again later.";
  console.log(
    businessDetailsData,
    "businessDetailsDatabusinessDetailsDatabusinessDetailsData"
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Basic Information",
      children: <BasicInformation businessDetailsData={businessDetailsData} />,
    },
    {
      key: "2",
      label: "Gallery",
      children: <Gallery businessDetailsData={businessDetailsData} />,
    },
    {
      key: "3",
      label: "Reviews",
      children: <Reviews />,
    },
    {
      key: "4",
      label: "Jobs Posted",
      children: <JobPosted  />,
    },
  ];
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleNavigateToPostJob =()=>{
    navigate(routes.job.postJob)
  }
  const handleNavigateToEditBusiness =()=>{
    navigate(routes.profile.editBusiness)
  }
  return (
    <div className={styles.wrapper}>
      {getBusinessDetailsQuery?.isLoading ? (
        <CustomSpin />
      ) : getBusinessDetailsQuery?.isError ? (
        <h1 className="error">{businessDetailsErrorMessage}</h1>
      ) : (
        <section className={styles.border}>
          <div className={styles.heading}>
            <p>Business Information</p>
            <div>
              <Button
                icon={<img src={edit} alt={edit} />}
                className="buttonStyle"
                text="Edit Information"
                variant="green"
                  onClick={handleNavigateToEditBusiness}
              />
              <Button
                icon={<img src={job1} alt={job1} />}
                className="buttonStyle"
                text="Post a Job"
                variant="white"
                  onClick={handleNavigateToPostJob}
              />
            </div>
          </div>
          <div>
            <Tabs
              className={styles.tabs}
              defaultActiveKey="1"
              onChange={handleTabChange}
              items={items}
            />
          </div>
        </section>
      )}
    </div>
  );
}
