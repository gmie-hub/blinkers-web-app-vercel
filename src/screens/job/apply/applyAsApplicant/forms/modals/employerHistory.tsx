import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Select from "../../../../../../customs/select/select";
import Checkbox from "../../../../../../customs/checkBox/checkbox";

interface ComponentProps {
  handleClose: () => void;
}

const EmpHistory: FC<ComponentProps> = ({ handleClose }) => {
  return (
    <section>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          handleClose();
        }}
        // validationSchema={validationSchema}
      >
        {({ handleChange }) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="Job Title"
                  label="Job Title"
                  placeholder="Job Title"
                  type="text"
                />

                <Select
                  name="Job Type"
                  label="Job Type"
                  placeholder=" Select Job Type"
                  options={[]}
                  onChange={handleChange}
                />

                <Input
                  label="Company’s Name"
                  placeholder="Name of company "
                  name="Company’s Name"
                  type="text"
                />
                <Input
                  label="Location"
                  placeholder="Enter Location"
                  name="Location"
                  type="text"
                />
                <Input
                  label="Work Arrangement"
                  placeholder="Work Arrangement"
                  name="Work Arrangement"
                  type="text"
                />

                <Input
                  name="startDate"
                  placeholder="Start Date"
                  label="Start Date"
                  type="date"
                />
                <Input
                  name="EndDate"
                  placeholder="End Date"
                  label="End Date"
                  type="date"
                />

                <Input
                  name="Work Summary"
                  label="Work Summary"
                  type="textarea"
                  placeholder="Write your day to day activities"
                />
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <p>0/2000</p>
                </div>
                <Checkbox
                  label={'I currently work here'}
                  name='Current'
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
