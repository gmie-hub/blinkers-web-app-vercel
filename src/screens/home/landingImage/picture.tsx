
import { useState, useEffect } from "react";
import Button from "../../../customs/button/button";
import styles from "./index.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Antd icons for arrows
import Icon from "/Component 5.svg"; // Actual image import
import Icon2 from "../../../assets/Component 6.svg"; // Actual image import
import Icon3 from "../../../assets/homeImage3.svg"; // Actual image import
import SearchInput from "../../../customs/searchInput";
import { useNavigate } from "react-router-dom";

// Use the correct paths or URLs for the images
const images = [
  Icon, // This will now correctly reference the imported image URL
  Icon2,
  Icon3,
];

const PictureBg = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle moving to the next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  


  const handleNavigateToMarket = () => {
    // navigate("/market");
    navigate("/product-listing");


  }
  // Function to handle moving to the previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Automatically change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(handleNextImage, 5000); // Change image every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Handle dot click
  const handleDotClick = (index:any) => {
    setCurrentImageIndex(index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search query state
  };

  const handleSearch = () => {
    // navigate(`/market/${searchTerm}`);
    navigate(`/product-listing/${searchTerm}`);


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
          Whether you're local or international, explore boundless opportunities
          on one platform
        </p>
        <br />

        <div className={styles.searchWrapper}>
            <SearchInput
            placeholder="What are you looking for?"
            // width="40rem"
              // isBtn={true}
              onChange={handleInputChange}
            >
              <Button
                type="button"
                variant="green"
                text="Search"
                className={styles.searchBtn}
                onClick={handleSearch} // Set appliedSearchTerm here
              />
            </SearchInput>
            </div>

        <br />
        <Button
          onClick={handleNavigateToMarket}
          text="Shop Now"
          className="buttonStyle"
        />
        {/* Dot Pagination */}
      <div className={styles.dotPagination}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentImageIndex === index ? styles.activeDot : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
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
