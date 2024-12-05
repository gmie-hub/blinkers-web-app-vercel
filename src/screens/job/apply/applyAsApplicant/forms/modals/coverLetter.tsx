  import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC, useState, } from "react";
import Button from "../../../../../../customs/button/button";
import Upload from "../../../../../../customs/upload/upload";
import Folder from "../../../../../../assets/folder.svg";
import { CoverLetter } from "../../../../../../utils/type";
import { useAtom, useSetAtom } from "jotai";
import { CoverLetterInfoAtom } from "../../../../../../utils/store";

interface ComponentProps {
  handleClose: () => void;
  indexData: CoverLetter ; // Allow null for new entries
  onUpload:any
}

const CoverLetterPage: FC<ComponentProps> = ({ handleClose, indexData, onUpload }) => {
  const [upload, setUpload] = useState<File | null>(null);
  const [coverLetterData] = useAtom(CoverLetterInfoAtom);
  const setCoverLetterData = useSetAtom(CoverLetterInfoAtom);

  
  
  // useEffect(() => {
  //   // Set initial upload state if indexData exists
  //   if (coverLetterData?.UploadCoverLetter) {
  //     setUpload(coverLetterData.UploadCoverLetter);
  //   }
  // }, [coverLetterData]);

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
    setFieldValue("UploadCoverLetter", selectedFile); // Set the file in Formik
    onUpload(selectedFile)
  };

  // const convertToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result as string); // Resolve with base64 string
  //     reader.onerror = () => reject(new Error("File reading failed"));
  //     reader.readAsDataURL(file); // Convert file to base64
  //   });
  // };

  // const saveToLocalStorage = (key: string, value: any) => {
  //   try {
  //     localStorage.setItem(key, JSON.stringify(value));
  //   } catch (error) {
  //     console.error(`Failed to save ${key} to localStorage`, error);
  //   }
  // };

  console.log(indexData)
  return (
    <section>
      <Formik
        initialValues={{
          // CoverLetter: coverLetterData?.CoverLetter || "", // Existing cover letter or empty
          UploadCoverLetter: coverLetterData?.UploadCoverLetter || "", // Existing file or empty
        }}
        enableReinitialize={true} 

        onSubmit={async (values) => {
          let base64File = null;

          // Convert uploaded file to base64 if new file exists
          // if (upload) {
          //   try {
          //     base64File = await convertToBase64(upload);
          //   } catch (error) {
          //     console.error("Error converting file to base64", error);
          //   }
          // }

          const updatedData = {
            ...coverLetterData,
            // CoverLetter: values.CoverLetter,
            UploadCoverLetter: base64File || values.UploadCoverLetter, // Use base64 or existing data
          };

          // Save to atom and localStorage
          setCoverLetterData(updatedData);
          // saveToLocalStorage("CoverLetterData", updatedData);

          handleClose(); // Close the form
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className={styles.inputContainer}>
              <div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <img src={Folder} alt="Folder" />
                  <p className="label">Upload Cover Letter (Optional)</p>
                </div>
                <br />
                {upload ? (
              
                  <div style={{display:'flex', gap:'2rem', justifyContent:'space-between'}}>
                    <p>{upload.name}</p>

                    <span  onClick={clearFile} >X</span>

                  </div>
                ) : (
                  <Upload
                    name="UploadCoverLetter"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                )}
              </div>

              {/* <Input
                name="CoverLetter"
                label="Cover Letter (Optional)"
                placeholder="Write Cover Letter"
                type="textarea"
              /> */}

              <div className={styles.buttonGroup}>
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CoverLetterPage;
