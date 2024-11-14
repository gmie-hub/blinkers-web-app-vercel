import styles from "./index.module.scss";
import Icon from "/Container.svg"; // Actual image import
import SearchInput from "../../../customs/searchInput";

const Market = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
        }}
      >
        <div className={styles.home}>
          <p className={styles.picHead}>Market</p>
          <p className={styles.picPara}>
            Explore the marketplace to discover products and services
          </p>
          <div className={styles.searchWrapper}>
            <SearchInput
              placeholder="What are you looking for?"
              isBtn={true} // Show the button on the right side
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
