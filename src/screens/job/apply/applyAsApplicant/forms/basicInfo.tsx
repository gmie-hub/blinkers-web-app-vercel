import { Form, Formik } from "formik";
import styles from "./styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import { useSetAtom } from "jotai";
import { basicInfoAtom } from "../../../../../utils/store";
import Input from "../../../../../customs/input/input";
import Button from "../../../../../customs/button/button";
import Info from "../../../../../assets/Info.svg";

interface ComponentProps {
  handleNext: () => void;
}

const BasicInfoForm: FC<ComponentProps> = ({ handleNext }) => {
  const basicInfoFormData = useSetAtom(basicInfoAtom);

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
          basicInfoFormData({ ...values });
          handleNext();
        }}
        // validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="firstName"
                  label="First Name"
                  placeholder="Olajumoke"
                  type="text"
                />

                <Input
                  label="Last Name"
                  placeholder="Last Name "
                  name="lastName"
                  type="text"
                />
                <div style={{display:'flex', gap:'0.8rem'}}>
                <img src={Info} alt="Info" />
                <p >Your last name is your surname</p>

                </div>

                <Input
                  name="email"
                  placeholder="jum@gmail.com"
                  label="Email Address"
                  type="email"
                />

                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  placeholder="Phone Number"
                />

                <section className={styles.buttonGroup}>
                  <Button
                    variant="green"
                    type="submit"
                    disabled={false}
                    text="Next"
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

export default BasicInfoForm;
