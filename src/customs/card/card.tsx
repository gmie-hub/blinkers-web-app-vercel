
import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames"; // Optionally import a library for class management
import styles from "./index.module.scss"; // Assuming you have CSS module styles for the card

interface CardProps extends PropsWithChildren {
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};

export default Card;
