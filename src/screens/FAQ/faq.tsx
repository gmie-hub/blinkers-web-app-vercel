import { useState } from "react";
import Icon from "/Container.svg";
import styles from "./faq.module.scss";
import { useCms } from "../profile/myApplication/getCms";
import DOMPurify from "dompurify";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const { data } = useCms();

  const toggleFAQ = (uniqueKey: string | null) => {
    setActiveIndex((prevKey) => (prevKey === uniqueKey ? null : uniqueKey));
  };

  const howToBuy = data?.data?.data[2]?.description;
  const howToSell = data?.data?.data[3]?.description;
  const howToBuyTitle = data?.data?.data[2]?.title;
  const howToSellTitle = data?.data?.data[3]?.title;

  const Description = ({ description }: { description: string }) => {
    // Sanitize the HTML to prevent XSS attacks
    const sanitizedDescription = DOMPurify.sanitize(description);

    return (
      <div
        style={{ paddingInlineStart: "1rem" }}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    );
  };



  // General Questions
  const faqData = [
    {
      question: "What is Blinkers?",
      answer:
        "Blinkers is a marketplace app where you can buy and sell a variety of items, from clothes and shoes to cars and real estate.",
    },
    {
      question: "Is Blinkers free to use?",
      answer:
        "Yes, Blinkers offers a free plan that allows you to post one ad with up to 5 images. However, there are also paid subscription plans with more features.",
    },
    {
      question: howToBuyTitle,
      answer:
      <Description description={howToBuy || ""} />
    },
    {
      question: howToSellTitle,
      answer:
      <Description description={howToSell || ""} />
    },
  ];

  // Subscription Plans
  const SubscriptionData = [
    {
      question: "What are the different subscription plans?",
      answer:
        "Blinkers offers three subscription plans: Free, Gold, and Platinum.",
    },
    {
      question: "What are the benefits of each plan?",
      answer: [
        "Free: Post 1 ad with 5 images.",

        "Gold: Post 10 ads with 5 images each",
        "Platinum: Post 20 ads with 10 images each.",
      ],
    },
    {
        question: "How can I upgrade my subscription?",
        answer:
          "Blinkers offers three subscription plans: Free, Gold, and Platinum.",
      },
      {
        question: "What are the benefits of having more images in my ad?",
        answer:
          "Blinkers offers three subscription plans: Free, Gold, and Platinum.",
      },
      {
        question: "How do I post an advertisement on Blinkers?",
        answer:
          "Blinkers offers three subscription plans: Free, Gold, and Platinum.",
      },
      {
        question: "Is there a limit to the number of items I can sell on Blinkers?",
        answer:
          "Blinkers offers three subscription plans: Free, Gold, and Platinum.",
      },
  ];

  // Payment Data
  const PaymentData = [
    {
      question: "What payment methods does Blinkers accept?",
      answer:
        "The specific payment methods accepted by Blinkers may vary depending on your region. Please refer to the app for the latest information.",
    },
    {
      question:
        "I'm having trouble making a subscription payment. What can I do?",
      answer:
        "If you encounter any issues while making a subscription payment, you can directly chat with the Blinkers admin within the app for assistance.",
    },
    {
        question:
          "I'm having trouble making a subscription payment. What can I do?",
        answer:"To contact a seller or buyer on Blinkers, simply navigate to the item listing and click on the user's profile. From there, you can send a direct message to initiate communication"
      },
  ];

//Additional Question
  const AdditionalData = [
    {
      question: "Does Blinkers offer any buyer or seller protection?",
      answer:'Blinkers prioritizes the safety and security of its users. We employ various security measures, including user verification, secure payment processing, and proactive monitoring of suspicious activities, to safeguard transactions conducted on our platform.'
    },
    {
      question:
        " How do I contact Blinkers support?",
      answer:"If you have any further questions that aren't addressed in this FAQ, you can contact Blinkers support directly through the app."
    },
   
  ];
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${Icon})`,
          }}
        >
          <div className={styles.home}>
            <p className={styles.picHead}>Frequently Asked Questions</p>
            <p className={styles.picPara}>
              Whether you're local or international, explore boundless
              opportunities on one platform
            </p>
          </div>
        </div>

        <div className={styles.mainContainer}>
          {/* General Questions */}
          <div className={styles.card}>
            <h2>General Questions</h2>
            {faqData.map((faq, index) => {
              const uniqueKey = `faq-${index}`;
              return (
                <div
                  key={uniqueKey}
                  className={`${styles.faq} ${
                    activeIndex === uniqueKey ? styles.active : ""
                  }`}
                  onClick={() => toggleFAQ(uniqueKey)}
                >
                  <div className={styles.questionRow}>
                    <h3>{faq.question}</h3>
                    <span
                      className={`${styles.arrow} ${
                        activeIndex === uniqueKey ? styles.activeArrow : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                  {activeIndex === uniqueKey && (
                    <p className={styles.answer}>{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* <div className={styles.card}>
            <h2>Subscription Plans</h2>
            {SubscriptionData.map((faq, index) => (
              <div
                key={`subscription-${index}`}
                className={`${styles.faq} ${
                  activeIndex === `subscription-${index}` ? styles.active : ""
                }`}
                onClick={() =>
                  toggleFAQ(
                    activeIndex === `subscription-${index}`
                      ? null
                      : `subscription-${index}`
                  )
                }
              >
                <div className={styles.questionRow}>
                  <h3>{faq.question}</h3>
                  <span
                    className={`${styles.arrow} ${
                      activeIndex === `subscription-${index}`
                        ? styles.activeArrow
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
                {activeIndex === `subscription-${index}` && (
                  <div className={styles.answer}>
                    {Array.isArray(faq.answer) ? (
                        {faq.answer.map((item, idx) => (
                            <p></p>
                        //   <li key={idx}>
                        //     {item.ans1 && <p>{item.ans1}</p>}
                        //     {item.ans2 && <p>{item.ans2}</p>}
                        //     {item.ans3 && <p>{item.ans3}</p>}
                        //   </li>
                        ))}
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div> */}

          <div className={styles.card}>
            <h2>Subscription Plans</h2>
            {SubscriptionData.map((faq, index) => (
              <div
                key={`subscription-${index}`}
                className={`${styles.faq} ${
                  activeIndex === `subscription-${index}` ? styles.active : ""
                }`}
                onClick={() =>
                  toggleFAQ(
                    activeIndex === `subscription-${index}`
                      ? null
                      : `subscription-${index}`
                  )
                }
              >
                <div className={styles.questionRow}>
                  <h3>{faq.question}</h3>
                  <span
                    className={`${styles.arrow} ${
                      activeIndex === `subscription-${index}`
                        ? styles.activeArrow
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
                {activeIndex === `subscription-${index}` && (
                  <div className={styles.answer}>
                    {Array.isArray(faq.answer) ? (
                      faq.answer.map((item, idx) => <p key={idx}>{item}</p>)
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Data */}
          <div className={styles.card}>
            <h2>Payment Questions</h2>
            {PaymentData.map((faq, index) => {
              const uniqueKey = `payment-${index}`;
              return (
                <div
                  key={uniqueKey}
                  className={`${styles.faq} ${
                    activeIndex === uniqueKey ? styles.active : ""
                  }`}
                  onClick={() => toggleFAQ(uniqueKey)}
                >
                  <div className={styles.questionRow}>
                    <h3>{faq.question}</h3>
                    <span
                      className={`${styles.arrow} ${
                        activeIndex === uniqueKey ? styles.activeArrow : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                  {activeIndex === uniqueKey && (
                    <p className={styles.answer}>{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>


             {/* AdditionalData */}
             <div className={styles.card}>
            <h2>Additional Questions</h2>
            {AdditionalData.map((faq, index) => {
              const uniqueKey = `payment-${index}`;
              return (
                <div
                  key={uniqueKey}
                  className={`${styles.faq} ${
                    activeIndex === uniqueKey ? styles.active : ""
                  }`}
                  onClick={() => toggleFAQ(uniqueKey)}
                >
                  <div className={styles.questionRow}>
                    <h3>{faq.question}</h3>
                    <span
                      className={`${styles.arrow} ${
                        activeIndex === uniqueKey ? styles.activeArrow : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                  {activeIndex === uniqueKey && (
                    <p className={styles.answer}>{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
