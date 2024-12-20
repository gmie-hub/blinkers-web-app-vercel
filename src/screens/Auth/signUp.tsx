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
import { App, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { errorMessage } from "../../utils/errorMessage";
import { SignUpCall } from "./request";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { CountryData } from "react-phone-input-2"; // Import the CountryData type

const SignUp = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log(countryCode, 'countryCode');
  console.log(phoneNumber, 'num');

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
      country_code: countryCode, // Use the updated country code
      number: values.phoneNumber,
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
          const pin = data?.data?.length > 4 ? data?.data : "";

          localStorage.setItem("savedPinSignUp", pin);

          handleNavigateToVerifyOtp(values?.email);

          resetForm(); // Reset the form on success
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:    errorMessage(error) || "An error occurred",
      });
  //     const errorMessages = Object.values(error?.response?.data?.error)
  // .flat() // Flatten any nested arrays
  // .join(", ");
  //     console.log(errorMessages, 'jumm')
    }
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits"),

    address: Yup.string().required("required"),
    name: Yup.string().required("required"),
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
    password: Yup.string()
      .required("Password is required")
      .max(20, "Password must have a maximum length of 20 characters"),
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
            phoneNumber: "",
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
            console.log(values,)

          }}
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form className="fields">
                <Input name="name" label="Name" className={styles.inputText} />

                <div style={{ marginBlockStart: "2rem" }}>
                  <p className="label">Phone Number</p>

                  <Field
                    name="phoneNumber"
                    render={({  form }: FieldProps) => (
                      <PhoneInput
                        country={"ng"} // Default country
                        value={`${countryCode}${phoneNumber}`} // Concatenate the country code and phone number
                        onChange={(phone: string, country: CountryData) => {
                          const dialCode = country.dialCode; // Extract the dialCode from the country object
                          const number = phone.replace(dialCode, "").trim(); // Remove the dial code from the phone number

                          setCountryCode(dialCode); // Update country code state
                          setPhoneNumber(number); // Update phone number state
                          form.setFieldValue("phoneNumber", number); // Update Formik state
                          form.setFieldValue("country_code", dialCode); // Update Formik country_code field
                        }}
                        inputStyle={{ width: "100%" }}
                        preferredCountries={["ng", "gb", "gh", "cm",'lr']} 
                        onlyCountries={["ng", "gb", "gh", "cm",'lr']} 
                        placeholder="Enter phone numer"
                      />
                    )}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="jummy@gmail.com"
                  className={styles.inputText}
                />

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
                  text={SignUpMutation?.isPending ? "Submitting..." : "Submit"}
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
