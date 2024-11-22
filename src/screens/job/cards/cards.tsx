import { cardData } from "../data";
import styles from "./card.module.scss";

const Section2 = () => {
  return (
    <div className={styles.whyWrapper}>
      <div className={styles.cardContainer}>
        {cardData?.length &&
          cardData?.map((card) => (
            <div className={styles.chooseCard} key={card.id}>
              <div className={styles.cardWrapper}>
                <div className={styles.icon}>{card.icon}</div>
                <div className={styles.textContent}>
                  <p>Customer Experience Manager</p>
                  <p>dndkk</p>
                </div>
              </div>
              <div>
                <span>Full time</span> <span>Remote</span>{" "}
                <span>Mid level</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Section2;
