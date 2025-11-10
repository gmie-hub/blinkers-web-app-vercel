import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import BlinkersLogo from "../../../../assets/Logo.svg";
import Button from "../../../../customs/button/button";

interface Props {
  handleCloseModal: () => void;
}

const GeneralWelcome = ({handleCloseModal}:Props) => {
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className={styles.container}>
      
      <img width={'30%'} src={BlinkersLogo} alt="BlinkersLogo" />

      <h2 className={styles.title}>Welcome To Blinker</h2>
      <p className={styles.subtitle}>
      Explore the marketplace, job opportunities, discover businesses, and connect with the right people all in one place
      </p>

      <div className={styles.noticeBox}>
        <span className={styles.warningIcon}>⚠️</span>

        <p>
        After logging in, you can access our main features from the Top navigation bar.
        </p>
      </div>

      <Button
        onClick={() => {
          navigate(`/login?redirect=${currentPath}`);
        }}
        type="button"
      >
        {" "}
        Login
      </Button>
      <br />
      <br />

      <Button
      variant="greenOutline"
        onClick={() => navigate("/sign-up")}
      >
        Sign Up
      </Button>
    

      <p className={styles.guestLink} onClick={handleCloseModal}>
        Continue As A Guest
      </p>
    </div>
  );
};

export default GeneralWelcome;
