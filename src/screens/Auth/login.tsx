import { Form, Formik } from 'formik';
import styles from './index.module.scss';
import Input from '../../customs/input/input';
import Button from '../../customs/button/button';
import Card from '../../customs/card/card';
import LoginIcon from "../../assets/Featured icon.svg"; 
import BlinkersLogo from "../../assets/Frame 1618868702.svg"; // Actual image import

import { Image } from "antd";
import { Link } from 'react-router-dom';
import { routes } from '../../routes';



const Login = () => {
  return (
    <section className={styles.container}>
      <div className={styles.smallScreen}>
      <Image src={BlinkersLogo} alt={BlinkersLogo} preview={false} />
      </div>

      <Card  style={styles.card}>
        <Image src={LoginIcon} alt={LoginIcon} preview={false} />


        <p className={styles.welcome}>Welcome Back!</p>
        <small>Enter your details to log in as an admin</small>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={() => {}}
        //   validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form className="fields">
                <div className={styles.inputContainer}>
                  <Input name="email" label="Email Address" placeholder="jummy@gmail.com" className={styles.inputText} />
                </div>

                <div className={styles.inputContainer}>
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Input password"
                    type="password"
                    className={styles.inputText}
                  />
                </div>

                <div className={styles.forgotPassword}>
                  <Link to={routes.auth.forgotPassword}>
                    <p> Forgot Password?</p>
                  </Link>
                </div>

                <Button type="submit" text="Log In" className={styles.button} />
              </Form>
            );
          }}
        </Formik>
      </Card>
    </section>
  );
};

export default Login;
