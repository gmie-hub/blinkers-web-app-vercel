import { Radio } from "antd";
import styles from "./styles.module.scss";
import { useState } from "react";
import Button from "../../../customs/button/button";
import { useQueries } from "@tanstack/react-query";
import { getAllSubscriptionById } from "../../request";
import { AxiosError } from "axios";
import CustomSpin from "../../../customs/spin";
import ArrowIcon from "../../../assets/arrow-right-noty.svg";
import { PaystackButton } from "react-paystack";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../utils/store";
import btnStyles from "../../../customs/button/button.module.scss";

interface Props {
  handleClose: () => void;
  selectedPlan: any;
  price: number;
  handlePaymentSuccess: () => void;
}

const PAYSTACK = "Paystack";
const FLUTTERWAVE = "Flutterwave";

const PaymentMethod = ({
  handleClose,
  handlePaymentSuccess,
  selectedPlan,
  price,
}: Props) => {
  const [selected, setSelected] = useState(PAYSTACK);

  const userInfo = useAtomValue(userAtom);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const amount = price * 100;
  const email = userInfo?.email ?? "";

  const componentProps = {
    email,
    amount,
    publicKey,
    text: "Proceed",
    onSuccess: () => {
      handlePaymentSuccess();
      handleClose();
    },
    onClose: () => {},
  };

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: userInfo?.number || "",
      name: userInfo?.name || "",
    },
    customizations: {
      title: "Payment for Subscription",
      description: "Payment for Subscription",
      logo: "",
    },
  };

  const fwConfig = {
    ...config,
    text: "Proceed",
    callback: (response: any) => {
      console.log(response);
      closePaymentModal();
      handlePaymentSuccess();
      handleClose();
    },
    onClose: () => {},
  };

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
          <h3>Select Payment Method</h3>

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
            {/* <Button className={"buttonStyle"}>Proceed</Button> */}

            {selected === PAYSTACK && (
              <PaystackButton className={btnStyles.green} {...componentProps} />
            )}

            {selected === FLUTTERWAVE && (
              <FlutterWaveButton className={btnStyles.green} {...fwConfig} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethod;
