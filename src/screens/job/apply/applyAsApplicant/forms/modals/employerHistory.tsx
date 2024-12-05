import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Checkbox from "../../../../../../customs/checkBox/checkbox";
import { EmploymentHistory } from "../../../../../../utils/type";
import { useAtom, useSetAtom } from "jotai";
import { EmploymentHistoryInfoAtom } from "../../../../../../utils/store";
import { convertDate } from "../../../../../../utils/formatTime";

interface ComponentProps {
  handleClose: () => void;
  indexData: EmploymentHistory;
}

const EmpHistory: FC<ComponentProps> = ({ handleClose, indexData }) => {
  const EmployementHistoryData = useSetAtom(EmploymentHistoryInfoAtom);
  const [empData] = useAtom(EmploymentHistoryInfoAtom); // Use the atom directly

  console.log(empData, "indexDataindexDataindexDataindexData");
  return (
    <section>
      <Formik
        initialValues={{
          job_title: indexData?.job_title || "",
          job_type: indexData?.job_title || "",
          company_name: indexData?.company_name || "",
          location: indexData?.location || "",
          start_date: convertDate(indexData?.start_date) || "",
          end_date: convertDate(indexData?.end_date) || "",
          WorkSummary: indexData?.WorkArrangement || "",
          currentWork: indexData?.currentWork || "",
          WorkArrangement: indexData?.WorkArrangement || "",

        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          const currentEmpHistoryInfo = JSON.parse(
            localStorage.getItem("employment-History") ?? "[]"
          );
          if (indexData) {
            const updatedEmpHisInfo = currentEmpHistoryInfo?.map(
              (item: EmploymentHistory,) =>
                item?.company_name === indexData?.company_name ? { ...item, ...values } : item
            );
            EmployementHistoryData(updatedEmpHisInfo);
          } else {
            const updatedEmpInfo = [...currentEmpHistoryInfo, values];
            EmployementHistoryData(updatedEmpInfo);
          }

          handleClose();
        }}

        // validationSchema={validationSchema}
      >
        {({  values, setFieldValue }) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="job_title"
                  label="Job Title"
                  placeholder="Job Title"
                  type="text"
                />

                <Input
                  name="job_type"
                  label="Job Type"
                  placeholder="Job Type"
                  type="text"
                />
                {/* <Select
                  name="JobType"
                  label="Job Type"
                  placeholder=" Select Job Type"
                  options={[]}
                  onChange={handleChange}
                /> */}

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
                <Input
                  label="Work Arrangement"
                  placeholder="Work Arrangement"
                  name="WorkArrangement"
                  type="text"
                />

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
                {/* <Checkbox
                  label={'I currently work here'}
                  name='Current'
                /> */}

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
