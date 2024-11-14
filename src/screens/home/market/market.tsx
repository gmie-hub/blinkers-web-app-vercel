import PictureBg from "./landingImage";

import Main from "./page";

const Home = () => {
  return (
    // <section className={styles.homeWrapper}> 
      <div className='wrapper'>
        <PictureBg />
        <Main/>
      </div>
    // </section>
  );
};

export default Home;
