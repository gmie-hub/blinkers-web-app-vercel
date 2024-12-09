// import { Form, Formik, FormikValues } from "formik";
// import styles from "../styles.module.scss";
// import { FC } from "react";
// import * as Yup from "yup";
// import Input from "../../../../../../customs/input/input";
// import Button from "../../../../../../customs/button/button";
// import { SkillsData } from "../../../../../../utils/type";
// import { useSetAtom } from "jotai";
// import { SkilsInfoAtom } from "../../../../../../utils/store";

// interface ComponentProps {
//   handleClose: () => void;
//   indexData: SkillsData;
//   handleSubmit: (values: FormikValues, resetForm: () => void) => void;
// }

// const Skill: FC<ComponentProps> = ({
//   indexData,
//   handleClose,
//   handleSubmit,
// }) => {
//   const skilsInfoAtomdata = useSetAtom(SkilsInfoAtom);
//   console.log(indexData, "dl");

//   const validationSchema = Yup.object().shape({
//     skills: Yup.string()
//       .required("Skill is required") 
//   });

//   return (
//     <section>
//       <Formik
//         initialValues={{
//           // id: indexData?.id || 0, 
//           skills: indexData?.skills || indexData || "",
//         }}
//         enableReinitialize={true}
//         onSubmit={(values, { resetForm }) => {
//           const currentSkillInfo = JSON.parse(
//             localStorage.getItem("skill-data") ?? "[]"
//           );

//           if (indexData?.skills) {
//             // Update existing skill
//             const updatedSkillInfo = currentSkillInfo?.map((item: SkillsData) =>
//               item === indexData ? { ...item, ...values } : item
//             );
//             skilsInfoAtomdata(updatedSkillInfo);
        
//             resetForm();
//           } else {
//             const newSkill = {
//               ...values,
//               // id: currentSkillInfo.length + 1, 
//             };
//             const updatedSkillsInfo = [...currentSkillInfo, newSkill];
//             skilsInfoAtomdata(updatedSkillsInfo);
//             resetForm();
//           }

//           handleSubmit(values, resetForm);
//           resetForm();

//           handleClose();
//           resetForm();

//         }}
//         validationSchema={validationSchema} // Attach validation schema
//       >
//         {() => {
//           return (
//             <Form>
//               <div className={styles.inputContainer}>
//                 <Input
//                   name="skills"
//                   label="Skill"
//                   placeholder="Enter your skill"
//                   type="text"
//                 />

//                 <section className={styles.buttonGroup}>
//                   <Button
//                     variant="white"
//                     type="button"
//                     text="Cancel"
//                     className={styles.btn}
//                     onClick={handleClose}
//                   />
//                   <Button
//                     variant="green"
//                     type="submit"
//                     text="Save"
//                     className={styles.btn}
//                   />
//                 </section>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </section>
//   );
// };

// export default Skill;



import { Form, Formik, FormikValues } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";

interface ComponentProps {
  handleClose: () => void;
  indexData: string;
  handleSubmit: (values: FormikValues, resetForm: () => void) => void;
}

const Skill: FC<ComponentProps> = ({ indexData, handleClose, handleSubmit }) => {
  const validationSchema = Yup.object().shape({
    skills: Yup.string().required("Skill is required"),
  });

  return (
    <section>
      <Formik
        initialValues={{
          skills: indexData || "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          const currentSkillInfo: string[] = JSON.parse(
            localStorage.getItem("skill-data") ?? "[]"
          );

          let updatedSkillInfo: string[];
          if (indexData) {
            // Update existing skill
            updatedSkillInfo = currentSkillInfo.map((item) =>
              item === indexData ? values.skills : item
            );
          } else {
            // Add a new skill
            updatedSkillInfo = [...currentSkillInfo, values.skills];
          }

          // Save updated data to localStorage
          localStorage.setItem("skill-data", JSON.stringify(updatedSkillInfo));

          handleSubmit(values, resetForm);
          resetForm();
          handleClose();
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <div className={styles.inputContainer}>
              <Input
                name="skills"
                label="Skill"
                placeholder="Enter your skill"
                type="text"
              />

              <section className={styles.buttonGroup}>
                <Button
                  variant="white"
                  type="button"
                  text="Cancel"
                  className={styles.btn}
                  onClick={handleClose}
                />
                <Button
                  variant="green"
                  type="submit"
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

export default Skill;
