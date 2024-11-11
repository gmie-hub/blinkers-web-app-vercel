import styles from "./index.module.scss"
import { Card as AntdCard } from "antd";

const RelatedBusiness  = () => {
    return ( 

        <div>
            
        </div>  

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
     );
}
 
export default RelatedBusiness;


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
