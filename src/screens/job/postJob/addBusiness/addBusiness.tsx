import styles from "./styles.module.scss";
import Card from "../../../../customs/card/card";
import RouteIndicator from "../../../../customs/routeIndicator";
import { Form, Formik } from "formik";
import Button from "../../../../customs/button/button";
import Input from "../../../../customs/input/input";
import { useState } from "react";
import Folder from "../../../../assets/folder.svg";
import Upload from "../../../../customs/upload/upload";
import ModalContent from "../../../../partials/successModal/modalContent";

const AddBusiness = () => {
  const [upload, setUpload] = useState<File | null>(null);
  const [openSuccess,setOpenSuccess] =useState(false)

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
    <div className={styles.wrapper}>
      <RouteIndicator />
      <Card style={styles.card}>
        <section className={styles.textContainer}>
          <div>
            <p>Add Business To Directory</p>
            <p>
              Fill in the details to add your business to the directory. After
              verification, you can now edit, post jobs and update your business
              information.
            </p>
          </div>
        </section>

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
            }}
            // validationSchema={validationSchema}
          >
            {({ setFieldValue }) => {
              return (
                <Form>
                  <div className={styles.inputContainer}>
                    <Input
                      name="Business Name"
                      label="Business Name"
                      placeholder="Business Name"
                      type="text"
                    />
                    <Input
                      name="Business Address"
                      label="Business Address"
                      placeholder="Business Address"
                      type="text"
                    />
                    <Input
                      name="About Business"
                      label="About Business"
                      placeholder="About Business"
                      type="textarea"
                    />
                    <div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <img src={Folder} alt="Folder" />

                        <p>
                          Upload a document to prove that you’re the owner of
                          this business (CAC, Business letterhead etc.)
                        </p>
                      </div>

                      <br />

                      {upload ? (
                        <div className="small-gap">
                          {/* <Image /> */}
                          <span>{upload.name}</span>
                          <Button
                            onClick={clearFile}
                            variant="white"
                            text="x"
                          />
                        </div>
                      ) : (
                        <Upload
                          name="imageLogo"
                          // label="Upload CV"
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                        />
                      )}
                    </div>

                    <div className={styles.buttonGroup}>
                      <Button
                        variant="green"
                        type="submit"
                        disabled={false}
                        text="Submit Form"
                        className={styles.btn}
                        onClick={()=>setOpenSuccess(true)}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </section>
        
      </Card>

      <ModalContent
        open={openSuccess}
        handleCancel={() => setOpenSuccess(false)}
        handleClick={() => {
          setOpenSuccess(false);
        }}
        heading={"Business Added Successfully"}
        text="We’ve received your details and once we verify it, you will be able to post jobs. We will contact you via email."
      />
    </div>
  );
};

export default AddBusiness;
