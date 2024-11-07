import { Image } from "antd";

import BlinkersLogo from "../../assets/Logo.svg";

const Header = () => {
  return (
    <nav>
      <div>
        <Image src={BlinkersLogo} />
      </div>
    </nav>
  );
};

export default Header;
