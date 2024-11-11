import Card from "../../customs/card/card";
import styles from "./index.module.scss";
import Folder from "../../assets/file.svg";
import Button from "../../customs/button/button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import Arrow from "../../assets/arrow-left.svg";

const SubscriptionPricing = () => {
  const navigate = useNavigate();

  const handleNavigateToSubscriptionPricing = () => {
    navigate(routes.page.ClaimedBusiness);
  };

  return (
    <section>
      <div
        className={styles.arrow}
        onClick={() => {
          navigate(routes.page.NotClaimed);
        }}>
        <span>
          <img src={Arrow} alt="" />
        </span>
        <span>Back</span>
      </div>

      <Card className={styles.cardDesign}>
        <div className={styles.header}>Plantium Plan</div>

        <div className={styles.folderImage}>
          <img src={Folder} alt="" />

          <p>NGN 100,000/year</p>
        </div>

        <hr />

        <section className={styles.listingSection}>
          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>Permit business name</span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>Permit business name</span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>Permit business name</span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>
              10 product advert with 5 images each
            </span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>
              10 product advert with 5 images each
            </span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>
              10 product advert with 5 images each
            </span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>
              10 product advert with 5 images each
            </span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>Permit business name</span>
          </div>

          <div className={styles.featureItem}>
            <span className={styles.icon}>✔️</span>
            <span className={styles.text}>
              10 product advert with 5 images each
            </span>
          </div>
        </section>

        <Button
          text="Subscribe Now"
          className={styles.button}
          onClick={handleNavigateToSubscriptionPricing}
        />
      </Card>
    </section>
  );
};

export default SubscriptionPricing;
