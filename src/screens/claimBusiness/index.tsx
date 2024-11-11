import Button from "../../customs/button/button";
import Card from "../../customs/card/card";
import styles from "./index.module.scss";
import whatsapp from "../../assets/whatsapp.svg";
import Shoe from "../../assets/shoeIcon.svg";
import star from "../../assets/start.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const ClaimedBusiness = () => {
  const navigate = useNavigate();

  const handleNavigateToSuccess = () => {
    navigate(routes.page.SubmittedSuccessfully);
  };

  return (
    <Card className={styles.headingContainer}>
      <h3>Claim This Business</h3>

      <small>
        To claim this business,you have to verify you re the owner of the
        business.
      </small>

      <section className={styles.container}>
        <div>
          <Card>
            <div className={styles.cardContent}>
              <img src={Shoe} alt="Shoe Icon" className={styles.cardImage} />
              <div className={styles.cardDetails}>
                <h2 className={styles.cardTitle}>Shop with Rinsy</h2>
                <small className={styles.category}>Fashion Accessories</small>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={star}
                      alt="star"
                      className={styles.star}
                    />
                  ))}
                </div>
                <small className={styles.viewers}>No viewers yet</small>

                <h4>100</h4>
                <p>Followers</p>

                <Button
                  type="submit"
                  text="Claim This Business"
                  className={styles.button}
                />
              </div>

              <section className={styles.socialIcons}>
                <img src={whatsapp} alt="" />
                <img src={whatsapp} alt="" />
                <img src={whatsapp} alt="" />
              </section>
            </div>
          </Card>
        </div>

        <hr />

        <div className={styles.secondContainer}>
          <p>
            Upload a document to prove that you're the owner this business{" "}
            <br />
            (CAC, Business letterHead)
          </p>

          <div className={styles.textArea}>
            <p>Additional Message</p>

            <textarea
              placeholder="write a message"
              className={styles.messageBox}></textarea>
          </div>

          <Button
            text="Submit Form"
            type="submit"
            onClick={handleNavigateToSuccess}
          />
        </div>
      </section>
    </Card>
  );
};

export default ClaimedBusiness;
