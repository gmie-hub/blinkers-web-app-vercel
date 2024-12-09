import { Form, Formik } from 'formik';
import styles from './index.module.scss';
import Input from '../../customs/input/input';
import Button from '../../customs/button/button';
import Card from '../../customs/card/card';
import LoginIcon from "../../assets/Featured icon.svg"; 
import BlinkersLogo from "../../assets/Frame 1618868702.svg"; // Actual image import
import { Image } from "antd";

const ResetPassword = () => {
  return (
    <section className={styles.container}>
      <div className={styles.smallScreen}>
      <Image src={BlinkersLogo} alt={BlinkersLogo} preview={false} />
      </div>

      <Card  style={styles.card}>
        <Image src={LoginIcon} alt={LoginIcon} preview={false} />


        <p className={styles.welcome}>Reset Password</p>
        <small>Kindly create a new password </small>

        <Formik
          initialValues={{
            conformPassword: '',
            password: '',
          }}
          onSubmit={() => {}}
        //   validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form className="fields">
               

                <div className={styles.inputContainer}>
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Input password"
                    type="password"
                    className={styles.inputText}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    name="confirmPassword"
                    label="Conform Password"
                    placeholder="Re-enter password"
                    type="password"
                    className={styles.inputText}
                  />
                </div>

          

                <Button type="submit" text="Reset Password" className={styles.button} />
              </Form>
            );
          }}
        </Formik>
      </Card>
    </section>
  );
};

export default ResetPassword;
