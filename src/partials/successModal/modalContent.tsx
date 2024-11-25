import Button from '../../customs/button/button';
import styles from './index.module.scss';
import { Modal } from 'antd';
import { Image } from "antd";
import DoneIcon from "../../assets/Done.svg";

interface Props {
  handleCancel: () => void;
  handleClick: () => void;
  open: boolean;
  text?: string;
  heading?:string;
  icon?:any;
  BtnText?:string

}

const ModalContent = ({open,heading, text,handleCancel,handleClick,icon, BtnText }: Props) => {

 

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      centered
      title=""
      footer={null}
    >
      <section className={styles.ModalWrapper}>
      {icon ? icon :<Image src={DoneIcon} alt={DoneIcon} preview={false} />}
  {    heading && <h3>{heading}</h3>}

      {  text && <p className={styles.ModalPara}>{text}</p>}
        <div className={styles.btn}>
          <Button
            onClick={handleClick}
            type="button"
            text={ BtnText ? BtnText :'Okay' }
            className={styles.btn}
          />
        </div>
      </section>
    </Modal>
  );
};
export default ModalContent;
