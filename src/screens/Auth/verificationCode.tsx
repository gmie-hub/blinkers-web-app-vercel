import { Field, Form, Formik } from "formik";
import styles from "./index.module.scss";
import Card from "../../customs/card/card";
import LoginIcon from "../../assets/Featured icon.svg";
import BlinkersLogo from "../../assets/Frame 1618868702.svg";
import { App, Image } from "antd";
import { useEffect, useRef, useState } from "react";
import Button from "../../customs/button/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userVerifyOtp, ResendOptCall } from "./request";
import { errorMessage } from "../../utils/errorMessage";
import { useParams } from "react-router-dom";
import BackIcon from "../../assets/back.svg";

interface FormValues {
  code: string[];
}

const VerificationCode = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(5); // 1:25 in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { email } = useParams<{ email: string }>(); // Define the type of id
  const [route, setRoute] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false); // Enable the "Resend Code" button when timer reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

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

  // const   handleResendClick = () => {
  //   if (!isResendDisabled) {
  //     setTimeLeft(85); // Reset timer to 1:25
  //     setIsResendDisabled(true); // Disable the button again
  //   }
  //   resendOtpHandler();

  // };

  const handleResendClick = (route: string) => {
    setRoute(route)
    if (!isResendDisabled) {
      setTimeLeft(5); // Reset timer to 1:25
      setIsResendDisabled(true); // Disable the button again

      // Start counting down again from 85 seconds
      setTimeout(() => {
        const timer = setInterval(() => {
          setTimeLeft((prevTime: number) => {
            if (prevTime <= 1) {
              clearInterval(timer); // Stop the countdown when it reaches 0
              setIsResendDisabled(false); // Enable the "Resend Code" button when timer reaches 0
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000); // Update every second
  
        // Cleanup the interval when the component is unmounted
        return () => clearInterval(timer);
      }, 0);
    }

  };

  useEffect(() => {
    if (route) {
      resendOtpHandler();
    }
  }, [route]);
  

  const initialValues: FormValues = {
    code: ["", "", "", ""], // 4 fields instead of 6
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

  const resendOptMutation = useMutation({
    mutationFn: ResendOptCall,
    mutationKey: ["verify-otp"],
  });

  const resendOtpHandler = async () => {
    const payload: resendOtp = {
      type: "Email",
      value: email!,
      from_page: "Signup",
      route: route

    };

    try {
      await resendOptMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: "An error occurred",
      });
    }

  };


  const verifyOptMutation = useMutation({
    mutationFn: userVerifyOtp,
    mutationKey: ["verify-otp"],
  });

  const verifyOtpHandler = async (values: FormValues) => {
    const payload: UserVerifyOtp = {
      otp: parseInt(values.code.join("")), // Join the OTP code array to form the full OTP
    };
    if(values?.code.join('')?.length !==4 ) return;

    try {
      await verifyOptMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          navigate('/login')
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };


  return (
    <section className={styles.container}>
      <div  onClick={() => {
          navigate("/");
        }} className={styles.smallScreen}>
        <Image src={BlinkersLogo} alt={BlinkersLogo} preview={false} />
      </div>

      <Card style={styles.card}>
        <Image src={LoginIcon} alt={LoginIcon} preview={false} />

        <p className={styles.welcome}>Verification Code</p>
        <small>
          We sent an OTP code to the email address associated with your account.
          Enter the OTP code to be able to verify your account.
        </small>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            verifyOtpHandler(values);
            console.log("Submitted values:", values);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div
                style={
                  {
                      display: "flex",
                      gap: "4px",
                      justifyContent: "center",
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

              <Button disabled={verifyOptMutation?.isPending} type="submit" text={verifyOptMutation?.isPending ? "loading" :  "Verify"} className={styles.button} />

              <div className={styles.footer}>
                <p>
                  Didn’t get the code? Can resend in{" "}
                  <span style={{ color: "red" }}>{formatTime(timeLeft)}</span>{" "}
                  mins
                </p>
              </div>

              <Button
                variant="transparent"
                onClick={() => handleResendClick("Sms")}
                disabled={resendOptMutation?.isPending || timeLeft > 0}
                type="submit"
                text={
                  route === "Sms" && resendOptMutation?.isPending
                    ? "loading..."
                    : "Resend Code via sms"
                }
                className={styles.buttonOtp}
              />

              <Button
                variant="transparent"
                onClick={() => handleResendClick("Whatsapp")}
                disabled={resendOptMutation?.isPending || timeLeft > 0}
                type="submit"
                className={styles.buttonOtp}
                text={
                  route === "Whatsapp" && resendOptMutation?.isPending
                    ? "loading..."
                    : "Resend Code via Whatsapp"
                }
              />



             
              <div onClick={()=>navigate(-1)} style={{display:'flex', paddingBlockStart:'3rem', gap:'1rem', cursor:'pointer'}}>
              <Image src={BackIcon} alt={BackIcon} preview={false} />


                <p>Back to Register</p>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </section>
  );
};

export default VerificationCode;
