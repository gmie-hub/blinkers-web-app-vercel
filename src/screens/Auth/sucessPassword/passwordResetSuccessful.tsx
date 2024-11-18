import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes';
import { Image } from "antd";
import DoneIcon from "../../../assets/Done.svg";
import Button from '../../../customs/button/button';
import Card from '../../../customs/card/card';

const PasswordResetSuccessful = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(routes.auth.login);
  };

  return (
    <section className={styles.container}>
      <Card style={styles.card}>
        <Image  className={styles.iconContainer} src={DoneIcon} alt={DoneIcon} preview={false} />

        <div className={styles.successfulText}>
          <p>Password Reset Successfully</p>
          <p>You have successfully reset your password.You can now log in with,</p>
          <p> your new password</p>
        </div>

        <Button type="submit" text="Log In" onClick={handleNavigate} />
      </Card>
    </section>
  );
};

export default PasswordResetSuccessful;
