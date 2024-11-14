import styles from './delete.module.scss';
import { Modal } from 'antd';
import { ReactNode } from 'react';
import Button from '../../customs/button/button';
import { Image } from "antd";
import ProductIcon from "../../assets/Ellipse 840.svg";

interface Props {
  handleCancel: () => void;
  handleConfirm?: () => void;
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'red' | 'greenOutline' | 'default';
  cancelVariant?: 'red' | 'greenOutline' | 'default';
  icon?: ReactNode;
}

const ReusableModal = ({
  open,
  handleCancel,
  handleConfirm,
  title = '',
  description = '',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
//   confirmVariant = 'red',
//   cancelVariant = 'greenOutline',
  icon =<Image src={ProductIcon} alt="ProductIcon" preview={false} />
  ,
}: Props) => {
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <section className={styles.DeleteModalWrapper}>
        {icon}
        <p className={styles.ModalTitle}>{title}</p>
        <p className={styles.ModalDescription}>{description}</p>
        <div className={styles.btn}>
          <Button
            variant={'white'}
            onClick={()=>{handleCancel()}}
            type="button"
            text={cancelText}
            className={styles.btn}

          />
          <Button
            variant={'red'}
            onClick={handleConfirm}
            type="submit"
            text={confirmText}
            className={styles.btn}
          />
        </div>
      </section>
    </Modal>
  );
};

export default ReusableModal;
