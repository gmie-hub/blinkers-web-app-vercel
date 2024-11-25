import { Form, Formik } from "formik";
import styles from "./flagJob.module.scss";
import * as Yup from "yup";
import { useState } from "react";
import ReusableModal from "../../../../partials/deleteModal/deleteModal";
import Input from "../../../../customs/input/input";
import Button from "../../../../customs/button/button";
import ModalContent from "../../../../partials/successModal/modalContent";
import DeleteIcon from "../../../../assets/del.svg";

interface Props {
  handleCloseModal: () => void;
}

const FlagSeller = ({ handleCloseModal }: Props) => {
  //   const [formValues, setFormValues] = useState<FormikValues | null>(null); // Store form values here
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSucessful] = useState(false);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object().shape({
    reasonForFlag: Yup.string().required("Required"),
  });

  const handleFlag = () => {
    handleCloseModal();

    setIsDeleteModal(true);
  };
  const handelDelete = () => {
    setIsDeleteSucessful(true);
    setIsDeleteModal(false);
  };

  return (
    <div>
      <section>
        <Formik
          initialValues={{
            reasonForFlag: "",
          }}
          onSubmit={() => {
            // banBusinessHandler(values);
            // setFormValues(values); // Save form values to state
            setIsDeleteModal(true); // Open the delete confirmation modal
            handleCloseModal();
          }}
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <Form>
                <div className={styles.inputContainer}>
                  <Input
                    name="reasonForFlag"
                    placeholder="Add Reason For Flag"
                    label="Reason For Flag"
                    type="textarea"
                  />
                  <section className={styles.buttonGroup}>
                    <Button
                      onClick={handleCloseModal}
                      variant="white"
                      type="button"
                      disabled={false}
                      text="Cancel"
                      className={styles.btn}
                    />
                    <Button
                      variant="red"
                      type="submit"
                      disabled={false}
                      text="Submit"
                      className={styles.btn}
                      onClick={() => {
                        handleFlag();
                      }}
                    />
                  </section>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>

      <ReusableModal
        open={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        title="Are You Sure You Want To Flag This Job?"
        confirmText="Yes, Submit"
        cancelText="No, Go Back"
        handleConfirm={() => {
          handelDelete();
        }}
        icon={<img src={DeleteIcon} alt="DeleteIcon" />}
      />

      <ModalContent
        open={isDeleteSuccessful}
        handleCancel={() => setIsDeleteSucessful(false)}
        handleClick={() => {
          setIsDeleteSucessful(false);
        }}
        heading={"Job Flagged Successfully"}
      />
    </div>
  );
};

export default FlagSeller;
