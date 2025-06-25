import styles from './styles.module.scss';
import { CheckCircleFilled } from '@ant-design/icons';
import Platinum from "../../../assets/platinum.svg";
import Button from '../../../customs/button/button';

const features = Array(12).fill('10 products advert');

const SubscriptionCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={Platinum} alt="Platinum" />

        <span className={styles.planName}>Platinum Plan</span>
      </div>
      <h2 className={styles.price}>3 months plan - ₦60,000</h2>
      <p className={styles.bill}>Billing cycles</p>

      <div className={styles.timeline}>
        <div className={styles.line}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.dates}>
          <span>22nd May, 2025</span>
          <span>22nd August, 2025</span>
        </div>
      </div>

      <div className={styles.included}>
        <h4>What's included</h4>
        <ul>
          {features.map((item, index) => (
            <li key={index}>
              <CheckCircleFilled style={{ color: 'green' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.buttons}>


        <Button
              // variant="  "
              // className={"buttonStyle"}

            >
            Modify Subscription plan
            </Button>
        <Button
              variant="redOutline"
              // className={"buttonStyle"}

            >
              Cancel Subscription
            </Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
