import { Form, Formik, FormikValues } from "formik";
import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Input from "../../../../../customs/input/input";
import Button from "../../../../../customs/button/button";
import Upload from "../../../../../customs/upload/upload";
import Folder from "../../../../../assets/folder.svg";
import Plus from "../../../../../assets/add.svg";
import Delete from "../../../../../assets/deleteicon.svg";
import edit from "../../../../../assets/edit-2.svg";
import { App, Modal } from "antd";
import * as Yup from "yup";
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
import { useAtom } from "jotai";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
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
import CustomSpin from "../../../../../customs/spin";
import api from "../../../../../utils/apiClient";

interface Payload {
  skills?: SkillsData[];
  jobLink?: LinkData[];
  Education?: Education[];
  EmpHistory?: EmploymentHistory[];
  coverLetter?: any;
}

const ProfInfoForm: FC<{ onPrev: () => void }> = ({ onPrev }) => {
  const [upload, setUpload] = useState<File | null>(null);
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});
  const [indexData, setIndexData] = useState<any>(null);
  const [index, setIndex] = useState<number>(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [educationInfoData, setEducationInfoData] = useAtom(EducationInfoAtom);
  const [empHistoryInfoData, setEmpHistoryInfoData] = useAtom(
    EmploymentHistoryInfoAtom
  );
  const [skillsData, setSkillsData] = useAtom(SkilsInfoAtom);
  const [linksData, setLinkData] = useAtom(LinkInfoAtom);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllEmploymentHistory, setShowAllEmploymentHistory] =
    useState(false);

  const { notification } = App.useApp();
  const [uploadMode, setUploadMode] = useState(false); // State to toggle upload interface
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [filePrevieCoverLetterUrl, setFilePreviewCoverLetterUrl] = useState<
    string | null
  >(null);

  const queryClient = useQueryClient();
  // const [emp, setEmp] = useState([] as EmploymentHistory[]);

  const [uploadedCoverLetter, setUploadedCoverLetter] = useState(null);

  // A function to handle the uploaded file
  const handleCoverLetterUpload = (file: any) => {
    setUploadedCoverLetter(file);
  };

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

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/gif",
    ];
    if (!validImageTypes.includes(selectedFile.type)) {
      notification.error({
        message: "Invalid File Type",
        description:
          "Please upload a valid file. Supported formats include: JPEG, PNG, JPG, PDF, DOC, DOCX, TXT, GIF.",
      });
      return;
    }

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

  const handleEdit = (data: any, sectionKey: string, index: number) => {
    setIndexData(data);
    setOpenModals((prev) => ({ ...prev, [sectionKey]: true }));
    setIndex(index);
  };

  const handleCloseEdit = (sectionKey: string) => {
    setIndexData(null);
    setOpenModals((prev) => ({ ...prev, [sectionKey]: false }));
  };

  const [getApplicantQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-applicant"],
        queryFn: () => getApplicantsbyId(user?.id!),
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

  useEffect(() => {
    // if (
    //   (user?.is_applicant && getApplicantQuery?.isFetched) ||
    //   (user?.is_applicant && getApplicantQuery?.isSuccess)
    // ) {
      if (
        user?.is_applicant &&
        (getApplicantQuery?.isFetched && getApplicantQuery?.isSuccess)
      ) {
      setLinkData(applicantDetailsData?.links || []);
      setSkillsData(applicantDetailsData?.skills || []);
      setEducationInfoData(applicantDetailsData?.education || []);
      setEmpHistoryInfoData(applicantDetailsData?.employment_history || []);
    }
  }, [
    user?.is_applicant,
    getApplicantQuery?.isFetched,
    getApplicantQuery?.isSuccess,
    applicantDetailsData,
  ]);

  const emphistoryToDisplay =
    empHistoryInfoData?.length === 0
      ? applicantDetailsData?.employment_history
      : empHistoryInfoData;

  const educationToDisplay =
    educationInfoData?.length === 0
      ? applicantDetailsData?.education
      : educationInfoData;

  const linksToDisplay =
    linksData?.length === 0 ? applicantDetailsData?.links : linksData;

  const skillsToDisplay =
    skillsData?.length === 0 ? applicantDetailsData?.skills : skillsData;

  const coverletterToDisplay = filePrevieCoverLetterUrl
    ? filePrevieCoverLetterUrl
    : applicantDetailsData?.cover_letter_url;

  const sections = [
    {
      title: "Employment History",
      key: "employment",
      description:
        "Add your qualifications to showcase your valuable work experiences.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, employment: true })),
      data: empHistoryInfoData ?? applicantDetailsData?.employment_history,
      ModalContent: EmpHistory,
      modalTitle: "Add Employment History",
    },
    {
      title: "Education",
      key: "education",
      description: "Add your academic qualifications.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, education: true })),
      data: educationInfoData,
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
      data: skillsData,
      ModalContent: SkillsModal,
      modalTitle: "Add Skills",
    },
    {
      title: "Links",
      key: "links",
      description: "Add your links, social media, portfolio, CV etc.",
      onOpen: () => setOpenModals((prev) => ({ ...prev, links: true })),
      data: linksData,
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
    const id = user?.id;
    if (id) {
      formData.append("user_id", id?.toString()); // Convert id to string and append
    }
    formData.append("cv", upload as File);
    // formData.append("cover_letter", CoverLetterData?.UploadCoverLetter);

    if (uploadedCoverLetter) {
      formData.append("cover_letter", uploadedCoverLetter);
    }

    formData.append("specialization", values?.specialization);

    empHistoryInfoData?.forEach((item: EmploymentHistory, index: number) => {
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
        `employment_history[${index}].employment_type]`,
        item?.employment_type
      );
      formData.append(
        `employment_history[${index}][start_date]`,
        item?.start_date
      );
      formData.append(`employment_history[${index}][end_date]`, item?.end_date);
      formData.append(
        `employment_history[${index}][summary]`,
        item?.summary
      );
      formData.append(
        `employment_history[${index}][current_work]`,
        item?.current_work?.toString()
      );
    });

    // Append education history as an array
    educationInfoData?.forEach((item: Education, index: number) => {
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
        `education[${index}][studying]`,
        item?.studying?.toString()
      );
    });

    // Append skills as an array
    skillsData?.forEach((item: SkillsData, index: number) => {
      formData.append(`skills[${index}]`, item?.skills);
    });

    // Append links as an array
    linksData?.forEach((item: LinkData, index: number) => {
      formData.append(`links[${index}][type]`, item?.type);
      formData.append(`links[${index}][url]`, item?.url);
    });

    try {
      await createProfInfoMutation.mutateAsync(formData, {
        onSuccess: () => {
          resetForm();
          setOpenSuccess(true);
          clearLocalStorageData();
          queryClient.refetchQueries({
            queryKey: ["get-applicant"],
          });
          setUser((prevUser: any) => ({
            ...prevUser,
            is_applicant: true,
          }));
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: "An error occurred while submitting your information.",
      });
      setUser((prevUser: any) => ({
        ...prevUser,
        is_applicant: false,
      }));
    }
  };

  const UpdateProfInfoApi = async (payload: any) => {
    return (
      await api.post(`/applicants/${applicantDetailsData?.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    )?.data;
  };

  const EditProfInfoMutation = useMutation({
    mutationFn: UpdateProfInfoApi,
    mutationKey: ["update-info"],
  });

  const updateInfoHandler = async (values: FormikValues, data: Payload) => {
    // Create a plain object to store the data

    console.log(values);

    const payload: Record<string, any> = {
      specialization: values?.specialization,
      employment_history: [],
      education: [],
      skills: [],
      links: [],
      id: user?.id || null,
      name: user?.name || null,
      _method: "patch",
    };

    // Append employment history
    data?.EmpHistory?.forEach((item: EmploymentHistory) => {
      payload.employment_history.push({
        job_title: item?.job_title,
        job_type: item?.job_type,
        company_name: item?.company_name,
        location: item?.location,
        employment_type: item?.employment_type,
        start_date: item?.start_date,
        end_date: item?.end_date,
        summary: item?.summary,
        current_work: item?.current_work  ? 1 : 0,
      });
    });

    // Append education history
    data?.Education?.forEach((item: Education) => {
      payload.education.push({
        institution: item?.institution,
        degree: item?.degree,
        field_of_study: item?.field_of_study,
        grade: item?.Grade,
        start_date: item?.start_date,
        end_date: item?.end_date,
        studying: item?.studying ? 1 : 0,
      });
    });

    // Append skills
    data?.skills?.forEach((item: any) => {
      const skills = item?.skills || item;
      payload.skills.push(skills);
    });

    // Append links
    data?.jobLink?.forEach((item: LinkData) => {
      payload.links.push({
        type: item?.type,
        url: item?.url,
      });
    });

    // Add uploaded files if available
    if (upload) {
      payload.cv = upload;
    }

    if (uploadedCoverLetter) {
      payload.cover_letter = uploadedCoverLetter;
    }

    if (!applicantDetailsData) return;

    try {
      await EditProfInfoMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          // clearLocalStorageData()
          queryClient.refetchQueries({
            queryKey: ["get-applicant"],
          });
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

  const validationSchema = Yup.object().shape({
    cv: Yup.mixed().required("Cover letter is required"),
    specialization: Yup.string().required("required"),
  });

  return (
    <section>
      {getApplicantQuery?.isLoading ? (
        <CustomSpin />
      ) : getApplicantQuery?.isError ? (
        <h1 className="error">{applicantDetailsErrorMessage}</h1>
      ) : (
        <Formik
          initialValues={{
            cv: applicantDetailsData?.cv_url || "",
            specialization: applicantDetailsData?.specialization || "",
          }}
          enableReinitialize={true}
          onSubmit={(values, { resetForm }) => {
            applicantDetailsData !== null
              ? updateInfoHandler(values, {})
              : ProfInfoHandler(values, resetForm);
          }}
          validationSchema={validationSchema}
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
                        {/* {upload?.name ||applicantDetailsData?.cv_url && ( */}
                        <a
                          href={
                            filePreviewUrl
                              ? filePreviewUrl
                              : applicantDetailsData?.cv_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user?.name}'s Cv
                          {/* <img src={File} alt="File" /> {user?.data?.name}'s Cv{" "} */}
                        </a>
                        {/* )} */}
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

                {uploadMode === false && (
                  <Button
                    variant="white"
                    type="button"
                    disabled={false}
                    text="Upload new cv"
                    className={styles.btn}
                    onClick={() => setUploadMode(true)} // Show the upload interface
                  />
                )}

                {sections?.map((section) => (
                  <div key={section.key} className={styles.popUp}>
                    <div className={styles.popUpTitle}>
                      <h3>{section.title}</h3>
                      <div>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={section.onOpen}
                          src={
                            section.key === "coverLetter" &&
                            coverletterToDisplay
                              ? edit
                              : Plus
                          }
                          alt={
                            section.key === "coverLetter" &&
                            coverletterToDisplay
                              ? "Edit"
                              : "Add"
                          }
                        />
                      </div>
                    </div>
                    {applicantDetailsData === null && (
                      <p>{section.description}</p>
                    )}{" "}
                    {section.key === "employment" &&
                      emphistoryToDisplay &&
                      emphistoryToDisplay?.length > 0 && (
                        <div className={styles.card}>
                          {(showAllEmploymentHistory
                            ? emphistoryToDisplay
                            : emphistoryToDisplay?.slice(0, 2)
                          )?.map((item, idx) => (
                            <div className={styles.help} key={idx}>
                              <h4>{item?.company_name}</h4>
                              <img
                                src={edit}
                                alt="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleEdit(item, section.key, idx)
                                }
                              />
                            </div>
                          ))}

                          {emphistoryToDisplay.length > 2 && (
                            <Button
                              variant="white"
                              type="button"
                              text={
                                showAllEmploymentHistory
                                  ? "Show less"
                                  : "View All"
                              }
                              className={styles.btn}
                              onClick={() =>
                                setShowAllEmploymentHistory(
                                  !showAllEmploymentHistory
                                )
                              }
                            />
                          )}
                        </div>
                      )}
                    {section.key === "education" &&
                      educationToDisplay &&
                      educationToDisplay.length > 0 && (
                        <div className={styles.card}>
                          {(showAllEducation
                            ? educationToDisplay
                            : educationToDisplay?.slice(0, 2)
                          )?.map((item, idx) => (
                            <div className={styles.help} key={idx}>
                              <h4>{item?.institution}</h4>
                              <img
                                src={edit}
                                alt="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleEdit(item, section.key, idx)
                                }
                              />
                            </div>
                          ))}

                          {educationToDisplay?.length > 2 && (
                            <Button
                              variant="white"
                              type="button"
                              text={showAllEducation ? "Show less" : "View All"}
                              className={styles.btn}
                              onClick={() =>
                                setShowAllEducation(!showAllEducation)
                              }
                            />
                          )}
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
                    {section.key === "skills" &&
                      skillsToDisplay?.length > 0 && (
                        <div className={styles.card}>
                          {(showAllSkills
                            ? skillsToDisplay
                            : skillsToDisplay?.slice(0, 2)
                          )?.map((item: any, index: number) => (
                            <div className={styles.help} key={index}>
                              <h4>{item}</h4>
                              <img
                                src={edit}
                                alt="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleEdit(item, section.key, index)
                                }
                              />
                            </div>
                          ))}
                          {skillsToDisplay.length > 2 && (
                            <Button
                              variant="white"
                              type="button"
                              text={showAllSkills ? "Show less" : "View All"}
                              className={styles.btn}
                              onClick={() => setShowAllSkills(!showAllSkills)}
                            />
                          )}
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
                                onClick={() =>
                                  handleEdit(item, section.key, idx)
                                }
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
                        index={index}
                        onUpload={handleCoverLetterUpload}
                        handleSubmit={updateInfoHandler}
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
                  text={
                    applicantDetailsData &&
                    (applicantDetailsData !== null ||
                      applicantDetailsData !== undefined)
                      ? EditProfInfoMutation?.isPending
                        ? "Updating"
                        : "Update"
                      : createProfInfoMutation?.isPending
                      ? "Saving"
                      : "Save"
                  }
                  disabled={
                    createProfInfoMutation?.isPending ||
                    EditProfInfoMutation?.isPending
                  }
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
        heading={"Details Saved Successfully"}
        text="Your details has been saved as an appplicant, you can now apply for jobs easily"
      />
    </section>
  );
};

export default ProfInfoForm;
