import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC, useState } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import Upload from "../../../../../../customs/upload/upload";
import Folder from "../../../../../../assets/folder.svg";

interface ComponentProps {
  handleClose: () => void;
}

const CoverLetter: FC<ComponentProps> = ({ handleClose }) => {
  const [upload, setUpload] = useState<File | null>(null);

  const clearFile = () => {
    setUpload(null);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (!e.target?.files) return;
    const selectedFile = e.target?.files[0];
    setUpload(selectedFile);
    setFieldValue("imageLogo", selectedFile); // Set the file in Formik
  };
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
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <img src={Folder} alt="Folder" />

                    <p className="label">Upload CV</p>
                  </div>

                  <br />

                  {upload ? (
                    <div className="small-gap">
                      {/* <Image /> */}
                      <span>{upload.name}</span>
                      <Button onClick={clearFile} variant="white" text="x" />
                    </div>
                  ) : (
                    <Upload
                      name="imageLogo"
                      // label="Upload CV"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                  )}
                </div>

                <Input
                  name="Cover Letter (Optional)"
                  label="Cover Letter (Optional)"
                  placeholder="Write Cover Letter"
                  type="textarea"
                />

                <div className={styles.buttonGroup}>
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
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default CoverLetter;
