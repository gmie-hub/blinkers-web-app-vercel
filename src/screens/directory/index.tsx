import styles from "./index.module.scss";
import Rinsy from "../../assets/rinskyImage.svg";
import { Card } from "antd";
import Button from "../../customs/button/button";

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

              <div className={styles.inputContainer}>
                  
          <span>
            <select name="select" className={styles.selectBox}>
              <option value="" disabled selected>
                All Category
              </option>
              <option>hello</option>
              <option>hello</option>
              <option>hello</option>
            </select>
          </span>

          <span>
            <input type="text" placeholder="Search..." name="query" />
          </span>

          <span>
            <Button type="button" text="search" />
          </span>
        </div>
      </div>

      <section className={styles.cardContainer}>
        {cardData.map((card) => (
          <Card
            key={card.id}
            className={styles.card}
            cover={<img src={Rinsy} />}
            style={{ width: 292 }}>
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
