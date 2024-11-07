import styles from "./index.module.scss";
import Rinsy from "../../assets/rinskyImage.svg";
import { Card } from "antd";

const DirectoryPage = () => {
  const cardData = [
    {
      id: 1,
      icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
      title: "Shop with Rinsy",
      address: "4 Blinkers Street, Lekki, Lagos",
      phoneNumber: "09012345678",
      category: "Fashion Accessories",
    },
    {
      id: 2,
      icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
      title: "Shop with Rinsy",
      address: "4 Blinkers Street, Lekki, Lagos",
      phoneNumber: "09012345678",
      category: "Fashion Accessories",
    },
    {
      id: 3,
      icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
      title: "Shop with Rinsy",
      address: "4 Blinkers Street, Lekki, Lagos",
      phoneNumber: "09012345678",
      category: "Fashion Accessories",
    },
    {
      id: 4,
      icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
      title: "Shop with Rinsy",
      address: "4 Blinkers Street, Lekki, Lagos",
      phoneNumber: "09012345678",
      category: "Fashion Accessories",
    },
  ];

  return (
    <section>
      <div className={styles.greenContainer}>
        <p>Directory</p>
        <p>Explore Various Business Listings</p>
      </div>

      <section className={styles.cardContainer}>
        {cardData.map((card) => (
          <Card
            key={card.id}
            className={styles.card}
            cover={<img src={Rinsy} />}
            style={{ width: 240 }}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardAddress}>{card.address}</p>
              <p className={styles.cardPhone}>{card.phoneNumber}</p>
              <span className={styles.category}>{card.category}</span>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
};

export default DirectoryPage;
