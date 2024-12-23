import { FC, useEffect, useState } from "react";
import { App, GetProp, Upload, UploadFile, UploadProps, Image } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TimePicker } from "antd";
import styles from "./styles.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { parse } from "date-fns";
import { CreateBusinessHourApi } from "../../../request";
import api from "../../../../utils/apiClient";
import Checkbox from "../../../../customs/checkBox/checkbox";
import Button from "../../../../customs/button/button";
import Input from "../../../../customs/input/input";
import { useAtomValue } from "jotai";
import { basicInfoAtom, userAtom } from "../../../../utils/store";
import * as Yup from "yup";
import { errorMessage } from "../../../../utils/errorMessage";

interface ComponentProps {
  onPrev: () => void;
  handleNext: () => void;
  businessDetailsData?: AllBusinessesDatum;
}

const SocialsCoverPhotoForm: FC<ComponentProps> = ({
  onPrev,
  handleNext,
  businessDetailsData,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isWeekendChecked, setIsWeekendChecked] = useState(false);
  const [isWeekdaysChecked, setIsWeekdaysChecked] = useState(false);
  const [isAllDayChecked, setIsAllDayChecked] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const basicInfoData = useAtomValue(basicInfoAtom);
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Mutation to handle business hours submission
  const createBusinessHourMutation = useMutation({
    mutationFn: CreateBusinessHourApi,
    mutationKey: ["create-business-hour"],
  });

  const createBusinessHourHandler = async (
    values: FormikValues,
    resetForm: any,
    setFieldValue: any
  ) => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const hours = daysOfWeek.reduce((acc: any[], day) => {
      const open_time = values[`${day}StartTime`];
      const close_time = values[`${day}EndTime`];

      if (open_time && close_time) {
        acc.push({
          day,
          open_time: open_time.format("HH:mm"),
          close_time: close_time.format("HH:mm"),
        });
      }

      return acc;
    }, []);

    const payload: Partial<BusinessHourDatum> = {
      business_id: businessDetailsData?.id || 0,
      hours,
    };

    try {
      await createBusinessHourMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-business-details"],
          });
        },
      });
      resetForm();
      clearFormData(setFieldValue);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:errorMessage(error) || "An error occurred",
      });
      clearFormData(setFieldValue);
    }
  };

  // Helper function to clear the form data and checkbox states
  const clearFormData = (setFieldValue: any) => {
    setIsWeekendChecked(false);
    setIsWeekdaysChecked(false);
    setIsAllDayChecked(false);

    // Clear all form values related to start and end times
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    daysOfWeek.forEach((day) => {
      setFieldValue(`${day}StartTime`, null); // Clear start time
      setFieldValue(`${day}EndTime`, null); // Clear end time
    });
  };

  const handleCheckboxChange = (event: any, setFieldValue: any) => {
    console.log(setFieldValue);
    const { name, checked } = event.target;

    if (name === "weekends") {
      setIsWeekendChecked(checked);
    } else if (name === "weekdays") {
      setIsWeekdaysChecked(checked);
    } else if (name === "allDay") {
      setIsAllDayChecked(checked);
    }
  };

  const handleTimeChange = (time: any, field: string, setFieldValue: any) => {
    setFieldValue(field, time);

    if (isWeekendChecked) {
      setFieldValue("saturdayStartTime", time);
      setFieldValue("saturdayEndTime", time);
      setFieldValue("sundayStartTime", time);
      setFieldValue("sundayEndTime", time);
    }

    if (isWeekdaysChecked) {
      const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
      weekdays.forEach((day) => {
        setFieldValue(`${day}StartTime`, time);
        setFieldValue(`${day}EndTime`, time);
      });
    }

    if (isAllDayChecked) {
      const allday = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      allday.forEach((day) => {
        setFieldValue(`${day}StartTime`, time);
        setFieldValue(`${day}EndTime`, time);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const editBusiness = async (payload: FormData) => {
    return (
      await api.post(`/businesses/${user?.business?.id!}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    )?.data;
  };

  const createBusinessMutation = useMutation({
    mutationFn: editBusiness,
  });

  const createBusinessHandler = async (values: FormikValues) => {
    const formData = new FormData();
    formData.append("name", basicInfoData?.businessName);
    formData.append("category_id", basicInfoData?.category);
    formData.append("address", basicInfoData?.businessAddress);
    formData.append("phone", basicInfoData?.phoneNumber);
    formData.append("email", basicInfoData?.email);
    formData.append("website", basicInfoData?.website);
    formData.append("about", basicInfoData?.aboutBusiness);
    formData.append("facebook", values?.facebook);
    formData.append("instagram", values?.instagram);
    formData.append("whatsapp", values?.whatsapp);
    formData.append("_method", "patch");

    if (fileList[0]?.originFileObj) {
      formData.append("logo", fileList[0]?.originFileObj);
    }

    try {
      await createBusinessMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-business-details"] });
          handleNext();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:errorMessage(error) || "An error occurred",
      });
    }
  };

  const getDay = (day: string) => {
    const findDay = businessDetailsData?.business_hours?.find(
      (item) => item?.day === day
    );

    return !!findDay;
  };

  const [initialValues, setInitialValues] = useState({
    sunday: getDay("sunday"),
    monday: getDay("monday"),
    tuesday: getDay("tuesday"),
    wednesday: getDay("wednesday"),
    thursday: getDay("thursday"),
    friday: getDay("friday"),
    saturday: getDay("saturday"),
    sundayStartTime: null,
    mondayStartTime: null,
    mondayEndTime: null,
    tuesdayStartTime: null,
    tuesdayEndTime: null,
    wednesdayStartTime: parse("09:00:00", "HH:mm:ss", new Date()),
    wednesdayEndTime: null,
    thursdayStartTime: null,
    thursdayEndTime: null,
    fridayStartTime: null,
    fridayEndTime: null,
    saturdayStartTime: null,
    saturdayEndTime: null,
    facebook: businessDetailsData?.facebook ?? "",
    instagram: businessDetailsData?.instagram ?? "",
    whatsapp: businessDetailsData?.whatsapp ?? "",
  });

  const getStartTimeValue = (values: FormikValues, day: string) => {
    const concatDay = day + "StartTime";
    const getTime = values[concatDay];
    return getTime;
  };

  const getEndTimeValue = (values: FormikValues, day: string) => {
    const concatDay = day + "EndTime";
    const getTime = values[concatDay];
    return getTime;
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (businessDetailsData) {
      setInitialValues((prev) => ({
        ...prev,
        sunday: getDay("sunday"),
        monday: getDay("monday"),
        tuesday: getDay("tuesday"),
        wednesday: getDay("wednesday"),
        thursday: getDay("thursday"),
        friday: getDay("friday"),
        saturday: getDay("saturday"),
      }));
    }
  }, [businessDetailsData]);

  const validationSchema = Yup.object().shape({
    instagram: Yup.string()
      .required("required")
      .url('Please enter a valid URL'),
    facebook: Yup.string()
      .required("")
      .url('Please enter a valid URL'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createBusinessHandler(values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <div className={styles.head}>
                  {fileList?.length < 1 && (
                    <Image
                      width={100}
                      height={100}
                      src={businessDetailsData?.logo}
                      alt="Creative Icon"
                      preview={false}
                    />
                  )}

                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />

                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>

                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>

                <section className={styles.firstRow}>
                  <h3>Add Opening Hours</h3>
                  <hr />

                  <div style={{ paddingInlineEnd: "2rem" }}>
                    <Checkbox
                      name="allDay"
                      label="All day"
                      onChange={(e) =>
                        handleCheckboxChange(e, props.setFieldValue)
                      }
                    />

                    <Checkbox
                      name="weekends"
                      label="Weekends"
                      onChange={(e) =>
                        handleCheckboxChange(e, props.setFieldValue)
                      }
                    />

                    <Checkbox
                      name="weekdays"
                      label="Weekdays"
                      onChange={(e) =>
                        handleCheckboxChange(e, props.setFieldValue)
                      }
                    />

                    <TimePicker
                      name="startTime"
                      onChange={(time) =>
                        handleTimeChange(time, "startTime", props.setFieldValue)
                      }
                    />

                    <TimePicker
                      name="endTime"
                      onChange={(time) =>
                        handleTimeChange(time, "endTime", props.setFieldValue)
                      }
                    />
                  </div>

                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <div className={styles.timeWrapper} key={day}>
                      <Checkbox
                        name={day.toLowerCase()}
                        label={day}
                        onChange={props.handleChange}
                      />

                      <TimePicker
                        name={`${day.toLowerCase()}StartTime`}
                        value={getStartTimeValue(props.values, day)}
                        // || getStartTime(day.toLowerCase())
                        onChange={(time) => {
                          handleTimeChange(
                            time,
                            `${day.toLowerCase()}StartTime`,
                            props.setFieldValue
                          );
                        }}
                      />
                      <TimePicker
                        name={`${day.toLowerCase()}EndTime`}
                        value={getEndTimeValue(props.values, day)}
                        onChange={(time) =>
                          handleTimeChange(
                            time,
                            `${day.toLowerCase()}EndTime`,
                            props.setFieldValue
                          )
                        }
                      />
                    </div>
                  ))}

                  <div className="alignRight">
                    <Button
                      text="Save"
                      onClick={() =>
                        createBusinessHourHandler(
                          props.values,
                          props.resetForm,
                          props.setFieldValue
                        )
                      }
                      className={styles.btn}
                    />
                  </div>
                </section>
                <br />

                <section className={styles.secondRow}>
                  <p>Add Social Media Link</p>
                  <hr />
                  <Input
                    label="Facebook"
                    placeholder="Add Facebook link"
                    name="facebook"
                  />
                  <Input
                    label="Instagram"
                    placeholder="Add Instagram link"
                    name="instagram"
                  />
                  <Input
                    label="Whatsapp"
                    placeholder="Add Whatsapp link"
                    name="whatsapp"
                  />
                </section>
                <br />

                <section className={styles.buttonGroup}>
                  <Button
                    variant="white"
                    type="button"
                    disabled={false}
                    text="Previous"
                    className={styles.buttonStyle}
                    onClick={onPrev}
                  />

                  <Button
                    variant="green"
                    type="submit"
                    disabled={false}
                    text="Continue"
                    className={styles.buttonStyle}
                    isLoading={createBusinessHourMutation?.isPending}
                    // onClick={handleNext}
                  />
                </section>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default SocialsCoverPhotoForm;
