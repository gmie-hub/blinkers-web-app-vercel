import { Form, Formik, FormikValues } from "formik";
import styles from "./flagSeller.module.scss";
import * as Yup from "yup";
import { useState } from "react";
import ReusableModal from "../../../../partials/deleteModal/deleteModal";
import Input from "../../../../customs/input/input";
import Button from "../../../../customs/button/button";
import DeleteIcon from "../../../../assets/del.svg";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { FlagSellerApi} from "../../../request";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";
import { App } from "antd";
import { errorMessage } from "../../../../utils/errorMessage";

interface Props {
  handleCloseModal: () => void;
  sellerId?:any;
  hasUserFlaggedSeller?:boolean
}

const FlagSellerContent = ({ handleCloseModal,sellerId,hasUserFlaggedSeller }: Props) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const user = useAtomValue(userAtom);
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object().shape({
    reasonForFlag: Yup.string().required("Required"),
  });



  const flagSellerMutation = useMutation({
    mutationFn: FlagSellerApi,
    mutationKey: ["flag-seller"],
  });

  const flagSellerHandler = async (values: FormikValues) => {
    const payload = {
      user_id: user?.id,
      seller_id: sellerId!,
      action: hasUserFlaggedSeller ? "unflag" :"flag",
      reason: values.reasonForFlag,
    };

    try {
      await flagSellerMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-sellers-followers"],
          });
          setIsDeleteModal(false);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
      setIsDeleteModal(false);
    }
  };

  return (
    <div>
      <section>
        <Formik
          initialValues={{
            reasonForFlag: "",
          }}
          onSubmit={() => {
            // flagSellerHandler(values);
            handleCloseModal();
            setIsDeleteModal(true); // Open the delete confirmation modal
          }}
          validationSchema={validationSchema}
        >
          {({  values }) => (
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
                      values?.reasonForFlag !== "" && setIsDeleteModal(true);
                    }}
                  />
                </section>
              </div>

              <ReusableModal
                open={isDeleteModal}
                handleCancel={() => setIsDeleteModal(false)}
                title="Are You Sure You Want to Flag this Seller?"
                confirmText={flagSellerMutation?.isPending ? 'loading...': "Yes, Submit"}
                cancelText="No, Go Back"
                handleConfirm={() => flagSellerHandler(values)} // Use Formik's submitForm
                icon={<img src={DeleteIcon} alt="DeleteIcon" />}
                disabled={flagSellerMutation?.isPending}
              />
            </Form>
          )}
        </Formik>
      </section>

      {/* <ModalContent
        open={isDeleteSuccessful}
        handleCancel={() => setIsDeleteSucessful(false)}
        handleClick={() => {
          setIsDeleteSucessful(false);
        }}
        heading={"Seller Flagged Successfully"}
      /> */}
    </div>
  );
};

export default FlagSellerContent;
