import { useState } from "react";
import Button from "../../../customs/button/button";
import styles from "./index.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Antd icons for arrows
import Icon from "../../../assets/Component 5.svg"; // Actual image import
import Icon2 from "../../../assets/Component 6.svg"; // Actual image import
import Icon3 from "../../../assets/Component 7.svg"; // Actual image import

// Use the correct paths or URLs for the images
const images = [
  Icon, // This will now correctly reference the imported image URL
  Icon2,
  Icon3
  // "/assets/path-to-image3.jpg", // Adjust the path based on where your image is stored
];

const PictureBg = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle moving to the next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle moving to the previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={styles.image}
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.home}>
        <p className={styles.picHead}>Buy, Sell and Find Just About Anything</p>
        <p className={styles.picPara}>
          Whether you're local or international, explore boundless opportunities on one platform
        </p>
        <br />
        <Button text="Shop Now" />
      </div>

      {/* Left Arrow */}
      <div className={styles.leftArrow} onClick={handlePrevImage}>
        <LeftOutlined style={{ fontSize: "2rem", color: "#fff" }} />
      </div>

      {/* Right Arrow */}
      <div className={styles.rightArrow} onClick={handleNextImage}>
        <RightOutlined style={{ fontSize: "2rem", color: "#fff" }} />
      </div>
    </div>
  );
};

export default PictureBg;
