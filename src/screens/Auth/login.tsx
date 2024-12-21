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
import BlinkersLogo from "../../assets/Frame 1618868702.svg"; // Actual image import
import * as Yup from "yup";
import { App, Image, Tabs, TabsProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useMutation } from "@tanstack/react-query";
import { LoginApiCall } from "./request";
import { userAtom } from "../../utils/store";
import { useAtom } from "jotai";
import { errorMessage } from "../../utils/errorMessage";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const Login = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const [user, setUser] = useAtom(userAtom);
  const [activeKey, setActiveKey] = useState("1");

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
  });
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect");

  const handleNavigateToVerifyOtp = (email: string) => {
    navigate(`/verification-code/${email}`);
  };

  /* eslint-enable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (user?.email && user?.email !== "") {
      navigate("/jobs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.email]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const loginMutation = useMutation({
    mutationFn: LoginApiCall,
    mutationKey: ["post-user"],
  });

  const loginHandler = async (data: FormikValues) => {
    const loginUser: LoginPayload = {
      value: data?.email?.trim() || data?.phoneNumber,
      password: data?.password?.trim(),
      device_type: "IPHONE",
      device_id: "73737",
    };

    try {
      await loginMutation.mutateAsync(loginUser, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: "User logged in successfully",
          });
          const pin = data?.data?.pin_id?.length > 4 ? data?.data?.pin_id : "";
          localStorage.setItem("savedPinSignUp", pin);
          console.log(pin, 'kik')

          const userResponse = {
            ...data, // Spread all matching properties
            // isManageInterestSaved: data?.data?.isManageInterestSaved || false, // Ensure defaults
            // is_applicant: data?.data?.is_applicant || false,
          };

          // Set the user data
          setUser(userResponse?.data);

          // resetForm();
          if (data?.message === "OTP sent, please verify your account.") {
            handleNavigateToVerifyOtp(formData?.email || formData?.phoneNumber);
          }
           else navigate(redirectPath ? redirectPath : "/");
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
      password: Yup.string().required("Password is required"),
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Email Login",
    },
    {
      key: "2",
      label: "Phone Number Login",
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
        <Image src={BlinkersLogo} alt={BlinkersLogo} preview={false} />
      </div>

      <Card style={styles.card}>
        <Image src={LoginIcon} alt={LoginIcon} preview={false} />

        <p className={styles.welcome}>Welcome Back!</p>
        <small>Enter your details to log in as an admin</small>

        <Formik
          initialValues={{
            email: "",
            password: "",
            countryCode: "",
            phoneNumber: "",
          }}
          onSubmit={(values) => {
            loginHandler(values);
            // setFormData({
            //   email: values?.email,
            //   phoneNumber: values?.phoneNumber,
            // });
            console.log(formData?.email, "formData");
          }}
          validationSchema={getValidationSchema(activeKey)}
        >
          {({ values }) => {
            useEffect(() => {
              setFormData({
                ...formData,
                email: values.email,
                phoneNumber: values.phoneNumber,
              });
            }, [values.email, values.phoneNumber]);

            return (
              <Form className="fields">
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
                      {({ field, form }: FieldProps) => (
                        <PhoneInput
                          country={"ng"} // Default country
                          value={field.value} // Directly use Formik field's value
                          onChange={(phoneNumber) =>
                            form.setFieldValue("phoneNumber", phoneNumber)
                          } // Update Formik state
                          inputStyle={{ width: "100%" }}
                          preferredCountries={["ng", "gb", "gh", "cm",'lr']} 
                          onlyCountries={["ng", "gb", "gh", "cm",'lr']} 
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

                <Input
                  name="password"
                  placeholder="Input password"
                  type="password"
                  className={styles.inputText}
                />

                <div>
                  <Link
                    className={styles.forgotPassword}
                    to={routes.auth.forgotPassword}
                  >
                    <p> Forgot Password?</p>
                  </Link>
                </div>

                <Button
                  type="submit"
                  text={loginMutation?.isPending ? "Loading..." : "Log In"}
                  disabled={loginMutation?.isPending}
                  className={styles.button}
                />

                <span style={{ display: "flex" }}>
                  Don’t have an account?
                  <Link to="/sign-up" className={styles.signUpLink}>
                    Sign Up
                  </Link>
                </span>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </section>
  );
};

export default Login;
