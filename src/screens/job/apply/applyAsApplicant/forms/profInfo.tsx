import { Form, Formik, FormikValues } from "formik";
import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Input from "../../../../../customs/input/input";
import Button from "../../../../../customs/button/button";
import Upload from "../../../../../customs/upload/upload";
import Folder from "../../../../../assets/folder.svg";
import Plus from "../../../../../assets/add.svg";
import File from "../../../../../assets/file-text.svg";
import Delete from "../../../../../assets/deleteicon.svg";
import edit from "../../../../../assets/edit-2.svg";
import { App, Modal, Spin } from "antd";
import EmpHistory from "./modals/employerHistory";
import EducationModal from "./modals/education";
import CoverLetter from "./modals/coverLetter";
import SkillsModal from "./modals/skills";
import JobLinks from "./modals/jobLinks";
import {
  EducationInfoAtom,
  EmploymentHistoryInfoAtom,
  LinkInfoAtom,
  SkilsInfoAtom,
  userAtom,  
} from "../../../../../utils/store";
import { useAtom, useAtomValue } from "jotai";
import { useMutation, useQueries } from "@tanstack/react-query";
import { getApplicantsbyId, ProfInfoApi } from "../../../../request";
import {
  Education,
  EmploymentHistory,
  LinkData,
  SkillsData,
} from "../../../../../utils/type";
import { AxiosError } from "axios";
import ModalContent from "../../../../../partials/successModal/modalContent";
import { routes } from "../../../../../routes";
import { useNavigate } from "react-router-dom";

const ProfInfoForm: FC<{ onPrev: () => void }> = ({ onPrev }) => {
  const [upload, setUpload] = useState<File | null>(null);
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});
  const [indexData, setIndexData] = useState<any>(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const EducationInfoData = useAtomValue(EducationInfoAtom);
  const EmpHistoryInfoData = useAtomValue(EmploymentHistoryInfoAtom);
  const SkillsData = useAtomValue(SkilsInfoAtom);
  const LinksData = useAtomValue(LinkInfoAtom);
  const [user,] = useAtom(userAtom);
  const navigate = useNavigate();

  const { notification } = App.useApp();
  const [uploadMode, setUploadMode] = useState(false); // State to toggle upload interface
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [filePrevieCoverLetterUrl, setFilePreviewCoverLetterUrl] = useState<
    string | null
  >(null);

  // const [emp, setEmp] = useState([] as EmploymentHistory[]);

  const [uploadedCoverLetter, setUploadedCoverLetter] = useState(null);

  // A function to handle the uploaded file
  const handleCoverLetterUpload = (file: any) => {
    setUploadedCoverLetter(file);
  };

  console.log(uploadedCoverLetter, "cover leteer i uploaded");

  const clearLocalStorageData = () => {
    const keysToClear = [
      "cover-letter",
      "education-info",
      "employment-History",
      "link-data",
      "skill-data",
    ];

    keysToClear.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (!e.target?.files) return;
    const selectedFile = e.target.files[0];
    setUpload(selectedFile);
    setFieldValue("cv", selectedFile); // Set the file in Formik

    // Generate a preview URL
    const fileUrl = URL.createObjectURL(selectedFile);
    setFilePreviewUrl(fileUrl);
    setUploadMode(false);
  };

  useEffect(() => {
    if (uploadedCoverLetter) {
      const fileUrl = URL.createObjectURL(uploadedCoverLetter!);
      setFilePreviewCoverLetterUrl(fileUrl);
    }
  }, [uploadedCoverLetter]);

  const handleEdit = (data: any, sectionKey: string) => {
    setIndexData(data);
    setOpenModals((prev) => ({ ...prev, [sectionKey]: true }));
  };

  const handleCloseEdit = (sectionKey: string) => {
    setIndexData(null);
    setOpenModals((prev) => ({ ...prev, [sectionKey]: false }));
  };

  const [getApplicantQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-applicant"],
        queryFn: () => getApplicantsbyId(user?.data?.id!),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const applicantDetailsData = getApplicantQuery?.data?.data?.applicant;
  const applicantDetailsError = getApplicantQuery?.error as AxiosError;
  const applicantDetailsErrorMessage =
    applicantDetailsError?.message ||
    "An error occurred. Please try again later.";

    // useEffect(()=>{
    //   if(getApplicantQuery?.isSuccess && applicantDetailsData){
    //     setUser((prevUser:any) => ({
    //       ...prevUser?.data,
    //       applicantId: applicantDetailsData?.id, 
    //     }));
    //   }
      
    // },[ getApplicantQuery?.isSuccess && applicantDetailsData])

  // useEffect(() => {
  //   // Check if employment history exists and is an array
  //   if (applicantDetailsData?.employment_history) {
  //     setEmp(applicantDetailsData.employment_history);
  //   }
  // }, [applicantDetailsData]);

  const emphistoryToDisplay =
    EmpHistoryInfoData?.length === 0
      ? applicantDetailsData?.employment_history
      : EmpHistoryInfoData;

  const educationToDisplay =
    EducationInfoData?.length === 0
      ? applicantDetailsData?.education
      : EducationInfoData;

  const linksToDisplay =
    LinksData?.length === 0 ? applicantDetailsData?.links : LinksData;

  const coverletterToDisplay = filePrevieCoverLetterUrl
    ? filePrevieCoverLetterUrl
    : applicantDetailsData?.cover_letter_url;

  console.log(filePrevieCoverLetterUrl, "coverletterToDisplay");
  const sections = [
    {
      title: "Employment History",
      key: "employment",
      description:
        "Add your qualifications to showcase your valuable work experiences.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, employment: true })),
      data: EmpHistoryInfoData ?? applicantDetailsData?.employment_history,
      ModalContent: EmpHistory,
      modalTitle: "Add Employment History",
    },
    {
      title: "Education",
      key: "education",
      description: "Add your academic qualifications.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, education: true })),
      data: EducationInfoData,
      ModalContent: EducationModal,
      modalTitle: "Add Education",
    },
    {
      title: "Cover Letter",
      key: "coverLetter",
      description:
        "Share your motivations, and what makes you the best candidate for the job.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, coverLetter: true })),
      // data: CoverLetterData,
      ModalContent: CoverLetter,
      modalTitle: "Upload Or Add Cover Letter",
    },
    {
      title: "Skills",
      key: "skills",
      description:
        "Highlight your skillset to demonstrate your capabilities and strengths in various areas.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, skills: true })),
      data: SkillsData,
      ModalContent: SkillsModal,
      modalTitle: "Add Skills",
    },
    {
      title: "Links",
      key: "links",
      description: "Add your links, social media, portfolio, CV etc.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, links: true })),
      data: LinksData,
      ModalContent: JobLinks,
      modalTitle: "Add Link",
    },
  ];

  const createProfInfoMutation = useMutation({
    mutationFn: ProfInfoApi,
    mutationKey: ["prof-info"],
  });

  const ProfInfoHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();

    // Append simple fields
    const id = user?.data?.id;
    if (id) {
      formData.append("user_id", id.toString()); // Convert id to string and append
    }
    formData.append("cv", upload as File);
    // formData.append("cover_letter", CoverLetterData?.UploadCoverLetter);

    if (uploadedCoverLetter) {
      formData.append("cover_letter", uploadedCoverLetter);
    }

    formData.append("specialization", values?.specialization);

    EmpHistoryInfoData?.forEach((item: EmploymentHistory, index: number) => {
      formData.append(
        `employment_history[${index}][job_title]`,
        item?.job_title
      );
      formData.append(`employment_history[${index}][job_type]`, item?.job_type);
      formData.append(
        `employment_history[${index}][company_name]`,
        item?.company_name
      );
      formData.append(`employment_history[${index}][location]`, item?.location);
      formData.append(
        `employment_history[${index}][work_arrangement]`,
        item?.WorkArrangement
      );
      formData.append(
        `employment_history[${index}][start_date]`,
        item?.start_date
      );
      formData.append(`employment_history[${index}][end_date]`, item?.end_date);
      formData.append(
        `employment_history[${index}][work_summary]`,
        item?.WorkSummary
      );
      formData.append(
        `employment_history[${index}][current_work]`,
        item?.currentWork.toString()
      );
    });

    // Append education history as an array
    EducationInfoData?.forEach((item: Education, index: number) => {
      formData.append(`education[${index}][institution]`, item?.institution);
      formData.append(`education[${index}][degree]`, item?.degree);
      formData.append(
        `education[${index}][field_of_study]`,
        item?.field_of_study
      );
      formData.append(`education[${index}][grade]`, item?.Grade);
      formData.append(`education[${index}][start_date]`, item?.start_date);
      formData.append(`education[${index}][end_date]`, item?.end_date);
      formData.append(
        `education[${index}][still_studying]`,
        item?.stillStudying.toString()
      );
    });

    // Append skills as an array
    SkillsData?.forEach((item: SkillsData, index: number) => {
      formData.append(`skills[${index}]`, item?.skill);
    });

    // Append links as an array
    LinksData?.forEach((item: LinkData, index: number) => {
      formData.append(`links[${index}][type]`, item?.type);
      formData.append(`links[${index}][url]`, item?.url);
    });

    try {
      await createProfInfoMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          resetForm();
          setOpenSuccess(true);
          clearLocalStorageData();
          
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: "An error occurred while submitting your information.",
      });
    }
  };

  const handleSucessPost = () => {
    setOpenSuccess(false);
    navigate(routes?.job?.job);
  };

  return (
    <section>
      {getApplicantQuery?.isLoading ? (
        <Spin />
      ) : getApplicantQuery?.isError ? (
        <h1 className="error">{applicantDetailsErrorMessage}</h1>
      ) : (
      <Formik
        initialValues={{
          cv: "",
          specialization: applicantDetailsData?.specialization || "",
          phoneNumber: "",
          email: "",
        }}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          ProfInfoHandler(values, resetForm);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className={styles.inputContainer}>
              <Input
                name="specialization"
                label="Job Specialization"
                placeholder="Job Specialization"
                type="text"
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <img src={Folder} alt="Folder" />
                <p className="label">Upload CV</p>
              </div>

              {uploadMode === false &&
                (upload || applicantDetailsData?.cv_url) && (
                  <div className={styles.del}>
                    <div className={styles.cv}>
                      {applicantDetailsData?.cv_url && (
                        <a
                          href={
                            filePreviewUrl
                              ? filePreviewUrl
                              : applicantDetailsData?.cv_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={File} alt="File" /> {user?.data?.name}'s Cv{" "}
                        </a>
                      )}
                    </div>
                    <img
                      onClick={() => setUploadMode(true)}
                      src={Delete}
                      alt="Delete"
                    />
                  </div>
                )}
              {uploadMode && (
                <Upload
                  name="cv"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
              )}

              {uploadMode === false  && (
                <Button
                  variant="green"
                  type="button"
                  disabled={false}
                  text="Upload new cv"
                  className={styles.btn}
                  onClick={() => setUploadMode(true)} // Show the upload interface
                />
              )}

              {sections.map((section) => (
                <div key={section.key} className={styles.popUp}>
                  <div className={styles.popUpTitle}>
                    <h3>{section.title}</h3>
                    <div>
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={section.onOpen}
                        src={
                          section.key === "coverLetter" && coverletterToDisplay
                            ? edit
                            : Plus
                        }
                        alt={
                          section.key === "coverLetter" && coverletterToDisplay
                            ? "Edit"
                            : "Add"
                        }
                      />
                    </div>
                  </div>
                  <p>{section.description}</p>
                  {section.key === "employment" &&
                    emphistoryToDisplay &&
                    emphistoryToDisplay?.length && (
                      <div className={styles.card}>
                        {emphistoryToDisplay?.map((item, idx) => (
                          <div className={styles.help} key={idx}>
                            <h4>{item?.company_name}</h4>
                            <img
                              src={edit}
                              alt="edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(item, section.key)}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                  {section.key === "education" &&
                    educationToDisplay &&
                    educationToDisplay.length > 0 && (
                      <div className={styles.card}>
                        {educationToDisplay?.map((item, idx) => (
                          <div className={styles.help} key={idx}>
                            <h4>{item?.institution}</h4>
                            <img
                              src={edit}
                              alt="edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(item, section.key)}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                  {section.key === "coverLetter" && coverletterToDisplay && (
                    <div className={styles.card}>
                      {/* <p>{CoverLetterData?.CoverLetter}</p> */}
                      {coverletterToDisplay && (
                        <a href={coverletterToDisplay}> view Cover Letter</a>
                      )}
                    </div>
                  )}

                  {section.key === "skills" && SkillsData?.length > 0 && (
                    <div className={styles.card}>
                      {SkillsData &&
                        SkillsData?.map((item, idx) => (
                          <div className={styles.help} key={idx}>
                            <h4>{item?.skill}</h4>
                            <img
                              src={edit}
                              alt="edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(item, section.key)}
                            />
                          </div>
                        ))}
                    </div>
                  )}

                  {section.key === "links" &&
                    linksToDisplay &&
                    linksToDisplay?.length > 0 && (
                      <div className={styles.card}>
                        {linksToDisplay?.map((item, idx) => (
                          <div className={styles.help} key={idx}>
                            <h4>{item?.type}</h4>
                            <img
                              src={edit}
                              alt="edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEdit(item, section.key)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  <Modal
                    open={!!openModals[section.key]}
                    onCancel={() => handleCloseEdit(section.key)}
                    centered
                    title={section.modalTitle}
                    footer={null}
                  >
                    <section.ModalContent
                      handleClose={() => handleCloseEdit(section.key)}
                      indexData={indexData}
                      onUpload={handleCoverLetterUpload}
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
                text={createProfInfoMutation?.isPending ? "loading" : "Save"}
                disabled={createProfInfoMutation?.isPending}
                className={styles.btn}
              />
            </section>
          </Form>
        )}
      </Formik>
       )} 
             <ModalContent
        open={openSuccess}
        handleCancel={() => handleSucessPost()}
        handleClick={() => {
          handleSucessPost();
        }}
        heading={'Details Saved Successfully'}
        text="Your details has been saved as an appplicant, you can now apply for jobs easily"
      />
    </section>
  );
};

export default ProfInfoForm;
