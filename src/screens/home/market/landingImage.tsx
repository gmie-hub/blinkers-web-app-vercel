import styles from "./index.module.scss";
import Icon from "/Container.svg"; // Actual image import
import SearchInput from "../../../customs/searchInput";
import Button from "../../../customs/button/button";
import { useState } from "react";
import ProductSection from "./page";
import { useParams } from "react-router-dom";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let { search } = useParams();
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(search || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search query state
  };

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm); // Update appliedSearchTerm only on button click
    setSearchTerm('')
  };
  console.log("Search Term Sent:", searchTerm,appliedSearchTerm);

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
          {/* <div className={styles.searchWrapper}>
            <SearchInput
              placeholder="What are you looking for?"
              // isBtn={true} // Show the button on the right side
            />
          </div> */}

          <div className={styles.searchWrapper}>
            <SearchInput
              placeholder="What are you looking for?"
              // width="40rem"
              // isBtn={true}
              onChange={handleInputChange}
              value={searchTerm} 
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
        </div>
      </div>

      <ProductSection
        appliedSearchTerm={appliedSearchTerm}
        setAppliedSearchTerm={setAppliedSearchTerm}
      />
    </div>
  );
};

export default Market;
