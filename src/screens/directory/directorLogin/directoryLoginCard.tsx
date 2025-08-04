import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import DirectoryImage from "../../../assets/image 33.svg";
import Button from "../../../customs/button/button";

interface Props {
  handleCloseModal: () => void;
}

const BusinessDirectoryWelcome = ({handleCloseModal}:Props) => {
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className={styles.container}>
      
      <img src={DirectoryImage} alt="DirectoryImage" />

      <h2 className={styles.title}>Welcome To Blinkers Business Directory</h2>
      <p className={styles.subtitle}>
        Discover businesses, claim your business, or add a new business to the
        directory.
      </p>

      <div className={styles.noticeBox}>
        <span className={styles.warningIcon}>⚠️</span>

        <p>
          After logging in, you can access the directory portal from this
          directory page from the Top navigation bar.
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

export default BusinessDirectoryWelcome;
