// import { useState, useEffect } from "react";
// import Button from "../../../customs/button/button";
// import styles from "./index.module.scss";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Antd icons for arrows
// import Icon from "/Component 5.svg"; // Actual image import
// import Icon2 from "../../../assets/Component 6.svg"; // Actual image import
// import Icon3 from "../../../assets/homeImage3.svg"; // Actual image import
// import SearchInput from "../../../customs/searchInput";
// import { useNavigate } from "react-router-dom";

// // Use the correct paths or URLs for the images
// const images = [
//   Icon, // This will now correctly reference the imported image URL
//   Icon2,
//   Icon3,
// ];

// const PictureBg = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   // Function to handle moving to the next image
//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleNavigateToMarket = () => {
//     // navigate("/market");
//     navigate("/product-listing");

//   }
//   // Function to handle moving to the previous image
//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   // Automatically change the background image every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(handleNextImage, 5000); // Change image every 5 seconds

//     // Cleanup the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   // Handle dot click
//   const handleDotClick = (index:any) => {
//     setCurrentImageIndex(index);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value); // Update the search query state
//   };

//   const handleSearch = () => {
//     // navigate(`/market/${searchTerm}`);
//     navigate(`/product-listing/${searchTerm}`);

//   };

//   return (
//     <div
//       className={styles.image}
//       style={{
//         backgroundImage: `url(${images[currentImageIndex]})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className={styles.home}>
//         <p className={styles.picHead}>Buy, Sell and Find Just About Anything</p>
//         <p className={styles.picPara}>
//           Whether you're local or international, explore boundless opportunities
//           on one platform
//         </p>
//         <br />

//         <div className={styles.searchWrapper}>
//             <SearchInput
//             placeholder="What are you looking for?"
//             // width="40rem"
//               // isBtn={true}
//               onChange={handleInputChange}
//             >
//               <Button
//                 type="button"
//                 variant="green"
//                 text="Search"
//                 className={styles.searchBtn}
//                 onClick={handleSearch} // Set appliedSearchTerm here
//               />
//             </SearchInput>
//             </div>

//         <br />
//         <Button
//           onClick={handleNavigateToMarket}
//           text="Shop Now"
//           className="buttonStyle"
//         />
//         {/* Dot Pagination */}
//       <div className={styles.dotPagination}>
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`${styles.dot} ${
//               currentImageIndex === index ? styles.activeDot : ""
//             }`}
//             onClick={() => handleDotClick(index)}
//           ></span>
//         ))}
//       </div>
//       </div>

//       {/* Left Arrow */}
//       <div className={styles.leftArrow} onClick={handlePrevImage}>
//         <LeftOutlined style={{ fontSize: "2rem", color: "#fff" }} />
//       </div>

//       {/* Right Arrow */}
//       <div className={styles.rightArrow} onClick={handleNextImage}>
//         <RightOutlined style={{ fontSize: "2rem", color: "#fff" }} />
//       </div>

//     </div>

//   );
// };

// export default PictureBg;

import { useState, useEffect } from "react";
import Button from "../../../customs/button/button";
import styles from "./index.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Icon from "/Component 5.svg";
import Icon2 from "../../../assets/Component 6.svg";
import Icon3 from "../../../assets/homeImage3.svg";
import SearchInput from "../../../customs/searchInput";
import { App, Modal } from "antd";
import { useNavigate } from "react-router-dom";
// import CategoriesCard from "../category";
import LocationModal from "../market/locationModal/location";
import { getCityAndState } from "../../../utils/location";

// Background images
const images = [Icon, Icon2, Icon3];

const PictureBg = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [location, setLocation] = useState<{ city?: string; state?: string ,lga:string}>(
    {}
  );
  const savedLocation = JSON.parse(localStorage.getItem("userLocation") || "{}");


  useEffect(() => {
    (async () => {
      try {
        const loc = await getCityAndState();
        setLocation(loc);
      } catch (err: any) {
        // notification.error({
        //   message: "Error",
        //   description: err || "Failed to access location. Please enable GPS.",
        // });
      }
    })();
  }, []);



  console.log(location, "locat");

  // Next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(handleNextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  // Pagination dot click
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Search navigation
  const handleSearch = () => {
    navigate(`/product-listing/${searchTerm}`);
  };

  const handleNavigateToMarket = () => {
    navigate("/product-listing");
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

        {/* --- SEARCH BAR SECTION --- */}
        <div className={styles.searchBarContainer}>
          {/* Location Box */}
          <div
            className={styles.locationBox}
            onClick={() => setOpenLocationModal(true)}
          >
            <img src="/location-icon.svg" className={styles.locIcon} />
            <span style={{ color: "black", fontSize: "20px" }}>
              {savedLocation?.lga ? savedLocation?.lga : location?.lga ? location?.lga : "Select Location"}
            </span>
            <span className={styles.arrowDown}>▼</span>
          </div>

          {/* Search Input */}
          <div className={styles.searchInputBox}>
            <SearchInput
              placeholder="What are you looking for?"
              onChange={handleInputChange}
            />
          </div>

          {/* Search Button */}
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
        <br />

        {/* CTA Button */}
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

      {/* LOCATION MODAL */}
      <Modal
        open={openLocationModal}
        onCancel={() => setOpenLocationModal(false)}
        footer={null}
        centered
        width={1300}
      >
        <LocationModal handleClose={() => setOpenLocationModal(false)} />
      </Modal>
    </div>
  );
};

export default PictureBg;
