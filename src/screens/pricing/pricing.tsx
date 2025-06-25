
import { Modal } from "antd";
import Button from "../../customs/button/button";
import PricingOptions from "./priceModal/pricemodal";
import styles from "./styles.module.scss";
import { CheckCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getAllSubscription } from "../request";
import { AxiosError } from "axios";
import CustomSpin from "../../customs/spin";
import Gold from "../../assets/gold.svg";
import Free from "../../assets/Frame 1618872852.svg";
import Platinum from "../../assets/platinum.svg";

const PricingPlansPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [getAllSubQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-sub"],
        queryFn: getAllSubscription,
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const subData = getAllSubQuery?.data?.data?.data || [];
  const subError = getAllSubQuery?.error as AxiosError;
  const subErrorMessage =
    subError?.message || "An error occurred. Please try again later.";

  const getPlanImage = (name: string) => {
    const planName = name.toLowerCase();
    if (planName === "gold") return Gold;
    if (planName === "free") return Free;
    return Platinum;
  };

  return (
    <>
      <main className="wrapper">
        <div className={styles.pricingPage}>
          <div className={styles.para}>
            <h2 className={styles.title}>
              Choose a plan that fits your business needs
            </h2>
            <p className={styles.subtitle}>
              Find the right plan for you. Our flexible plans offer the features
              and support you need to get your business growing
            </p>
          </div>

          {getAllSubQuery?.isLoading ? (
            <CustomSpin />
          ) : getAllSubQuery?.isError ? (
            <h1 className="error">{subErrorMessage}</h1>
          ) : (
            <div className={styles.plansContainer}>
              {[...subData]
              .sort((a, b) => {
                 const order = { free: 0, platinum: 1, gold: 2 };

                return (
                  order[a?.name?.toLowerCase() as 'free' | 'platinum' | 'gold'] -
                  order[b?.name?.toLowerCase() as 'free' | 'platinum' | 'gold']
                );
              })
                // .sort((a, b) => {
                //   const order = { free: 0, platinum: 1, gold: 2 };
                //   return (
                //     order[a?.name?.toLowerCase()] -
                //     order[b?.name?.toLowerCase()]
                //   );
                // })
                .map((plan: any, index: number) => (
                  <div
                    className={`${styles.planCard} ${
                      plan.name?.toLowerCase() === "platinum"
                        ? styles.platinumPlan
                        : ""
                    }`}
                    key={index}
                  >
                    <div className={styles.planHeader}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={getPlanImage(plan.name)}
                          alt={`${plan.name} plan`}
                          className={styles.planImage}
                        />
                        <h3 className={styles.planTitle}>
                          {plan.name?.charAt(0).toUpperCase() +
                            plan.name?.slice(1)}{" "}
                          Plan{" "}
                        </h3>
                      </div>

                      <p className={styles.planPrice}>
                        From{" "}
                        {Math.min(
                          ...(plan?.pricings?.map((item: any) => item.price) ||
                            [])
                        )}
                      </p>

                      <Button
                        variant="green"
                        type="submit"
                        text={"Choose Plan"}
                        className={styles.chooseButton}
                        onClick={() => {
                          setSelectedPlan(plan?.id);
                          setOpenModal(true);
                        }}
                      />
                    </div>

                    <div className={styles.planBody}>
                      <h4 className={styles.featureTitle}>What's included</h4>
                      <ul className={styles.featureList}>
                        {plan?.features?.map((feature:any, idx:number) => (
                          <li key={idx} className={styles.featureItem}>
                            <CheckCircleFilled className={styles.icon} />{" "}
                            {feature?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        centered
        footer={null}
      >
        <PricingOptions
          selectedPlan={selectedPlan}
          handleClose={() => setOpenModal(false)}
        />
      </Modal>
    </>
  );
};

export default PricingPlansPage;
