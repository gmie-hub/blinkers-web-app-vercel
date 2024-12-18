import Card from "../card/card";
import success from "../../assets/success.svg";
import Button from "../button/button";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const SubmittedSuccessfully = () => {
  const navigate = useNavigate();
  return (
    <Card style={styles.headerContainer}>
      <img src={success} alt="success" />

      <h3>Details Submitted Successfully</h3>

      <p>
        We’ve received your details and once we verify it, you will be able to{" "}
        <br />
        edit your business details in your profile. We will contact you via
        email.
      </p>

      <Button
        text="okay"
        className={styles.button}
        onClick={() => navigate(routes.page.home)}
      />
    </Card>
  );
};

export default SubmittedSuccessfully;
