import { Radio } from "antd";
import styles from "./styles.module.scss";
import { useState } from "react";
import Button from "../../../customs/button/button";
import { useQueries } from "@tanstack/react-query";
import {  getAllSubscriptionById } from "../../request";
import { AxiosError } from "axios";
import CustomSpin from "../../../customs/spin";
import ArrowIcon from "../../../assets/arrow-right-noty.svg";

interface Props {
  handleClose: () => void;
  selectedPlan: any;
}

const PaymentMethod = ({ handleClose, selectedPlan }: Props) => {
  const [selected, setSelected] = useState("3");

  const options = [{ label: "Paystack" }, { label: "Flutterwave" }];

  const [getSubQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-sub-by-id", selectedPlan],
        queryFn: () => getAllSubscriptionById(selectedPlan),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!selectedPlan,
      },
    ],
  });

  const planData = getSubQuery?.data?.data;
  const planError = getSubQuery?.error as AxiosError;
  const planErrorMessage =
    planError?.message || "An error occurred. Please try again later.";

  return (
    <>
      {getSubQuery?.isLoading ? (
        <CustomSpin />
      ) : getSubQuery?.isError ? (
        <h1 className="error">{planErrorMessage}</h1>
      ) : (
        <div className={styles.pricingModal}>
          <h3>Select Pricing For {planData?.name} Plan</h3>
          <p className={styles.subtitle}>
            Select the pricing you would like to subscribe to
          </p>

        

          <Radio.Group
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
            className={styles.radioGroup}
          >
            {options?.map((option) => (
              <div
                key={option?.label}
                className={`${styles.optionCard} ${
                  selected === option.label ? styles.active : ""
                }`}
              >
                <Radio value={option.label} className={styles.radio}>
                  <div className={styles.optionText}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <p>{option?.label}</p>
                      </div>
                    </div>
                  </div>
                </Radio>
                <img src={ArrowIcon} alt="ArrowIcon" />



              </div>
            ))}
          </Radio.Group>

          <div className={styles.footerButtons}>
            <Button
              variant="greenOutline"
              onClick={handleClose}
              className={"buttonStyle"}
            >
              Cancel
            </Button>
            <Button className={"buttonStyle"}>Proceed</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethod;
