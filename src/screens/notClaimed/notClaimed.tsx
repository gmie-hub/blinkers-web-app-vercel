import Card from "../../customs/card/card";
import styles from "./index.module.scss";
import Shoe from "../../assets/shoeIcon.svg";
import star from "../../assets/start.svg";
import Rinsy from "../../assets/rinskyImage.svg";
import { Card as AntdCard } from "antd";
import Benz from "../../assets/ben.svg";
import Burger from "../../assets/burger.svg";
import Button from "../../customs/button/button";
import whatsapp from "../../assets/whatsapp.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const NotClaimed = () => {
  const navigate = useNavigate();

  const handleNavigateToClaim = () => {
    navigate(routes.page.Subscription);
  };
  return (
    <section className={styles.container}>
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

              <Button
                onClick={handleNavigateToClaim}
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

        {/* Right Side - Business Details */}
        <section className={styles.businessDetails}>
          <h2>About Shop With Rinsy</h2>
          <p className={styles.description}>
            Shop with Rinsy encapsulates the meaning of beauty and elegance.
            Whilst delivering both in the midst of luxury and elegance, the
            peninsula’s ultimate getaway destination is also the ultimate place
            to host your next event.
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

      <h3 className={styles.relatedTitle}>Related Businesses</h3>
      {/* Related Businesses */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedCards}>
          {cardData.map((card) => (
            <AntdCard
              key={card.id}
              className={styles.relatedCard}
              cover={
                card.icon ? (
                  <img
                    src={card.icon}
                    alt="Business Icon"
                    className={styles.relatedCardImage}
                  />
                ) : (
                  <img
                    src={Rinsy}
                    alt="Default Icon"
                    className={styles.relatedCardImage}
                  />
                )
              }
              style={{ width: 250 }}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardAddress}>{card.address}</p>
                <p className={styles.cardPhone}>{card.phoneNumber}</p>
                <span className={styles.category}>{card.category}</span>
              </div>
            </AntdCard>
          ))}
        </div>
      </section>
    </section>
  );
};

export default NotClaimed;

const cardData = [
  {
    id: 1,
    icon: Rinsy,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
  {
    id: 2,
    icon: Benz,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
  {
    id: 3,
    icon: Burger,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
  {
    id: 4,
    icon: Rinsy,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
];
