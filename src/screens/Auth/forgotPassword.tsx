import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikValues,
} from "formik";
import styles from "./index.module.scss";
import Input from "../../customs/input/input";
import Button from "../../customs/button/button";
import Card from "../../customs/card/card";
import LoginIcon from "../../assets/Featured icon.svg";
import BlinkersLogo from "../../assets/Frame 1618868702.svg";
import * as Yup from "yup";
import { App, Image, Tabs, TabsProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useMutation } from "@tanstack/react-query";
import { errorMessage } from "../../utils/errorMessage";
import { ForgotPasswordCall } from "./request";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const ForgotPassword = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("1");

  const handleNavigateToVerifyOtp = (email: string) => {
    navigate(`/reset-password-verification-code/${email}`);
  };

  const ForgotPasswordMutation = useMutation({
    mutationFn: ForgotPasswordCall,
    mutationKey: ["forgot-password"],
  });

  const ForgotPasswordHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    try {
      await ForgotPasswordMutation.mutateAsync(values.email || values.phoneNumber, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          const pin = data?.data?.pin_id?.length > 4 ? data?.data?.pin_id : "";
          localStorage.setItem("savedPin", pin);

          handleNavigateToVerifyOtp(values?.email || values?.phoneNumber);
          resetForm();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });

      
    }
  };

  const getValidationSchema = (activeKey: string) => {
    return Yup.object().shape({
      ...(activeKey === "1" && {
        email: Yup.string()
          .required("Email Address is required")
          .email("Invalid email Address"),
      }),
      ...(activeKey === "2" && {
        phoneNumber: Yup.string()
          .required("Phone number is required")
          .matches(/^\d+$/, "Phone number must contain only digits"),
      }),
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Email OTP",
    },
    {
      key: "2",
      label: "Phone Number OTP",
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <section className={styles.container}>
      <div
        onClick={() => {
          navigate("/");
        }}
        className={styles.smallScreen}
      >
        <Image src={BlinkersLogo} alt="Blinkers Logo" preview={false} />
      </div>

      <Card style={styles.card}>
        <Image src={LoginIcon} alt="Login Icon" preview={false} />
        <p className={styles.welcome}>Forgot Password</p>
        <small>Enter the email address associated with your account</small>

        <Formik
          initialValues={{
            email: "",
            countryCode: "",
            phoneNumber: "",
          }}
          onSubmit={(values, { resetForm }) => {
            ForgotPasswordHandler(values, resetForm);
          }}
          validationSchema={getValidationSchema(activeKey)}
        >
          {({ handleSubmit }) => (
            <Form className="fields" onSubmit={handleSubmit}>
              <Tabs
                defaultActiveKey="1"
                onChange={handleTabChange}
                items={items}
              />
              {activeKey === "1" ? (
                <Input
                  name="email"
                  placeholder="jummy@gmail.com"
                  className={styles.inputText}
                />
              ) : (
                <div>
                  <Field name="phoneNumber">
                    {({ field , form }:FieldProps) => (
                      <PhoneInput
                        country={"ng"} // Default country
                        value={field.value} // Directly use Formik field's value
                        onChange={(phoneNumber) =>
                          form.setFieldValue("phoneNumber", phoneNumber)
                        } // Update Formik state
                        inputStyle={{ width: "100%" }}
                        preferredCountries={["ng", "gb", "gh", "cm","lr"]} 
                        onlyCountries={["ng", "gb", "gh", "cm","lr"]} 
                        placeholder="Enter phone numer"

                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>
              )}

              <Button
                disabled={ForgotPasswordMutation?.isPending}
                type="submit"
                text={
                  ForgotPasswordMutation?.isPending ? "loading..." : "Send Code"
                }
                className={styles.button}
              />
              <div className={styles.footer}>
                <p> Remember Password?</p>
                <Link to={routes.auth.login} className={styles.loginLink}>
                  <p> Log in</p>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </section>
  );
};

export default ForgotPassword;

