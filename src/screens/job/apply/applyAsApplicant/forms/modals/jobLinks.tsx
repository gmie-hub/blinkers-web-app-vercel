import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";

interface ComponentProps {
  handleClose: () => void;
}

const JobLinks: FC<ComponentProps> = ({ handleClose }) => {
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
        {() => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="Title"
                  label="Title"
                  placeholder="Title"
                  type="text"
                />
                  <Input
                  name="Link"
                  label="Link"
                  placeholder="Link"
                  type="text"
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

export default JobLinks;
