import { Form, Formik, FormikValues } from "formik";
import styles from "./index.module.scss";
import Input from "../../customs/input/input";
import Button from "../../customs/button/button";
import Card from "../../customs/card/card";
import LoginIcon from "../../assets/Featured icon.svg";
import BlinkersLogo from "../../assets/Frame 1618868702.svg"; // Actual image import
import * as Yup from "yup";
import { App, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useMutation } from "@tanstack/react-query";
import { LoginApiCall } from "./request";
import { userAtom,  } from "../../utils/store";
import { useAtom } from "jotai";
import { errorMessage } from "../../utils/errorMessage";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const [user, setUser] = useAtom(userAtom);

    /* eslint-enable react-hooks/exhaustive-deps */
    useEffect(() => {
      if (user?.data?.email && user?.data?.email !== '' ) {
        navigate("/jobs");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, user?.data?.email]);
    /* eslint-enable react-hooks/exhaustive-deps */

  const loginMutation = useMutation({
    mutationFn: LoginApiCall,
    mutationKey: ["post-user"],
  });

  const loginHandler = async (data: FormikValues, resetForm: () => void) => {
    const loginUser: LoginPayload = {
      value: data?.email?.trim(),
      password: data?.password?.trim(),
      device_type: "IPHONE",
      device_id: "73737",
    };

    try {
      await loginMutation.mutateAsync(loginUser, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          const allData = data

          const userResponse = {
            ...allData, // Spread all matching properties
            // isManageInterestSaved: data?.data?.isManageInterestSaved || false, // Ensure defaults
            // is_applicant: data?.data?.is_applicant || false,
          };

          // Set the user data
          setUser(userResponse);
          
          resetForm()
          navigate("/jobs");

        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    password: Yup.string()
      .required("Password is required")
      .max(20, "Password must have a maximum length of 20 characters"),
  });

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
            value: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            loginHandler(values, resetForm);
            // resetForm();
          }}
          
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form className="fields">
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="jummy@gmail.com"
                  className={styles.inputText}
                />

                <Input
                  name="password"
                  label="Password"
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

                <Button type="submit" text={loginMutation?.isPending ? "Loading..." : "Log In"} disabled={loginMutation?.isPending} className={styles.button} />

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
