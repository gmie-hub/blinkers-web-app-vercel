import { Field, Form, Formik } from "formik";
import styles from "./index.module.scss";
import Card from "../../customs/card/card";
import LoginIcon from "../../assets/Featured icon.svg";
import BlinkersLogo from "../../assets/Frame 1618868702.svg";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import Button from "../../customs/button/button";

interface FormValues {
  code: string[];
}

const VerificationCode = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(85); // 1:25 in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false); // Enable the "Resend Code" button
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleResendClick = () => {
    if (!isResendDisabled) {
      setTimeLeft(85); // Reset timer to 1:25
      setIsResendDisabled(true); // Disable the button again
    }
  };

  const initialValues: FormValues = {
    code: ["", "", "", "", "", ""], // 6 fields for example
  };

  useEffect(() => {
    // Set focus to the first input field when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { value } = e.target;

    // Allow only numbers
    if (/^[0-9]$/.test(value)) {
      setFieldValue(`code[${index}]`, value);

      // Move focus to the next field
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Clear the field if backspace was used
      setFieldValue(`code[${index}]`, "");
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (e.key === "Backspace" && inputRefs.current[index]) {
      const currentValue = inputRefs.current[index]?.value;

      // If the current field is empty, move focus to the previous field
      if (currentValue === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFieldValue(`code[${index - 1}]`, "");
      }
    }
  };
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const pasteData = e.clipboardData.getData("Text");

    // Prevent the default paste action
    e.preventDefault();

    // Only keep numeric values and ignore others
    const sanitizedData = pasteData.replace(/\D/g, "");

    // Limit the number of characters to fill from the current index
    const maxPasteLength = inputRefs.current.length - index;
    const pasteValues = sanitizedData.slice(0, maxPasteLength);

    // Loop through the pasteValues and set each field starting from the current index
    pasteValues.split("").forEach((char, i) => {
      setFieldValue(`code[${index + i}]`, char);
      if (inputRefs.current[index + i]) {
        inputRefs.current[index + i]!.value = char; // Directly update input value
      }
    });

    // Move focus to the last filled input field or the next available field
    if (index + pasteValues.length < inputRefs.current.length) {
      inputRefs.current[index + pasteValues.length]?.focus();
    } else {
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.smallScreen}>
        <Image src={BlinkersLogo} alt={BlinkersLogo} preview={false} />
      </div>

      <Card style={styles.card}>
        <Image src={LoginIcon} alt={LoginIcon} preview={false} />

        <p className={styles.welcome}>Verification Code</p>
        <small>
          We sent an OTP code to the email address associated with your account.
          Enter the OTP code to be able to reset your password.
        </small>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // Handle form submission
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div
                style={
                  {
                    //   display: "flex",
                    //   gap: "4px",
                    //   justifyContent: "center",
                  }
                }
              >
                {initialValues.code.map((_, index) => (
                  <Field
                    key={index}
                    name={`code[${index}]`}
                    innerRef={(el: HTMLInputElement) =>
                      (inputRefs.current[index] = el)
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, index, setFieldValue)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(e, index, setFieldValue)
                    }
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) =>
                      handlePaste(e, index, setFieldValue)
                    }
                    maxLength={1}
                    className={styles.verifyInput}
                    placeholder="0" /* Add placeholder */
                    style={{
                      //   width: "60px",
                      textAlign: "center",
                    }} /* Make consistent with updated CSS */
                    autoComplete="off"
                  />
                ))}
              </div>

              <Button  type="submit" text="Verify" className={styles.button} />

              <div className={styles.footer}>
                <p>
                  Didn’t get the code? Can resend in{" "}
                  <span style={{ color: "red" }}>{formatTime(timeLeft)}</span>{" "}
                  mins
                </p>
               
              </div>
              <p
                  className={`${styles.resend} ${
                    isResendDisabled ? styles.disabled : ""
                  }`}
                  onClick={handleResendClick}
                  style={{
                    cursor: isResendDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  Resend Code
                </p>
            </Form>
          )}
        </Formik>
      </Card>
    </section>
  );
};

export default VerificationCode;
