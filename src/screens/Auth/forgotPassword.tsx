import { Form, Formik } from 'formik';
import styles from './index.module.scss';
import Input from '../../customs/input/input';
import Button from '../../customs/button/button';
import Card from '../../customs/card/card';
import LoginIcon from "../../assets/Featured icon.svg"; 
import BlinkersLogo from "../../assets/Frame 1618868702.svg"; // Actual image import

import { Image } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../routes';



const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.container}>
      <div className={styles.smallScreen}>
      <Image src={BlinkersLogo} alt={BlinkersLogo} preview={false} />
      </div>

      <Card  style={styles.card}>
        <Image src={LoginIcon} alt={LoginIcon} preview={false} />


        <p className={styles.welcome}>Forgot Password</p>
        <small>Enter the email address associated with your account</small>

        <Formik
          initialValues={{
            email: '',
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

              

        
                <Button onClick={()=>navigate('/verification-code')} type="submit" text="Send Code" className={styles.button} />
                <div className={styles.footer}>
                  <p> Remember Password?</p>

                  <Link to={routes.auth.login} className={styles.loginLink}>
                    <p> Log in</p>
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </section>
  );
};

export default ForgotPassword;
