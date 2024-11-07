import styles from "./footer.module.scss";
import { Image } from "antd";
import TwitterLogo from "../../assets/Social icon.svg";
import LinkedinleStoreIcon from "../../assets/Social icon (1).svg";
import FaceBookStoreIcon from "../../assets/Social icon (2).svg";
import BrowseLogo from "../../assets/Social icon (3).svg";

const Foot = () => {
  return (
    <div>
      <section className={styles.section3}>
        <p>© 2024 Blinkers Nigeria. All rights reserved.</p>
        <div className={styles.social}>
        <Image src={TwitterLogo} alt="TwitterLogo" preview={false} />
        <Image src={LinkedinleStoreIcon} alt="LinkedinleStoreIcon" preview={false} />
        <Image src={FaceBookStoreIcon} alt="FaceBookStoreIcon" preview={false} />
        <Image src={BrowseLogo} alt="BrowseLogo" preview={false} />


        </div>
      </section>
    </div>
  );
};
export default Foot;
