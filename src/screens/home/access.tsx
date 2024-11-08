import styles from "./index.module.scss";
import { Image } from "antd";
import Icon from "../../assets/image 17.svg";
import Button from "../../customs/button/button";
const Access = () => {
  return (
    <div  style={{marginBlock:'2rem'}}>
      <section className={styles.section1}>
        <div className={styles.rightSection}>
          <Image src={Icon} alt="Icon" preview={false} />
        </div>

        <div className={styles.leftSection}>
          <h3>Access from Anywhere</h3>
          <p>
            Our platform connects users across borders, providing instant access
            to businesses and products around the world. Communicate directly
            with sellers or businesses, get easy and direct access to the people
            behind the products and services
          </p>
          <Button
            type="button"
            variant="green"
            text="Download App"
            className="buttonStyle"
          />
        </div>
      </section>
    </div>
  );
};
export default Access;
