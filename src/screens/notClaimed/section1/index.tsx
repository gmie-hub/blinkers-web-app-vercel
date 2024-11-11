import { Card } from "antd";
import styles from "./index.module.scss";
import Shoe from "../../../assets/shoeIcon.svg";
import star from "../../../assets/start.svg";
import whatsapp from "../../../assets/whatsapp.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import Button from "../../../customs/button/button";
import Facebook from "../../../assets/facebook.svg";
import Twitter from "../../../assets/twitter.svg";
import Call from "../../../assets/call.svg";

const AboutShopWithRinsy = () => {
  const navigate = useNavigate();

  const handleNavigateToClaim = () => {
    navigate(routes.page.Subscription);
  };

  return (
    <section className={styles.mainContent}>
      {/* Left Side - Main Business Card */}
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <img src={Shoe} alt="Shoe Icon" className={styles.cardImage} />
          <div className={styles.cardDetails}>
            <h2 className={styles.cardTitle}>Shop with Rinsy</h2>
            <small className={styles.category}>Fashion Accessories</small>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={star} alt="star" className={styles.star} />
              ))}
            </div>
            <small className={styles.viewers}>No viewers yet</small>

            <h4>100</h4>
            <p>Followers</p>

            {/* <div className={styles.followers}>
              <div>
                <span></span>
                <span>write a short review</span>
              </div>

              <div>
                <span></span>
                <span>share</span>
              </div>

              <div>
                <span></span>
                <span>Follow</span>
              </div>
            </div> */}

            <hr />

            <div className={styles.address}>
              <small>opening hours</small>

              <div>
                <span>
                  {" "}
                  <img src={Call} alt="" />
                </span>
                <span>Monday-Friday (10am - 11pm)</span>
              </div>

              <div>
                <span>
                  {" "}
                  <img src={Call} alt="" />
                </span>
                <span>4 Blinkers street, Lekki Nigeria</span>
              </div>

              <div>
                <span>
                  <img src={Call} alt="" />
                </span>
                <span>09012345678</span>
              </div>
            </div>

            <Button
              onClick={handleNavigateToClaim}
              type="submit"
              text="Claim This Business"
              className={styles.button}
            />
          </div>

          <section className={styles.socialIcons}>
            <img src={whatsapp} alt="" />
            <img src={Facebook} alt="" />
            <img src={Twitter} alt="" />
          </section>
        </div>
      </Card>

      {/* Right Side - Business Details */}
      <section className={styles.businessDetails}>
        <h2>About Shop With Rinsy</h2>
        <p className={styles.description}>
          Shop with Rinsy encapsulates the meaning of beauty and elegance.
          Whilst delivering both in the midst of luxury and elegance, the
          peninsula’s ultimate getaway destination is also the ultimate place to
          host your next event.
        </p>
        <hr />
        <div className={styles.section}>
          <h2>Photos</h2>
          <small>No photos available yet</small>
        </div>
        <hr />
        <div className={styles.section}>
          <h2>Videos</h2>
          <small>No videos available yet</small>
        </div>
        <hr />
        <div className={styles.section}>
          <h2>Reviews</h2>
          <small>No reviews available yet</small>
        </div>
      </section>
    </section>
  );
};

export default AboutShopWithRinsy;
