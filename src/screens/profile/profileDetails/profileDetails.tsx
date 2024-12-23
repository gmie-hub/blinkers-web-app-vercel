import styles from "./styles.module.scss";
import CallIcon from "../../../assets/callclaim.svg";
import CameraIcon from "../../../assets/camera.svg";
import { Form, Formik, FormikValues } from "formik";
import Input from "../../../customs/input/input";
import Button from "../../../customs/button/button";
import { getAllState, getApplicantsbyId, getLGAbyStateId } from "../../request";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import SearchableSelect from "../../../customs/searchableSelect/searchableSelect";
import { userAtom } from "../../../utils/store";
import { useAtomValue } from "jotai";
import { AxiosError } from "axios";
import { App } from "antd";
import { SellerSignUpCall } from "../../Auth/request";
import { errorMessage } from "../../../utils/errorMessage";
import CustomSpin from "../../../customs/spin";

const ProfileDetails = () => {
  const [stateId, setStateId] = useState(0);
  const user = useAtomValue(userAtom);
  const { notification } = App.useApp();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const selectedFile = e.target?.files[0];

    // Validate if the file is an image
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validImageTypes.includes(selectedFile.type)) {
      notification.error({
        message: "Invalid File Type",
        description: "Please upload a valid image (JPEG, PNG, GIF,SVG).",
      });
      return;
    }

    // Update the profile image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const [getProfileQuery, getStateQuery, getLGAQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-profile"],
        queryFn: () => getApplicantsbyId(user?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["get-all-state"],
        queryFn: getAllState,
        retry: 0,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["get-all-lga", stateId],
        queryFn: () => getLGAbyStateId(stateId!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!stateId,
      },
    ],
  });

  const profileData = getProfileQuery?.data?.data;
  const profileDetailsError = getProfileQuery?.error as AxiosError;
  const profileDetailsErrorMessage =
    profileDetailsError?.message ||
    "An error occurred. Please try again later.";

  const stateData = getStateQuery?.data?.data?.data ?? [];
  const lgaData = getLGAQuery?.data?.data?.data ?? [];

  const stateOptions: { value: number; label: string }[] = [
    { value: 0, label: "Select State" }, // Default option
    ...(stateData && stateData?.length > 0
      ? stateData?.map((item: StateDatum) => ({
          value: item?.id,
          label: item?.state_name,
        }))
      : []),
  ];

  const lgaOptions: { value: number; label: string }[] = [
    { value: 0, label: "Select Lga" }, // Default option
    ...(lgaData && lgaData?.length > 0
      ? lgaData?.map((item: LGADatum) => ({
          value: item?.id,
          label: item?.local_government_area,
        }))
      : []),
  ];

  const handleStateChange = (value: number, setFieldValue: any) => {
    console.log("Selected State ID:", value);
    setStateId(value);
    setFieldValue("local_government_area_id", "");
  };

  const SignUpMutation = useMutation({
    mutationFn: SellerSignUpCall,
    mutationKey: ["sign-up"],
  });

  const SignUpHandler = async (values: FormikValues) => {
    const payload: Partial<SellerSignUpData> = {
      name: values?.name,
      number: values?.number,
      address: values?.address,
      address_lat: values?.address,
      address_long: values?.address,
    //   email: values?.email,
      store_name: values?.store_name,
      store_bio: values?.store_bio,
      state_id: values?.state_id,
      local_government_area_id: values?.local_government_area_id,
      profile_image: values?.profile_image,
      facebook_address: values?.facebook_address,
      instagram_address: values?.instagram_address,
      twitter_address: values?.twitter_address,
      website_address: values?.website_address,
    };

    try {
      await SignUpMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-all-jobs"],
          });
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: (profileData?.name && profileData?.name) || "",
          address: profileData?.address || "",
          email: profileData?.email,
          number: profileData?.number || "",
          store_name: "",
          store_bio: "",
          state_id: "",
          local_government_area_id: "",
          profile_image: profileData?.profile_image || "",
          facebook_address: profileData?.facebook_address || "",
          instagram_address: profileData?.instagram_address || "",
          twitter_address: profileData?.twitter_address || "",
          website_address: profileData?.website_address || "",
        }}
        onSubmit={(values) => {
          SignUpHandler(values);
        }}
      >
        {({ setFieldValue, handleChange }) => {
          return (
            <Form>
              {getProfileQuery?.isLoading ? (
                <CustomSpin />
              ) : getProfileQuery?.isError ? (
                <h1 className="error">{profileDetailsErrorMessage}</h1>
              ) : (
                <div className={styles.mainContent}>
                  <div className={styles.leftColumn}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontWeight: "bold" }}>Your Profile</p>
                      <img
                        className={styles.profileImg}
                        src={CallIcon}
                        alt="ProfileImg"
                      />
                      <p>
                        {user?.role === "2"
                          ? profileData?.store_name
                          : profileData?.name}
                      </p>
                    </div>

                    <br />
                    <div className={styles.container}>
                      <p className={styles.smalcard}>{profileData?.email}</p>
                      <p className={styles.smalcard}>{profileData?.number}</p>

                      <p className={styles.smalcard}>{profileData?.address}</p>
                      {user?.role === "2" && (
                        <p className={styles.smalcard}>
                          {profileData?.store_name || "store name"}
                        </p>
                      )}

                      <p className={styles.smalcard}>audience</p>
                    </div>
                  </div>

                  <div className={styles.middleColumn}>
                    <p style={{ fontWeight: "bold" }}>Edit Profile</p>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.profileImg}
                        src={profileImage || CallIcon}
                        alt="ProfileImg"
                      />
                      <img
                        className={styles.cameraIcon}
                        src={CameraIcon}
                        alt="CameraIcon"
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                      />
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    {user?.role === "2" ? (
                      <div>
                        <div className={styles.inputContainer}>
                          <Input name="store_name" placeholder="Store name" />
                          <Input name="email" placeholder="Email" />
                        </div>
                        <div className={styles.inputContainer}>
                          <Input name="address" placeholder="Address" />
                          <Input name="number" placeholder="Phone number" />
                        </div>
                        <br />

                        <SearchableSelect
                          name="state_id"
                          options={stateOptions}
                          placeholder="Select State"
                          onChange={(value: any) =>
                            handleStateChange(value, setFieldValue)
                          }
                        />
                        <br />

                        <SearchableSelect
                          name="local_government_area_id"
                          options={lgaOptions}
                          placeholder="Select LGA"
                        />

                        <div className={styles.inputContainer}>
                          <Input
                            name="facebook_address"
                            placeholder="facebook address"
                          />
                          <Input
                            name="instagram_address"
                            placeholder="instagram address"
                          />
                        </div>
                        <div className={styles.inputContainer}>
                          <Input
                            name="twitter_address"
                            placeholder="twitter address"
                          />
                          <Input
                            name="website_address"
                            placeholder="website address"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={styles.inputContainer}>
                          <Input name="name" placeholder="name" />
                          <Input
                            name="email"
                            placeholder={profileData?.email}
                            disabled={true}
                            // value={profileData?.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={styles.inputContainer}>
                          <Input name="address" placeholder="address" />
                          <Input
                            name="number"
                            placeholder="phone"
                            disabled={true}
                          />
                        </div>
                        <br />
                      </div>
                    )}

                    <Button
                      variant="green"
                      type="submit"
                      disabled={false}
                      text="Submit"
                    />
                  </div>
                  <div className={styles.rightColumn}>
                    <p style={{ fontWeight: "bold" }}>Change Password</p>
                    <Input
                      name="reasonForFlag"
                      placeholder="Current Password"
                      type="password"
                    />
                    <Input
                      name="reasonForFlag"
                      placeholder="New Password"
                      type="password"
                    />
                    <Input
                      name="reasonForFlag"
                      placeholder="Confirm Password"
                      type="password"
                    />
                    <br />
                    <Button
                      variant="green"
                      type="button"
                      disabled={false}
                      text="Submit"
                    />
                    <Button
                      type="button"
                      disabled={false}
                      text="Delete Accout"
                      className={styles.delete}
                    />
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ProfileDetails;
