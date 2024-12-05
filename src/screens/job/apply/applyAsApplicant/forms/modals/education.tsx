import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Checkbox from "../../../../../../customs/checkBox/checkbox";
import { useSetAtom } from "jotai";
import { EducationInfoAtom } from "../../../../../../utils/store";
import { Education } from "../../../../../../utils/type";
import { convertDate } from "../../../../../../utils/formatTime";

interface ComponentProps {
  handleClose: () => void;
  indexData: Education;
}

const EducationModal: FC<ComponentProps> = ({ handleClose, indexData }) => {
  const EducationInfoFormData = useSetAtom(EducationInfoAtom);

  // Initial values are derived directly from `indexData`
  const initialValues = {
    institution: indexData?.institution || "",
    degree: indexData?.degree || "",
    field_of_study: indexData?.field_of_study || "",
    Grade: indexData?.Grade || "",
    start_date: convertDate(indexData?.start_date) || "",
    end_date: convertDate(indexData?.end_date) || "",
    stillStudying: indexData?.stillStudying || false, 
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} 
        onSubmit={(values) => {
          const currentEducationInfo = JSON.parse(
            localStorage.getItem("education-info") ?? "[]"
          );

          if (indexData) {
            const updatedEducationInfo = currentEducationInfo?.map(
              (item: Education) =>
                item.institution === indexData?.institution
                  ? { ...item, ...values }
                  : item
            );
            EducationInfoFormData(updatedEducationInfo);
          } else {
            const updatedEducationInfo = [...currentEducationInfo, values];
            EducationInfoFormData(updatedEducationInfo);
          }

          handleClose();
        }}
      >
        {({ setFieldValue ,values}) => (
          <Form>
            <div className={styles.inputContainer}>
              <Input
                name="institution"
                label="Name of Instituition"
                type="text"
              />

              <Input name="degree" label="Degree" type="text" />

              <Input
                label="Field of Study"
                placeholder="What did you study"
                name="field_of_study"
                type="text"
              />

              <Input name="Grade" label="Grade" type="text" />

              <Input
                name="start_date"
                placeholder="Start Date"
                label="Start Date"
                type="date"
              />
              <Input
                name="end_date"
                placeholder="End Date"
                label="End Date"
                type="date"
              />

              <Checkbox
                label="I am still studying"
                name="stillStudying"
                checked={values.stillStudying} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("stillStudying", e.target.checked); 
                }}
              />

              <section className={styles.buttonGroup}>
                <Button
                  variant="white"
                  type="button"
                  onClick={handleClose}
                  text="Cancel"
                  className={styles.btn}
                />
                <Button
                  variant="green"
                  type="submit"
                  disabled={false}
                  text="Save"
                  className={styles.btn}
                />
              </section>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EducationModal;
