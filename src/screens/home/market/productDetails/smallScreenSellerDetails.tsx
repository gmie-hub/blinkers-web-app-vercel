import styles from "./smallscreen.module.scss";
import { Image, Modal, Tabs, TabsProps } from "antd";
import ProductIcon from "../../../../assets/Ellipse 840.svg";
import Button from "../../../../customs/button/button";
import WhatsappLogo from "../../../../assets/whatsapp.svg";
import InstagramIcon from "../../../../assets/instagram.svg";
import FaceBookStoreIcon from "../../../../assets/fbIcon.svg";
import BrowseLogo from "../../../../assets/Icon (4).svg";
import CallLogo from "../../../../assets/call.svg";
import FlagLogo from "../../../../assets/flag.svg";
import CopyIcon from "../../../../assets/copy.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import { Form, Formik } from "formik";
import Input from "../../../../customs/input/input";
import RelatedAds from "../../../../partials/relatedAds";
import Product2 from "../../../../assets/Image.svg";
import StarIcon from "../../../../assets/Vector.svg";
import favorite from "../../../../assets/Icon + container.svg";
import Details from "./tabs/details";
import Reviews from "./tabs/review";
import EyeIcon from "../../../../assets/eye.svg";
import TimeIcon from "../../../../assets/location-pin-svgrepo-com 2.svg";
import { countUpTo } from "../../trend";
import {  useState } from "react";
import ModalContent from "../../../../partials/successModal/modalContent";
import { useNavigate } from "react-router-dom";
import FlagSeller from "../flagSeller/flagSeller";

const safetyTips = [
  { key: 1, text: "Do not pay in advance, even for the delivery." },
  { key: 2, text: "Try to meet at a safe, public location." },
  { key: 3, text: "Check the item BEFORE you buy it." },
  { key: 4, text: "Pay only after collecting the item." },
  {
    key: 5,
    text: "If you run into any problems with a seller, please report to us to help others. Blinkers Team will check the seller immediately and take appropriate action.",
  },
];

const dressItems = [
  {
    id: 1,
    title: "Dress 1",
    image: Product2, // Use the image path here
    price: "₦40,000",
  },
  {
    id: 2,
    title: "Dress 2",
    image: Product2,
    price: "₦35,000",
  },
  {
    id: 3,
    title: "Dress 3",
    image: Product2,
    price: "₦50,000",
  },
  {
    id: 4,
    title: "Dress 3",
    image: Product2,
    price: "₦50,000",
  },
];

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Product Details",
    children: <Details />,
  },
  {
    key: "2",
    label: "Reviews",
    children: <Reviews limit={3} />,
  },
];
const SmallScreen = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();
  const [flagSeller, setFlagSeller] = useState(false);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleNavigateToSellersProfile = () => {
    navigate(`/sellers-profile`);
    window.scrollTo(0, 0);  
  }

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.leftSide}>

     <div style={{marginInlineStart:'1rem'}}>

     <h2 style={{display:'flex'}}>Mini Skater Dress</h2>
          <p className={styles.fashion}>Fashion Accessories</p>{" "}

          <div className={styles.accessories}>
            <h2 className={styles.payment} >₦40,000 </h2>
            <div className={styles.eye}>
              <Image src={TimeIcon} alt={TimeIcon} preview={false} />
              <p> Posted 3 months ago</p>
            </div>
            <div className={styles.eye}>
              <Image src={EyeIcon} alt={EyeIcon} preview={false} />
              <p>400 Views</p>
            </div>
            <p className={styles.payment}>
                  <span className={styles.title}>State:</span> Lagos
                </p>
                <p>
                  <span className={styles.title}>Local Government Area:</span>{" "}
                  Ikorodu
                </p> 
          </div>

     </div>


          <div className={styles.leftContainer}>
            <div className={styles.firstSideLeft}>
              {dressItems.map((dress) => (
                <div key={dress.id} className={styles.dressCard}>
                  <div>
                    <Image
                    //   width={"12rem"}
                    //   height={"12rem"}
                      src={dress.image}
                      alt={dress.title}
                      preview={false}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.secondSideLeft}>
              <div className={styles.promoImage}>
                <div className={styles.favoriteIcon}>
                  <Image
                    width={30}
                    src={favorite}
                    alt="Favorite"
                    preview={false}
                  />
                </div>
                {/* <Image
                  width={"58.6rem"}
                  // height={'58.6rem'}
                  src={Product2}
                  alt="Product2"
                  preview={false}
                  className={styles.productImage}
                /> */}

                <Image
                  width={'100%'}
                //   maxWidth={10}
                  src={Product2}
                  alt="Product2"
                  preview={false}
                  className={styles.productImage}
                />
              </div>
            </div>
          </div>
          <div className={styles.tabs}>
            {/* <Tabs defaultActiveKey="1" items={items} /> */}
            <Tabs
              defaultActiveKey="1"
              onChange={handleTabChange}
              items={items}
            />
          </div>
        </div>

        <div className={styles.rightSide}>
          <Formik
            initialValues={{ message: "", selectedItems: [] }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
            
              <div className={styles.card}>
                <p className={styles.seller}>Safety Tips</p>
                <ul>
                  {safetyTips.map((tip) => (
                    <li
                      key={tip.key}
                      style={{
                        listStyleType: "disc",
                        marginLeft: "20px",
                        paddingBlock: "0.2rem",
                        fontSize:'1.4rem'
                      }}
                    >
                      {tip.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.card}>
                <p className={styles.seller}>Seller’s Information </p>
                <div className={styles.flexSeller}>
                  <Image src={ProductIcon} width={'2rem'} alt="ProductIcon" preview={false} />
                  <div>
                    <p className={styles.name}>rinsola’s Store</p>
                    <div className={styles.starWrapper}>
                      <span className={styles.star}>
                        <Image
                          width={20}
                          src={StarYellow}
                          alt="StarYellow"
                          preview={false}
                        />
                        (18 ratings)
                      </span>
                      <span className={styles.dot}>.</span>{" "}
                      <span>10 Followers</span>
                    </div>
                  </div>
                  <p className={styles.member}>Member Since Sept 2024</p>

                </div>

                <div className={styles.social}>
                  <Image
                    src={WhatsappLogo}
                    alt="WhatsappLogo"
                    preview={false}
                  />
                  <Image
                    src={InstagramIcon}
                    alt="InstagramIcon"
                    preview={false}
                  />
                  <Image
                    src={FaceBookStoreIcon}
                    alt="FaceBookStoreIcon"
                    preview={false}
                    height={32}
                  />
                  <Image src={BrowseLogo} alt="BrowseLogo" preview={false} />
                </div>

                <div className={styles.flexViewProfile}>
                  <Button
                    onClick={() => handleNavigateToSellersProfile()}
                    text="View Profile"
                  />
                  <br />

                  <Button text="Follow" variant="white" />
                </div>
             
                <Button
                  icon={<Image src={CallLogo} alt="CallLogo" preview={false} />}
                  text="Click To Show Number"
                />

                <div className={styles.flag}>
                  <Button
                    icon={
                      <Image src={FlagLogo} alt="FlagLogo" preview={false} />
                    }
                    text="Flag Seller"
                    variant="redOutline"
                    onClick={() => {
                      setFlagSeller(true);
                    }}
                  />
                </div>

                <div></div>
                <Button
                  className={styles.green}
                  icon={<Image src={CopyIcon} alt="CopyIcon" preview={false} />}
                  text="Copy URL"
                  variant="noBg"
                />

                <div className={styles.chatCart}>
                  <p className={styles.seller}>Chat with seller</p>

                  <div className={styles.starWrapper}>
                    <p className={styles.message}>Is this available</p>
                    <p className={styles.message}> Where is your location</p>
                    <p className={styles.message}> More Enquiry</p>
                  </div>

                  <Input
                    name="location"
                    placeholder="Write your message here"
                    type="textarea"
                  />
                  <div className={styles.startChat}>
                    <Button text="Start Chat" />
                  </div>
                </div>
              </div>

          
            </Form>
          </Formik>
        </div>
      </div>
      {activeKey === "2" && (
        <div>
          <Formik
            initialValues={{ message: "", selectedItems: [] }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <div className={styles.cardreview}>
                <h2 className={styles.write}>Write A Review</h2>

                <p className={styles.adding}>
                  Add a rating. Tap on the icons to rate this product
                </p>

                <div className={styles.starWrapper}>
                  {countUpTo(
                    0,
                    <Image
                      width={20}
                      src={StarYellow}
                      alt="StarYellow"
                      preview={false}
                    />,
                    <Image
                      width={20}
                      src={StarIcon}
                      alt="StarIcon"
                      preview={false}
                    />
                  )}
                </div>
                <div className={styles.reviewInput}>
                  <Input
                    name="review"
                    placeholder="Write  review"
                    type="textarea"
                  />
                </div>
                <div className={styles.seeBtn}>
                  <Button
                    onClick={() => {
                      setOpenSuccess(true);
                    }}
                    text="Submit"
                    className="buttonStyle"
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}

      <RelatedAds />

      <ModalContent
        open={openSuccess}
        handleCancel={() => setOpenSuccess(false)}
        handleClick={() => {
          setOpenSuccess(false);
        }}
        text={"Your Rating and Review Has Been Submitted Successfully"}
      />

      <Modal
        open={flagSeller}
        onCancel={() => setFlagSeller(false)}
        centered
        title="Flag Seller"
        footer={null}
      >
        <FlagSeller handleCloseModal={() => setFlagSeller(false)} />
      </Modal>
    </div>
  );
};
export default SmallScreen;
