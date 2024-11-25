// import { Form, Formik } from "formik";
// import styles from "../styles.module.scss";
// import { FC } from "react";
// // import * as Yup from "yup";
// import Input from "../../../../../../customs/input/input";
// import Button from "../../../../../../customs/button/button";
// import Select from "../../../../../../customs/select/select";
// import Checkbox from "../../../../../../customs/checkBox/checkbox";

// // interface ComponentProps {
// //   handleClose: () => void;
// // }

// interface ComponentProps {
//     handleClose: () => void;
//     editingId: any; // Accept the editingId prop here
//   }
  
  
// const Education: FC<ComponentProps> = ({ handleClose , editingId}) => {
//     console.log(editingId)


//     useEffect(() => {
//         if (editingId) {
//           setInitialValues({
//             Instituition: editingId?.title || "",  // Set title as the institution name
//             lastName: "", // You can replace this with real data if needed
//             phoneNumber: "", // Replace with real data if needed
//             email: "", // Replace with real data if needed
//           });
//         }
//       }, [editingId]);
//   return (
//     <section>
//       <Formik
//         initialValues={{
//             Instituition: editingId?.title ||  "",
//           lastName: "",
//           phoneNumber: "",
//           email: "",
//         }}
//         onSubmit={(values) => {
//           console.log(values);
//           handleClose();
//         }}
//         // validationSchema={validationSchema}
//       >
//         {({ handleChange }) => {
//           return (
//             <Form>
//               <div className={styles.inputContainer}>
//                 <Input
//                   name="Instituition"
//                   label="Name of Instituition"
//                   placeholder="Name of Instituition"
//                   type="text"
//                 />

//                 <Select
//                   name="Degree"
//                   label="Degree"
//                   placeholder=" Select option"
//                   options={[]}
//                   onChange={handleChange}
//                 />

//                 <Input
//                   label="Field of Study"
//                   placeholder="what did you study"
//                   name="Field of Study"
//                   type="text"
//                 />
//                 <Select
//                   name="Grade"
//                   label="Grade"
//                   placeholder=" Select option"
//                   options={[]}
//                   onChange={handleChange}
//                 />

//                 <Input
//                   name="startDate"
//                   placeholder="Start Date"
//                   label="Start Date"
//                   type="date"
//                 />
//                 <Input
//                   name="EndDate"
//                   placeholder="End Date"
//                   label="End Date"
//                   type="date"
//                 />

//                 <Checkbox label={"I am still studying"} name="Current" />

//                 <section className={styles.buttonGroup}>
//                   <Button
//                     variant="white"
//                     type="submit"
//                     disabled={false}
//                     text="Cancel"
//                     className={styles.btn}
//                   />
//                   <Button
//                     variant="green"
//                     type="submit"
//                     disabled={false}
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

// export default Education;



import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC, useEffect, useState } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Select from "../../../../../../customs/select/select";
import Checkbox from "../../../../../../customs/checkBox/checkbox";

// interface ComponentProps {
//   handleClose: () => void;
// }

interface ComponentProps {
  handleClose: () => void;
  editingId: any; // Accept the editingId prop here
}

const Education: FC<ComponentProps> = ({ handleClose, editingId }) => {
  const [initialValues] = useState({
    Instituition:editingId?.title || "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });


  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          handleClose();
        }}
      >
        {({ handleChange }) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="Instituition"
                  label="Name of Instituition"
                //   placeholder={editingId?.tit}
                  type="text"
                />

                <Select
                  name="Degree"
                  label="Degree"
                  placeholder=" Select option"
                  options={[]}
                  onChange={handleChange}
                />

                <Input
                  label="Field of Study"
                  placeholder="what did you study"
                  name="Field of Study"
                  type="text"
                />
                <Select
                  name="Grade"
                  label="Grade"
                  placeholder=" Select option"
                  options={[]}
                  onChange={handleChange}
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

                <Checkbox label={"I am still studying"} name="Current" />

                <section className={styles.buttonGroup}>
                  <Button
                    variant="white"
                    type="button"
                    onClick={handleClose}  // Close modal when clicked
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

export default Education;
