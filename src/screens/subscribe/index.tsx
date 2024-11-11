import React from "react";
import Card from "../../customs/card/card";
import Button from "../../customs/button/button";
import styles from "./index.module.scss";
import Key from "../../assets/claim.svg";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const Subscription = () => {
  const navigate = useNavigate();

  const handleNavigateToSubscriptionPricing = () => {
    navigate(routes.page.SubscriptionPricing);
  };

  return (
    <section className={styles.container}>
      <Card className={styles.cardContainer}>
        <>
          <img src={Key} alt="" />
        </>

        <h2>Subcribe To Claim This Business</h2>
        <p>
          Choose a subcribtion plann to be able to claim and manage your <br />
          business
        </p>

        <Button
          text="check out subscription plan"
          type="button"
          onClick={handleNavigateToSubscriptionPricing}
        />
      </Card>
    </section>
  );
};

export default Subscription;
