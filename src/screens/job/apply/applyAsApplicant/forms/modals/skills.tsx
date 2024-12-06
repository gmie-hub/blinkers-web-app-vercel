import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import { SkillsData } from "../../../../../../utils/type";
import { useSetAtom } from "jotai";
import { SkilsInfoAtom } from "../../../../../../utils/store";

interface ComponentProps {
  handleClose: () => void;
  indexData: SkillsData;
}

const Skill: FC<ComponentProps> = ({ indexData, handleClose }) => {
  const SkilsInfoAtomdata = useSetAtom(SkilsInfoAtom);

  return (
    <section>
      <Formik
        initialValues={{
          skill: indexData?.skill || "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          const currentSkillInfo = JSON.parse(
            localStorage.getItem("skill-data") ?? "[]"
          );
          
          if (indexData) {
            const updatedSkillInfo = currentSkillInfo?.map((item: SkillsData) =>
              item?.skill === indexData?.skill ? { ...item, ...values } : item
            );
            SkilsInfoAtomdata(updatedSkillInfo);
          } else {
            const updatedSkillsInfo = [...currentSkillInfo, values];
            SkilsInfoAtomdata(updatedSkillsInfo);
          }
          // UpdateProfInfoHandler(values,resetForm)
          handleClose();
        }}

        // validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="skill"
                  label="Skill"
                  placeholder="Enter your skill"
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

export default Skill;
