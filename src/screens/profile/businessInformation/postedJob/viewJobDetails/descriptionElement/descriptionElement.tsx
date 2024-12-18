import  { ReactNode } from 'react';
import styles from './descriptionElement.module.scss';

interface DescriptionElementProps {
  title: string;
  description: string[] | ReactNode; // Allow both string array and ReactNode
  showPoints?: boolean;
}

export default function DescriptionElement({ title, description = [], showPoints = true }: DescriptionElementProps) {
  const descriptionJsx = Array.isArray(description) ? description.map((item) => <li key={item}>{item}</li>) : description; // Check if description is an array

  return (
    <div className={styles.wrapper}>
      <h4>{title}</h4>
      <ul className={showPoints ? styles.list1 : styles.list}>{descriptionJsx}</ul>
    </div>
  );
}
