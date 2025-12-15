import styles from "./index.module.scss";
import Icon from "/Container.svg"; // Actual image import
import SearchInput from "../../../customs/searchInput";
import { useEffect, useState } from "react";
import ProductSection from "./page";
import { useParams } from "react-router-dom";
import { Modal } from "antd";
import LocationModal from "./locationModal/location";
import { getCityAndState } from "../../../utils/location";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useParams();
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(search || "");
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [location, setLocation] = useState<{
    city?: string;
    state?: string;
    lga?: string;
  }>({});

  const savedLocation = JSON.parse(
    localStorage.getItem("userLocation") || "{}"
  );

  useEffect(() => {}, [savedLocation]);

  useEffect(() => {
    (async () => {
      try {
        const loc = await getCityAndState();
        setLocation(loc);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search query state
  };

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm); // Update appliedSearchTerm only on button click
    // setSearchTerm('')
  };
  console.log("Search Term Sent:", searchTerm, appliedSearchTerm);

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

          <div className={styles.searchBarContainer}>
            {/* Location Box */}
            <div
              className={styles.locationBox}
              onClick={() => setOpenLocationModal(true)}
            >
              <img src="/location-icon.svg" className={styles.locIcon} />
              {/* <span style={{ color: 'black', fontSize: '20px' }}>{location?.city || 'Select Location'}</span> */}
              <span style={{ color: "black", fontSize: "20px" }}>
                {savedLocation?.lga
                  ? savedLocation?.lga
                  : location.lga
                  ? location.lga
                  : "Select Location"}
              </span>
              <span className={styles.arrowDown}>▼</span>
            </div>

            <div className={styles.searchWrapper}>
              <SearchInput
                placeholder="What are you looking for?"
                // width="40rem"
                // isBtn={true}
                onChange={handleInputChange}
                value={searchTerm}
              >
                <button className={styles.searchBtn} onClick={handleSearch}>
                  Search
                </button>


                
              </SearchInput>
            </div>
          </div>
        </div>
      </div>

      <ProductSection
        appliedSearchTerm={appliedSearchTerm}
        setAppliedSearchTerm={setAppliedSearchTerm}
      />
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

export default Market;
