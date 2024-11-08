import { InputHTMLAttributes } from "react";
import { Image } from "antd";
import SearchIcon from "../../assets/Search.svg";
import styles from "./index.module.scss";
import Button from "../button/button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  width?: string;
  isBtn?: boolean; // Add `isBtn` to show the button conditionally
}

const SearchInput: React.FC<Props> = ({
  placeholder,
  width,
  isBtn,
  ...rest
}) => {
  return (
    <form className={styles.searchContainer}>
      {/* Search Icon on the left */}
      <button className={styles.searchIcon} type="button">
        <Image src={SearchIcon} alt="SearchIcon" preview={false} />
      </button>

      {/* Input Field */}
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder || "Search"}
        // style={{ width: width }}
        {...rest}
      />

      {/* Conditionally render the button inside the input */}
      {isBtn && (
        <Button
          type="button"
          variant="green"
          text="Search"
          className={styles.searchBtn}
        />
      )}
    </form>
  );
};

export default SearchInput;
