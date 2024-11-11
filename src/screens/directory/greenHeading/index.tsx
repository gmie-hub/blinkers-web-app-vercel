import styles from "./index.module.scss";

import { Image } from "antd";
import appleStoreIcon from "../../../assets/Mobile app store badge.svg";
import GoolgeStoreIcon from "../../../assets/Mobile googlestore badge (1).svg";
import BlinkersLogo from "../../../assets/Logo.svg";
import AppStore from "../../../assets/apstore.svg";
import GooglePlay from "../../../assets/googleplay.svg";
import Iphone from "../../../assets/Iphone.svg";
import Button from "../../../customs/button/button";
import SearchInput from "../../../customs/searchInput";

const DirectoryHeading = () => {
  return (
    <main>
      <section className={styles.section1}>
        <p>Directory</p>
        <p>Explore various business listings</p>

        <div className={styles.inputContainer}>
          <select>
            <option>hello</option>
            <option>hello</option>
            <option>hello</option>
          </select>

          <SearchInput placeholder="search businesses"  />

          <div className={styles.button}>
            <Button type="submit" text="search" />
          </div>
        </div>
      </section>
    </main>
  );
};
export default DirectoryHeading;
