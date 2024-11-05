import styles from "./footer.module.scss";
import {Image} from "antd";
import appleLogo from "../../assets/Apple logo.svg"; // Import the image from src

const Footer = () => {
  return (
    <div>
      <section className={styles.section1}>
        <div className={styles.leftSection}>
          <h3>Download The App</h3>
          <p>
            Buy, sell and find out about anything using the app on your mobile.
            Whether you're buying or selling, our mobile app gives you instant
            access to a world of opportunities, anytime, anywhere. Get real-time
            updates, manage your listings, and connect with customers
            effortlessly.
          </p>
          <div>
          <div className={styles.logo}>

            <Image src={appleLogo} alt='back' preview={false} />
            <div className={styles.logoPara}>
                
            <p>Download on the</p>
                <p>Apple Store</p>
                

            </div>

            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <p>Download The App</p>
        </div>
      </section>
    </div>
  );
};
export default Footer;
