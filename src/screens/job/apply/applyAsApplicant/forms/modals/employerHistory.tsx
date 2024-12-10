import { Form, Formik, FormikValues } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Checkbox from "../../../../../../customs/checkBox/checkbox";
import { EmploymentHistory } from "../../../../../../utils/type";
import { useAtom, useSetAtom } from "jotai";
import { EmploymentHistoryInfoAtom } from "../../../../../../utils/store";
import { convertDate } from "../../../../../../utils/formatTime";
import { employmentTypeData, JobTypeData } from "../../../../../request";
import Select from "../../../../../../customs/select/select";

interface ComponentProps {
  handleClose: () => void;
  indexData: EmploymentHistory;
  handleSubmit: (values: FormikValues, resetForm: () => void) => void;
}

const EmpHistory: FC<ComponentProps> = ({
  handleClose,
  indexData,
  handleSubmit,
}) => {
  const employementHistoryData = useSetAtom(EmploymentHistoryInfoAtom);
  const [empData] = useAtom(EmploymentHistoryInfoAtom);

  console.log(empData, "indexDataindexDataindexDataindexData");

  const validationSchema = Yup.object().shape({
    job_title: Yup.string().required("Job Title is required"),
    job_type: Yup.string().required("Job Type is required"),
    company_name: Yup.string().required("Company Name is required"),
    location: Yup.string().required("Location is required"),
    WorkArrangement: Yup.string().required("Work Arrangement is required"),
    start_date: Yup.date()
      .required("Start Date is required")
      .max(new Date(), "Start Date cannot be in the future"),
    // end_date: Yup.date()
    //   .nullable()
    //   .when("currentWork", {
    //     is: false, // Only validate `end_date` if `currentWork` is false
    //     then: Yup.date()
    //       .required("End Date is required")
    //       .min(Yup.ref("start_date"), "End Date must be after Start Date"),
    //   }),
    WorkSummary: Yup.string()
      .required("Work Summary is required")
      .max(2000, "Work Summary cannot exceed 2000 characters"),

    currentWork: Yup.boolean(),
  });

  const JobTypeOptions: any =
    JobTypeData &&
    JobTypeData?.length > 0 &&
    JobTypeData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));

  const employmentTypeOptions: any =
    employmentTypeData &&
    employmentTypeData?.length > 0 &&
    employmentTypeData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));

  return (
    <section>
      <Formik
        initialValues={{
          id: indexData?.id || 0,
          job_title: indexData?.job_title || "",
          job_type: indexData?.job_type || "",
          company_name: indexData?.company_name || "",
          location: indexData?.location || "",
          start_date: convertDate(indexData?.start_date) || "",
          end_date: convertDate(indexData?.end_date) || "",
          WorkSummary: indexData?.WorkSummary || "",
          currentWork: indexData?.currentWork || "",
          WorkArrangement: indexData?.WorkArrangement || "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          const currentEmpHistoryInfo = JSON.parse(
            localStorage.getItem("employment-History") ?? "[]"
          );
          if (indexData) {
            const updatedEmpHisInfo = currentEmpHistoryInfo?.map(
              (item: EmploymentHistory) =>
                item?.id === indexData?.id ? { ...item, ...values } : item
            );
            employementHistoryData(updatedEmpHisInfo);
          } else {
            const newdata = {
              ...values,
              id: currentEmpHistoryInfo.length + 1,
            };
            const updatedEmpInfo = [...currentEmpHistoryInfo, newdata];
            employementHistoryData(updatedEmpInfo);
          }

          handleSubmit(values, resetForm);
          resetForm();

          handleClose();
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, handleChange }) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="job_title"
                  label="Job Title"
                  placeholder="Job Title"
                  type="text"
                />

                {/* <Input
                  name="job_type"
                  label="Job Type"
                  placeholder="Job Type"
                  type="text"
                /> */}
                <Select
                  name="job_type"
                  label="Job Type"
                  placeholder="Select Job Type"
                  options={JobTypeOptions}
                  onChange={handleChange}
                />

                <Input
                  label="Company Name"
                  placeholder="Name of company "
                  name="company_name"
                  type="text"
                />
                <Input
                  label="Location"
                  placeholder="Enter Location"
                  name="location"
                  type="text"
                />

                <Select
                  name="WorkArrangement"
                  label="Work Arrangement"
                  placeholder=" Select Work Arrangement"
                  options={employmentTypeOptions}
                  onChange={handleChange}
                />
                {/* <Input
                  label="Work Arrangement"
                  placeholder="Work Arrangement"
                  name="WorkArrangement"
                  type="text"
                /> */}

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

                <Input
                  name="WorkSummary"
                  label="Work Summary"
                  type="textarea"
                  placeholder="Write your day to day activities"
                />
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <p>0/2000</p>
                </div>

                <Checkbox
                  label="I currently work here"
                  name="currentWork"
                  checked={values.currentWork} // Bind `checked` to Formik's `values`
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(values?.currentWork);
                    setFieldValue("currentWork", e.target.checked); // Update Formik's state
                  }}
                />

                <section className={styles.buttonGroup}>
                  <Button
                    variant="white"
                    type="submit"
                    disabled={false}
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
          );
        }}
      </Formik>
    </section>
  );
};

export default EmpHistory;
