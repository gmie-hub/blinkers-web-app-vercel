import React, { FC, PropsWithChildren } from "react";
import styles from "./index.module.scss";

interface CardProps extends PropsWithChildren {
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
