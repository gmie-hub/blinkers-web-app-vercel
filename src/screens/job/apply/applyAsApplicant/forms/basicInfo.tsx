import { Form, Formik } from "formik";
import styles from "./styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import { useAtomValue, } from "jotai";
import { userAtom } from "../../../../../utils/store";
import Input from "../../../../../customs/input/input";
import Button from "../../../../../customs/button/button";

interface ComponentProps {
  handleNext: () => void;
}

const BasicInfoForm: FC<ComponentProps> = ({ handleNext }) => {
  // const basicInfoFormData = useSetAtom(EducationInfoAtom);
  const user = useAtomValue(userAtom);

  return (
    <section>
      <Formik
        initialValues={{
          firstName: user?.name,
          // lastName: "",
          phoneNumber: user?.number,
          email: user?.email,
        }}
        onSubmit={() => {
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
                  label="Name"
                  // placeholder="Olajumoke"
                  type="text"
                  disabled={true}
                />

                {/* <Input
                  label="Last Name"
                  placeholder="Last Name "
                  name="lastName"
                  type="text"
                  disabled={true}

                /> */}
                {/* <div style={{display:'flex', gap:'0.8rem'}}>
                <img src={Info} alt="Info" />
                <p >Your last name is your surname</p>

                </div> */}

                <Input
                  name="email"
                  // placeholder="jum@gmail.com"
                  label="Email Address"
                  type="email"
                  disabled={true}

                />

                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  // placeholder="Phone Number"
                  disabled={true}

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
