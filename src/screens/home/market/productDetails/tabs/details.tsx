import styles from "./details.module.scss";

interface Props {
  productDetailsData?: ProductDatum;
}

const Details = ({ productDetailsData }: Props) => {
  return (
    <div>
      <div className={styles.flexContain}>
        <p className={styles.subjectBg}>{ productDetailsData?.description_tags ||'New'}</p>
        <p className={styles.subjectBg}>PAY ON DELEVERY</p>
      </div>
      <div className={styles.para}>
        <h2>Specification</h2>
        <p>{productDetailsData?.description}</p>
        {/* <p>
          This flare Sleeve midi dress is a must have in every woman's closet.
          beautifully designed for a perfect fit to flatter your figure while
          covered up. the pencil fit compliments the midi length for that classy
          chic look. the flare sleeve is the center of attraction for this
          dress, you can never go wrong in this beautiful piece, be it styled as
          formal or occasion. this flare sleeve midi dress is made of solid
          textured fabric, it contains polyester and spandex with an invisible
          zipper to back for easy wear.{" "}
        </p> */}
      </div>
      <div className={styles.para}>
        <h2> Technical Details</h2>
        <p>
        {productDetailsData?.technical_details }
        </p>
      </div>
    </div>
  );
};
export default Details;
