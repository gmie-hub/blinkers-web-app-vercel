import { Modal, Radio } from "antd";
import styles from "./styles.module.scss";
import { useState } from "react";
import Button from "../../../customs/button/button";
import ModalContent from "../../../partials/successModal/modalContent";
import { useQueries } from "@tanstack/react-query";
import { getAllSubscriptionById } from "../../request";
import { AxiosError } from "axios";
import { formatAmount } from "../../../utils/formatTime";
import CustomSpin from "../../../customs/spin";
import PaymentMethod from "./paymentMethod";
interface Props {
  handleClose: () => void;
  selectedPlan: any;
}

const PricingOptions = ({ handleClose, selectedPlan }: Props) => {
  const [selected, setSelected] = useState("3");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
            {planData?.pricings?.map((option) => (
              <div
                key={option.value}
                className={`${styles.optionCard} ${
                  selected === option.value ? styles.active : ""
                }`}
              >
                <Radio value={option.value} className={styles.radio}>
                  <div className={styles.optionText}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "start",
                      }}
                    >
                      <p>
                        {" "}
                        {option?.duration}{" "}
                        {option?.duration === 1 ? "Month" : "Months"}
                      </p>
                      <p className={styles.price}>
                        {formatAmount(option?.price)}
                      </p>
                    </div>
                  </div>
                </Radio>
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
            <Button onClick={()=>{
              setOpenModal(true)}
            } className={"buttonStyle"}>Subscribe Now</Button>
          </div>
        </div>
      )}

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        centered
        footer={null}
      >
        <PaymentMethod
          selectedPlan={selectedPlan}
          handleClose={() => setOpenModal(false)}
        />
      </Modal>

      <ModalContent
        open={openSuccess}
        handleCancel={() => setOpenSuccess(false)}
        handleClick={() => {
          setOpenSuccess(false);
        }}
        text={" You've successfully activated the Free Plan."}
      />
    </>
  );
};

export default PricingOptions;
