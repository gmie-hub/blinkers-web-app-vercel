import styles from './styles.module.scss';
import { CheckCircleFilled } from '@ant-design/icons';

const plans = [
  {
    title: 'Free Plan',
    price: 'From N0',
    features: Array(10).fill('10 products advert'),
    icon: '📄',
  },
  {
    title: 'Platinum Plan',
    price: 'From N20,000',
    features: Array(10).fill('10 products advert'),
    icon: '👑',
  },
  {
    title: 'Gold Plan',
    price: 'From N10,000',
    features: Array(10).fill('10 products advert'),
    icon: '🌟',
  },
];

const PricingPlansPage = () => {
  return (
    <div className={styles.pricingPage}>
      <h2 className={styles.title}>Choose a plan that fits your business needs</h2>
      <p className={styles.subtitle}>
        Find the right plan for you. Our flexible plans offer the features and support you need to get your business growing
      </p>
      <div className={styles.plans}>
        {plans.map((plan, index) => (
          <div className={`${styles.planCard} ${styles[plan.title.toLowerCase().replace(' ', '')]}`} key={index}>
            <div className={styles.planHeader}>
              <span className={styles.planIcon}>{plan.icon}</span>
              <h3>{plan.title}</h3>
              <p className={styles.price}>{plan.price}</p>
              <button className={styles.chooseBtn}>Choose Plan</button>
            </div>
            <div className={styles.planFeatures}>
              <h4>What's included</h4>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircleFilled className={styles.icon} /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlansPage;