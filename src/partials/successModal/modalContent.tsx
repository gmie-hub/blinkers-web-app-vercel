import Button from '../../customs/button/button';
import styles from './index.module.scss';
import { Modal } from 'antd';
import { Image } from "antd";
import DoneIcon from "../../assets/Done.svg";

interface Props {
  handleCancel: () => void;
  handleClick: () => void;
  open: boolean;
  text: string;

}

const ModalContent = ({open, text, handleCancel,handleClick }: Props) => {

 

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      centered
      // title=""
      footer={null}
    >
      <section className={styles.ModalWrapper}>
        <Image src={DoneIcon} alt={DoneIcon} preview={false} />

        <p className={styles.ModalPara}>{text}</p>
        <div className={styles.btn}>
          <Button
            onClick={handleClick}
            type="button"
            text={'Okay'}
            className={styles.btn}
          />
        </div>
      </section>
    </Modal>
  );
};
export default ModalContent;
