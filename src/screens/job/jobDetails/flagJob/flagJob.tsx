import { Form, Formik, FormikValues } from "formik";
import styles from "./flagJob.module.scss";
import * as Yup from "yup";
import { useState } from "react";
import ReusableModal from "../../../../partials/deleteModal/deleteModal";
import Input from "../../../../customs/input/input";
import Button from "../../../../customs/button/button";
import ModalContent from "../../../../partials/successModal/modalContent";
import DeleteIcon from "../../../../assets/del.svg";
import { App } from "antd";
import { FlagJobApi } from "../../../request";
import { errorMessage } from "../../../../utils/errorMessage";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../utils/store";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Props {
  handleCloseModal: () => void;
}

const FlagSeller = ({ handleCloseModal }: Props) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const { notification } = App.useApp();
  const user = useAtomValue(userAtom);
  const { id } = useParams(); // Extract job ID from URL

  const validationSchema = Yup.object().shape({
    reasonForFlag: Yup.string().required("Required"),
  });

  const FlagJobMutation = useMutation({
    mutationFn: FlagJobApi,
    mutationKey: ["flag-job"],
  });

  const FlagJobHandler = async (values: FormikValues) => {
    const payload: Partial<FlagJob> = {
      job_id: id!,
      applicant_id: 6,
      action: "flag",
      reason: values.reasonForFlag,
    };

    try {
      await FlagJobMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  const handleFlag = (values: FormikValues) => {
    setIsDeleteModal(true);
  };

  const handleDelete = () => {
    setIsDeleteSuccessful(true);
    setIsDeleteModal(false);
  };

  return (
    <div>
      <section>
        <Formik
          initialValues={{
            reasonForFlag: "",
          }}
          onSubmit={(values) => {
            handleFlag(values); // Pass values to handleFlag
          }}
          validationSchema={validationSchema}
        >
          {({ values }) => (
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
                    disabled={FlagJobMutation?.isPending}
                    text={FlagJobMutation?.isPending ? "loading..." : "submit"}
                    className={styles.btn}
                  />
                </section>
              </div>

              <ReusableModal
                open={isDeleteModal}
                handleCancel={() => setIsDeleteModal(false)}
                title="Are You Sure You Want To Flag This Job?"
                confirmText="Yes, Submit"
                cancelText="No, Go Back"
                handleConfirm={async () => {
                  await FlagJobHandler(values); // Pass current form values directly
                  handleDelete();
                }}
                icon={<img src={DeleteIcon} alt="DeleteIcon" />}
              />
            </Form>
          )}
        </Formik>
      </section>

      <ModalContent
        open={isDeleteSuccessful}
        handleCancel={() => setIsDeleteSuccessful(false)}
        handleClick={() => {
          setIsDeleteSuccessful(false);
        }}
        heading="Job Flagged Successfully"
      />
    </div>
  );
};

export default FlagSeller;
