import Icon from "/Container.svg";
import styles from "./contactUs.module.scss";
import { Image } from "antd";
import { Form, Formik } from "formik";
import Input from "../../customs/input/input";
import Button from "../../customs/button/button";
import cardIcon1 from "../../assets/Icon (5).svg";
import cardIcon2 from "../../assets/Icon (6).svg";
import cardIcon3 from "../../assets/Icon (7).svg";

const cardData = [
  {
    id: 1,
    icon: (
      <Image
        width="4rem"
        height={"4rem"}
        src={cardIcon1 }
        alt="cardIcon"
        preview={false}
      />
    ),
    title: "Send Us An Email",
    para: "support@blinkersnigeria.com",
    
  },
  {
    id: 2,
    icon: (
      <Image
        width="4rem"
        height={"4rem"}
        src={cardIcon2}
        alt="cardIcon"
        preview={false}
      />
    ),
    title: "Call Us",
    para: "+2348155656205",
  },
  {
    id: 3,
    icon: (
      <Image
        width="4rem"
        height={"4rem"}
        src={cardIcon3}
        alt="cardIcon"
        preview={false}
      />
    ),
    title: "Our Address",
    para: "+18B, Onikepo Akande Street, Off Admiralty way, Lekki Phase 1, Lagos State, Nigeria.",
  },
];

const ContactUs = () => {
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
          }}
        >
          <div className={styles.home}>
            <p className={styles.picHead}>Contact Us</p>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <p className={styles.title}>We’d Love To Answer All Your Questions</p>
        <div className={styles.mainContainer}>
          <div className={styles.leftSection}>
            <div className={styles.cardContainer}>
              {cardData?.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.icon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.para}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightSection}>
            <Formik
              initialValues={{ message: "", selectedItems: [] }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <div className={styles.inputContainer}>
                  <Input
                    name="review"
                    placeholder="First name and last name"
                    label="Full Name"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    name="Phone Number"
                    label="Phone Number "
                    placeholder="+1(555) 000-0000"
                    className={styles.inputText}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    name="Subject"
                    label="Subject"
                    placeholder="Subject"
                    className={styles.inputText}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    name="email"
                    label="Message"
                    placeholder="Write your message"
                    className={styles.inputText}
                    type="textarea"
                  />
                </div>
                <div className={styles.btn}>
                <Button  text="Submit Form"  />

                </div>

              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactUs;
