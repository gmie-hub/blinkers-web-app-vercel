import styles from "./footer.module.scss";
import { Image } from "antd";
import appleStoreIcon from "../../assets/Mobile app store badge.svg";
import GoolgeStoreIcon from "../../assets/Mobile googlestore badge (1).svg";
import BlinkersLogo from "../../assets/Logo.svg";
import AppStore from "../../assets/apstore.svg";
import GooglePlay from "../../assets/googleplay.svg";
import Iphone from "../../assets/Iphone.svg";

const Footer = () => {
  return (
    <main>
      <section className={styles.section1} >
        <div className={styles.leftSection}>
          <h3>Download The App</h3>
          <p>
            Buy, sell and find out about anything using the app on your mobile.
            Whether you're buying or selling, our mobile app gives you instant
            access to a world of opportunities, anytime, anywhere. Get real-time
            updates, manage your listings, and connect with customers
            effortlessly.
          </p>
          <div className={styles.logoWrapper}>
            {/* <div className={styles.logo}>
              <Image src={appleLogo} alt="back" preview={false} />
              <div className={styles.logoPara}>
                <p>Download on the</p>
                <p>Apple Store</p>
              </div>
            </div> */}
            <Image src={AppStore} alt="AppStore" preview={false} />
            <Image src={GooglePlay} alt="GooglePlay" preview={false} />

            
          </div>
        </div>
        <div className={styles.rightSection}>
          <Image src={Iphone} alt="Iphone" preview={false} />

        </div>
      </section>
      <section className={styles.section2}>
        <div className={styles.section2Item}>
          <div className={styles.list}>
            <Image
              className={styles.BlinkersLogo}
              src={BlinkersLogo}
              alt="appleStoreIcon"
              preview={false}
            />

            <p>E-mail: blinkersnigeria@gmail.com</p>
            <p>Phone: 09012345678</p>
            <p>
              Address: 18B, Onikepo Akande street, off Admiralty way, Lekki
              phase 1, Lagos, Nigeria
            </p>
          </div>
        </div>
        <div className={styles.section2Item}>
          <div className={styles.list}>
            <p className={styles.title}>Company</p>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>How to Buy</p>
            <p>How to Sell</p>
          </div>
        </div>
        <div className={styles.section2Item}>
          <div className={styles.list}>
            <p className={styles.title}>Quick Links</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>Safety Tips</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className={styles.section2Item}>
          <div className={styles.list}>
            <p style={{ paddingBlockEnd: "0.5rem" }} className={styles.title}>
              Contact Info
            </p>
            <div>
              <Image
                className={styles.BlinkersLogo}
                src={appleStoreIcon}
                alt="appleStoreIcon"
                preview={false}
              />
            </div>
            <div>
              <Image
                src={GoolgeStoreIcon}
                alt="GoolgeStoreIcon"
                preview={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Footer;
