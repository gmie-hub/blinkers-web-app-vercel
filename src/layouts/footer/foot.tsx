import styles from "./footer.module.scss";
import { Image } from "antd";

import Social1 from "../../assets/social1.svg";
import Social2 from "../../assets/social2.svg";
import Social3 from "../../assets/social3.svg";
import Social4 from "../../assets/social4.svg";


const Foot = () => {
  return (
    <div>
      <section className={styles.section3}>
        <p>© 2024 Blinkers Nigeria. All rights reserved.</p>
        <div className={styles.social}>

         

          <a
            href="https://x.com/BlinkersN/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Social4} alt="x" preview={false} />
          </a>
          <a
            href="https://www.instagram.com/blinkers_bd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Social3} alt="instagram" preview={false} />
          </a>

          <a
            href="https://www.facebook.com/blinkersbd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Social2} alt="facebook" preview={false} />
          </a>
          <a
            href="https://wa.me/message/KOJ2KLTGA6SZO1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Social1} alt="whatsap" preview={false} />
          </a>
        </div>
      </section>
    </div>
  );
};
export default Foot;
