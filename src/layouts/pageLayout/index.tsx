import { Outlet } from "react-router-dom";

import styles from "./styles.module.scss";
import Footer from "../footer/footer";

const Layout = () => {
  //   const [, setOpen] = useState(false);

  //   const showDrawer = useCallback(() => {
  //     setOpen((prevState) => !prevState);
  //   }, []);

  //   const onClose = () => {
  //     setOpen((prevState) => !prevState);
  //   };

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        {/* <Header onOpen={showDrawer} /> */}

        <section className={styles.children}>
          <div>
            <Outlet />
          </div>
          {/* <Footer/> */}
        </section>
      </section>
    </main>
  );
};

export default Layout;
