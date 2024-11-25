import { Form, Formik } from "formik";
import styles from "./styles.module.scss";
import { FC, useState } from "react";
import Input from "../../../../../customs/input/input";
import Button from "../../../../../customs/button/button";
import Upload from "../../../../../customs/upload/upload";
import Folder from "../../../../../assets/folder.svg";
import Plus from "../../../../../assets/add.svg";
import edit from "../../../../../assets/edit-2.svg";
import { Modal } from "antd";
import EmpHistory from "./modals/employerHistory";
import Education from "./modals/education";
import CoverLetter from "./modals/coverLetter";
import Skills from "./modals/skills";
import JobLinks from "./modals/jobLinks";
import ModalContent from "../../../../../partials/successModal/modalContent";

interface ComponentProps {
  onPrev: () => void;
}


const ProfInfoForm: FC<ComponentProps> = ({ onPrev }) => {
  const [upload, setUpload] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState<string>("");
  const [editingId, setEditingId] = useState<any>(null);  // Update type to `any` or your specific type for editingId
  const [openSuccess, setOpenSuccess] =useState(false)
  const clearFile = () => setUpload(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
    if (!e.target?.files) return;
    const selectedFile = e.target?.files[0];
    setUpload(selectedFile);
    setFieldValue("imageLogo", selectedFile);
  };

  const handleEdit = (data: any, sectionTitle: string) => {
    setEditingId(data); // Store the ID of the item being edited
    setOpenModal(sectionTitle); // Open the modal based on the section title (e.g., "education")
    console.log(data);
  };

  // Mock data arrays for each section
  const educationData = [
    { id: 1, title: "BSc in Computer Science", description: "University of X" },
    { id: 2, title: "MSc in AI", description: "University of Y" },
  ];

  const sections = [
    {
      title: "Employment history",
      description: "Add your qualifications to showcase your valuable work experiences.",
      onOpen: () => setOpenModal("employment"),
      data: [], // Add mock data here if needed
      ModalContent: EmpHistory,
      modalTitle: "Add Employment History",
    },
    {
      title: "Education",
      description: "Add your academic qualifications.",
      onOpen: () => setOpenModal("education"),
      data: educationData,
      ModalContent: Education,
      modalTitle: "Add Education",
    },
    {
      title: "Cover Letter",
      description: "Share your motivations, and what makes you the best candidate for the job.",
      onOpen: () => setOpenModal("coverLetter"),
      data: [], // Add mock data here if needed
      ModalContent: CoverLetter,
      modalTitle: "Upload Or Add Cover letter",
    },
    {
      title: "Skills",
      description: "Highlight your skillset to demonstrate your capabilities and strengths in various areas.",
      onOpen: () => setOpenModal("skills"),
      data: [],
      ModalContent: Skills,
      modalTitle: "Add Skills",
    },
    {
      title: "Links",
      description: "Add your links, social media, portfolio, CV etc.",
      onOpen: () => setOpenModal("links"),
      data: [], // Add mock data here if needed
      ModalContent: JobLinks,
      modalTitle: "Add Link",
    },
  ];

  return (
    <section>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className={styles.inputContainer}>
              <Input
                name="Specialization"
                label="Job Specialization"
                placeholder="Job Specialization"
                type="text"
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <img src={Folder} alt="Folder" />
                <p className="label">Upload CV</p>
              </div>
              {upload ? (
                <div className="small-gap">
                  <span>{upload.name}</span>
                  <Button onClick={clearFile} variant="white" text="x" />
                </div>
              ) : (
                <Upload
                  name="imageLogo"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
              )}
              { upload?.name &&
                <div>
                  <Button
                variant="white"
                type="button"
                text="Upload New CV"
                className={styles.btn}
                onClick={onPrev}
              />
                </div>
                
              }
              {sections.map((section, index) => (
                <div key={index} className={styles.popUp}>
                  <div>
                    <h3>{section.title}</h3>
                    <div>
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={section.onOpen}
                        src={Plus}
                        alt="Plus"
                      />
                    </div>
                  </div>
                  <p>{section.description}</p>
                  {/* Map through the section's data */}
                  {section.data.length > 0 &&
                    section.data.map((item) => (
                      <div key={item.id} className={styles.card}>
                        <h4>{item.title}</h4>
                        <img
                          src={edit}
                          alt="edit"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(item, section.title.toLowerCase())}  
                        />
                      </div>
                    ))}
                  <Modal
                    open={openModal === section.title.toLowerCase()}
                    onCancel={() => setOpenModal("")}
                    centered
                    title={section.modalTitle}
                    footer={null}
                  >
                    <section.ModalContent
                      handleClose={() => setOpenModal("")}
                      editingId={editingId}  // Pass editingId as prop
                    />
                  </Modal>
                </div>
              ))}
            </div>
            <section className={styles.buttonGroup}>
              <Button
                variant="white"
                type="button"
                text="Previous"
                className={styles.btn}
                onClick={onPrev}
              />
              <Button
                variant="green"
                type="submit"
                text="Save"
                className={styles.btn}

                onClick={()=>setOpenSuccess(true)}
              />
            </section>
          </Form>
        )}
      </Formik>

      <ModalContent
        open={openSuccess}
        handleCancel={() => setOpenSuccess(false)}
        handleClick={() => {
          setOpenSuccess(false);
        }}
        heading="Details Saved Successfully"
        text={"Your details has been saved as an appplicant, you can now apply for jobs easily"}
      />

    </section>
  );
};

export default ProfInfoForm;


