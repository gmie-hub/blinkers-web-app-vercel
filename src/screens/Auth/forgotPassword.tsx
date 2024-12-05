
import { Form, Formik, FormikValues } from 'formik';
import styles from './index.module.scss';
import Input from '../../customs/input/input';
import Button from '../../customs/button/button';
import Card from '../../customs/card/card';
import LoginIcon from "../../assets/Featured icon.svg"; 
import BlinkersLogo from "../../assets/Frame 1618868702.svg";
import * as Yup from "yup";
import { App, Image } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { useMutation } from '@tanstack/react-query';
import { errorMessage } from '../../utils/errorMessage';
import { ForgotPasswordCall } from './request';

const ForgotPassword = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();


  const handleNavigateToVerifyOtp = (
    (email: string) => {
      navigate(`/reset-password-verification-code/${email}`);
    }
  )

  // Use mutation to call the ForgotPasswordCall
  const ForgotPasswordMutation = useMutation({
    mutationFn: ForgotPasswordCall,
    mutationKey: ["forgot-password"],
  });

  // ForgotPasswordHandler to handle the form submission
  const ForgotPasswordHandler = async (values: FormikValues, resetForm: () => void) => {
    try {
      // Call the mutation function and pass the email value from the form
      await ForgotPasswordMutation.mutateAsync(values.email, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          const pin = data?.data ?.length > 4 ? data?.data : ""
          localStorage.setItem("savedPin", pin);

          handleNavigateToVerifyOtp(values?.email)
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

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid email Address"),
  });

  return (
    <section className={styles.container}>
      <div  onClick={() => {
          navigate("/");
        }} className={styles.smallScreen}>
        <Image src={BlinkersLogo} alt="Blinkers Logo" preview={false} />
      </div>

      <Card style={styles.card}>
        <Image src={LoginIcon} alt="Login Icon" preview={false} />
        <p className={styles.welcome}>Forgot Password</p>
        <small>Enter the email address associated with your account</small>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values, { resetForm }) => {
            // Pass email to the handler when form is submitted
            ForgotPasswordHandler(values, resetForm);
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <Form className="fields" onSubmit={handleSubmit}>
              <Input
                name="email"
                label="Email Address"
                placeholder="jummy@gmail.com"
                className={styles.inputText}
              />
              <Button type="submit" text="Send Code" className={styles.button} />
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
