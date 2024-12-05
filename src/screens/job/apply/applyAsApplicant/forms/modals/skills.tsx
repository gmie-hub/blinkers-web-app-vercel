import { Form, Formik, FormikValues } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import { SkillsData } from "../../../../../../utils/type";
import { useAtomValue, useSetAtom } from "jotai";
import { SkilsInfoAtom } from "../../../../../../utils/store";
import { useMutation } from "@tanstack/react-query";
import { ProfInfoApi, UpdateProfInfoApi } from "../../../../../request";
import { App } from "antd";

interface ComponentProps {
  handleClose: () => void;
  indexData:SkillsData;
}

const Skill: FC<ComponentProps> = ({indexData ,handleClose }) => {
  const SkilsInfoAtomdata = useSetAtom(SkilsInfoAtom);
  const { notification } = App.useApp();
  const SkillsData = useAtomValue(SkilsInfoAtom);

  const createProfInfoMutation = useMutation({
    mutationFn: UpdateProfInfoApi,
    mutationKey: ['prof-info'],
  });


  const UpdateProfInfoHandler = async (values: FormikValues, resetForm: () => void) => {
    const formData = new FormData();
  

    // formData.append("user_id", '411');
   

  

  
    // Append skills as an array
    SkillsData?.forEach((item: SkillsData, index: number) => {
      formData.append(`skill[${index}]`, item?.skill);
    });
  
 
    try {
      await createProfInfoMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          resetForm();
          // setOpenSuccess(true);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: "An error occurred while submitting your information.",
      });
    }
  };


  return (
    <section>
      <Formik
        initialValues={{
          skill: indexData?.skill || "",

       
        }}
        enableReinitialize={true} 

        onSubmit={(values,{resetForm}) => {
          const currentSkillInfo =
           JSON.parse(
            localStorage.getItem("skill-data") ?? "[]"
          );
          if (indexData) {
            const updatedSkillInfo = currentSkillInfo?.map(
              (item: SkillsData) =>
                item?.skill === indexData?.skill
                  ? { ...item, ...values }
                  : item
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
