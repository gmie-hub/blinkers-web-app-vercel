import { Form, Formik, FormikValues } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Checkbox from "../../../../../../customs/checkBox/checkbox";
import { useSetAtom } from "jotai";
import { EducationInfoAtom } from "../../../../../../utils/store";
import { Education } from "../../../../../../utils/type";
import { convertDate } from "../../../../../../utils/formatTime";
import * as Yup from 'yup';

interface ComponentProps {
  handleClose: () => void;
  indexData: Education;
  handleSubmit: (values: FormikValues, resetForm: () => void) => void;

}

const EducationModal: FC<ComponentProps> = ({ handleClose, indexData,  handleSubmit }) => {
  const educationInfoFormData = useSetAtom(EducationInfoAtom);

  // Initial values are derived directly from `indexData`
  const initialValues = {
    id: indexData?.id || 0,
    institution: indexData?.institution || "",
    degree: indexData?.degree || "",
    field_of_study: indexData?.field_of_study || "",
    Grade: indexData?.Grade || "",
    start_date: convertDate(indexData?.start_date) || "",
    end_date: convertDate(indexData?.end_date) || "",
    stillStudying: indexData?.stillStudying || false, 
  };

   const validationSchema = Yup.object({
    institution: Yup.string().required("Institution name is required"),
    degree: Yup.string().required("Degree is required"),
    field_of_study: Yup.string().required("Field of study is required"),
    Grade: Yup.string().required("Grade is required"),
    start_date: Yup.date().required("Start date is required").nullable(),
    // end_date: Yup.date().when('stillStudying', {
    //   is: false,
    //   then: Yup.date().required("End date is required").nullable(),
    // }),
  });


  return (
    <section>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true} 
        onSubmit={(values, { resetForm }) => {
          const currentEducationInfo = JSON.parse(
            localStorage.getItem("education-info") ?? "[]"
          );

          if (indexData) {
            const updatedEducationInfo = currentEducationInfo?.map(
              (item: Education) =>
                item?.id === indexData?.id
                  ? { ...item, ...values }
                  : item
            );
            educationInfoFormData(updatedEducationInfo);
          } else {
            const newdata = {
              ...values,
              id: currentEducationInfo.length + 1, // Dynamically set id based on array length
            };
            const updatedEducationInfo = [...currentEducationInfo, newdata];
            educationInfoFormData(updatedEducationInfo);
            resetForm();

          }
          handleSubmit(values, resetForm);
          resetForm();

          handleClose();
          resetForm();

        }}
        validationSchema={validationSchema} // Attach validation schema

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
