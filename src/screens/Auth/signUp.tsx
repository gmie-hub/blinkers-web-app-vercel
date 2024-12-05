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
import { useMutation } from "@tanstack/react-query";
import { errorMessage } from "../../utils/errorMessage";
import { SignUpCall } from "./request";

const SignUp = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const SignUpMutation = useMutation({
    mutationFn: SignUpCall,
    mutationKey: ["sign-up"],
  });

  const handleNavigateToVerifyOtp = (email: string) => {
    navigate(`/verification-code/${email}`);
  };

  const SignUpHandler = async (values: FormikValues, resetForm: any) => {
    const payload: Partial<signUp> = {
      name: values?.name,
      country_code: "+234",
      number: values.number,
      address: values.address,
      address_lat: values.address,
      address_long: values?.address,
      email: values?.email,
      password: values?.password,
      confirm_password: values.confirm_password,
    };

    try {
      await SignUpMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          handleNavigateToVerifyOtp(values?.email);

          resetForm(); // Reset the form on success
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
    number: Yup.string().required("required"),
    address: Yup.string().required("required"),
    name: Yup.string().required("required"),
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    password: Yup.string()
      .required("Password is required")
      .max(20, "Password must have a maximum length of 20 characters"),
    // .matches(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/,
    //   "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
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

        <p className={styles.welcome}>Sign Up</p>
        <small></small>

        <Formik
          initialValues={{
            name: "",
            country_code: "",
            number: "",
            address: "",
            address_lat: "",
            address_long: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            SignUpHandler(values, resetForm);
            // resetForm();
          }}
          // enableReinitialize={true}
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form className="fields">
                {/* <div className={styles.inputContainer}> */}
                <Input name="name" label="Name" className={styles.inputText} />
                {/* </div> */}

                <Input
                  name="number"
                  label="Phone Number"
                  placeholder="Phone Number"
                  className={styles.inputText}
                />

                {/* <div className={styles.inputContainer}> */}
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="jummy@gmail.com"
                  className={styles.inputText}
                />
                {/* </div> */}

                <Input
                  name="address"
                  label="Address"
                  placeholder="Address"
                  className={styles.inputText}
                />

                <Input
                  name="password"
                  label="Password"
                  placeholder="Input password"
                  type="password"
                  className={styles.inputText}
                />
                <Input
                  name="confirm_password"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  type="password"
                  className={styles.inputText}
                />

                <Button
                  disabled={SignUpMutation?.isPending}
                  text={SignUpMutation?.isPending ? "Submittig..." : "Submit"}
                  type="submit"
                  className={styles.button}
                />

                <span style={{ display: "flex" }}>
                  Already have an account?
                  <Link to="/login" className={styles.signUpLink}>
                    Sign In
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

export default SignUp;
