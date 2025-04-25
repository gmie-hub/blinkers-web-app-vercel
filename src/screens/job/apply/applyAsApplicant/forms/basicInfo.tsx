import {
  Form,
  Formik,
  FormikValues,
} from "formik";
import styles from "./styles.module.scss";
import { FC,  useState } from "react";
import * as Yup from "yup";
import Input from "../../../../../customs/input/input";
import Button from "../../../../../customs/button/button";
import { App } from "antd";
import Camera from "../../../../../assets/camera.svg";
import Profile from "../../../../../assets/Avatarprofile.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorMessage } from "../../../../../utils/errorMessage";
import { basicInfoApi } from "../../../../request";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../../../utils/store";

interface ComponentProps {
  handleNext: () => void;
  applicantDetailsData?: UserData | undefined;
}

const BasicInfoForm: FC<ComponentProps> = ({
  handleNext,
  applicantDetailsData,
}) => {
  // const basicInfoFormData = useSetAtom(EducationInfoAtom);
  const { notification } = App.useApp();
  const [profileImage, setProfileImage] = useState<any>(null);
  const user = useAtomValue(userAtom);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For preview
  const queryClient = useQueryClient();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (!e.target?.files) return;
    const selectedFile = e.target?.files[0];

    // Define valid file types
    const validFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];

    // Validate if the file type is valid
    if (!validFileTypes.includes(selectedFile.type)) {
      notification.error({
        message: "Invalid File Type",
        description:
          "The logo field must be a file of type: jpg, jpeg, png, gif, docx, doc, ppt.",
      });
      return;
    }
    setFieldValue("profile_image", selectedFile);
    setProfileImage(selectedFile);
    setPreviewImage(URL.createObjectURL(selectedFile)); // Generate preview URL

  };

  console.log(applicantDetailsData);

  const basicInfoMutation = useMutation({
    mutationFn: basicInfoApi,
  });

  const basicInfoHandler = async (
    values: FormikValues,
  ) => {
    const formData = new FormData();

    formData.append("name", values?.name);
    formData.append("date_of_birth", values?.date_of_birth);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    formData.append("_method", "patch");

    try {
      await basicInfoMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          setProfileImage(null);
          queryClient.refetchQueries({
            queryKey: ["get-all-jobs"],
          });
          handleNext();
        },
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
      
      setProfileImage(null);
    }
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    // last_name: Yup.string().required("required"),
    date_of_birth: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("required"),
  });
  
  return (
    <section>
      <Formik
        initialValues={{
          name: applicantDetailsData?.name || "dd",
          // last_name: "",
          date_of_birth: applicantDetailsData?.date_of_birth || "",
          email: user?.email || "",
          phoneNumber: user?.number || "",
        }}
        onSubmit={(values, ) => {
          basicInfoHandler(values, );
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <div className={styles.abs}>
                  <img
                    src={previewImage ? previewImage : applicantDetailsData?.profile_image  || Profile }
                    alt="profile"
                    className={styles.profile}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  />
                  <img
                    src={Camera}
                    alt="Camera"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  />
                </div>
                <input
                  name="profile_image"
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />

                <Input
                  name="name"
                  label="Name"
                  // placeholder="Olajumoke"
                  type="text"
                />

                {/* <Input
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                /> */}
                <Input
                  label="Date of Birth"
                  placeholder="Last Name"
                  name="date_of_birth"
                  type="date"
                />
                {/* <div style={{ display: "flex", gap: "0.8rem" }}>
                  <img src={Info} alt="Info" />
                  <p>Your last name is your surname</p>
                </div> */}

                <Input
                  name="email"
                  // placeholder="jum@gmail.com"
                  label="Email Address"
                  type="email"
                  disabled={true}
                />
                <Input
                  name="phoneNumber"
                  // placeholder="jum@gmail.com"
                  label="Phone Number"
                  type="text"
                  disabled={true}
                />
                {/* 
                <div style={{ marginBlockStart: "2rem" }}>
                  <p className="label">Phone Number</p>

                  <Field
                    name="phoneNumber"
                    render={({ form }: FieldProps) => (
                      <PhoneInput
                        country={"ng"} // Default country
                        value={`${countryCode}${phoneNumber}`} // Concatenate the country code and phone number
                        onChange={(phone: string, country: CountryData) => {
                          const dialCode = country.dialCode; // Extract the dialCode from the country object
                          const number = phone.replace(dialCode, "").trim(); // Remove the dial code from the phone number

                          setCountryCode(dialCode); // Update country code state
                          setPhoneNumber(number); // Update phone number state
                          form.setFieldValue("phoneNumber", number); // Update Formik state
                          form.setFieldValue("country_code", dialCode); // Update Formik country_code field
                        }}
                        inputStyle={{ width: "100%" }}
                        preferredCountries={["ng", "gb", "gh", "cm", "lr"]}
                        onlyCountries={["ng", "gb", "gh", "cm", "lr"]}
                        placeholder="Enter phone numer"
                      />
                    )}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div> */}

                <section className={styles.buttonGroup}>
                  <Button
                    variant="green"
                    type="submit"
                    disabled={basicInfoMutation?.isPending}
                    text={
                      basicInfoMutation?.isPending
                        ? "loading..."
                        : "Save & Continue"
                    }
                    className={styles.btn}
                  />
                  <Button
                    variant="transparent"
                    type="button"
                    text={"Continue"}
                    className={styles.btn}
                    onClick={handleNext}
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

export default BasicInfoForm;
