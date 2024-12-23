import { Form, Formik, FormikValues } from "formik";
import styles from "./editAds.module.scss";
import { useMutation, useQueries } from "@tanstack/react-query";
import Input from "../../../customs/input/input";
import SearchableSelect from "../../../customs/searchableSelect/searchableSelect";
import Button from "../../../customs/button/button";
import { useParams } from "react-router-dom";
import {
  createAds,
//   deleteAdsGalarybyId,
  getAllCategory,
  getAllState,
  getLGAbyStateId,
  getProductDetails,
  getSubCategory,
//   uploadAdsGallery,
//   uploadAdsVideo,
} from "../../request";
import {  useState } from "react";
import { AxiosError } from "axios";
import Checkbox from "../../../customs/checkBox/checkbox";
import Upload from "../../../customs/upload/upload";
import { App } from "antd";
import { errorMessage } from "../../../utils/errorMessage";
// import favorite from "../../../assets/deleteicon.svg";
import CustomSpin from "../../../customs/spin";
import * as Yup from "yup";

const EditAdz = () => {
  const { id } = useParams();
  const [stateId, setStateId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const { notification } = App.useApp();
  const [uploadFeature, setUploadFeature] = useState<File | null>(null);
  const [uploads, setUploads] = useState<File[]>([]);
  const [uploadVideos, setUploadVideos] = useState<File[]>([]);

  console.log(uploads, "jummy 4 oclos");
//   const queryClient = useQueryClient();

  const handleStateChange = (value: number, setFieldValue: any) => {
    setStateId(value);
    setFieldValue("local_government_area_id", "");
  };

  const handleCategoryChange = (value: number, setFieldValue: any) => {
    setCategoryId(value);
    setFieldValue("sub_category_id", "");
  };

  const [
    getProductDetailsQuery,
    getStateQuery,
    getLGAQuery,
    getAllCategoryQuery,
    getSubCategoryQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: ["get-product-details", id],
        queryFn: () => getProductDetails(parseInt("837")),
        retry: 0,
        refetchOnWindowFocus: true,
        // enabled: !!id,
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
      {
        queryKey: ["get-all-category"],
        queryFn: () => getAllCategory(),
        retry: 0,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["get-sub-category", categoryId],
        queryFn: () => getSubCategory(categoryId),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!categoryId,
      },
    ],
  });

  const productDetailsData = getProductDetailsQuery?.data?.data;
  const productDetailsError = getProductDetailsQuery?.error as AxiosError;
  const productDetailsErrorMessage =
    productDetailsError?.message ||
    "An error occurred. Please try again later.";

  console.log(
    productDetailsData?.add_images[0]?.add_image,
    "productDetailsData"
  );
  const stateData = getStateQuery?.data?.data?.data ?? [];
  const lgaData = getLGAQuery?.data?.data?.data ?? [];
  const subCategory = getSubCategoryQuery?.data?.data?.data ?? [];

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

  const categoryData = getAllCategoryQuery?.data?.data?.data ?? [];

  const categoryOptions: { value: number; label: string }[] = [
    { value: 0, label: "Select Business" }, // Default option
    ...(categoryData && categoryData?.length > 0
      ? categoryData?.map((item: CategoryDatum) => ({
          value: item?.id,
          label: item?.title,
        }))
      : []),
  ];
  const subCategoryOptions: { value: number; label: string }[] = [
    { value: 0, label: "Select Business" }, // Default option
    ...(subCategory && subCategory?.length > 0
      ? subCategory?.map((item: CategoryDatum) => ({
          value: item?.id,
          label: item?.title,
        }))
      : []),
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)
    );

    if (validFiles.length > 0) {
      setUploads([...uploads, ...validFiles]);
      setFieldValue("imageFiles", [...uploads, ...validFiles]);
    } else {
      notification.error({
        message: "Invalid File Type",
        description: "Only image files (jpg, jpeg, png) are allowed.",
      });
    }
  };
  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    const files = e.target.files;
    if (!files) return;

    // const validVideos = Array.from(files).filter((file) =>
    //   ["video/mp4", "video/x-matroska", "video/webm"].includes(file.type)
    // );
    const validVideos = Array.from(files).filter((file) =>
        ["video/mp4", "video/quicktime", "video/3gpp"].includes(file.type)
    );

    if (validVideos.length > 0) {
      setUploadVideos([...uploadVideos, ...validVideos]);
      setFieldValue("videoFiles", [...uploadVideos, ...validVideos]);
    } else {
      notification.error({
        message: "Invalid File Type",
        description: "Only video files (mp4, mkv, webm) are allowed.",
      });
    }
  };

  const handleFileChangeFeature = (
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
    setFieldValue("featureImage", selectedFile);
    setUploadFeature(selectedFile);
  };
//   const deleteGalaryMutation = useMutation({ mutationFn: deleteAdsGalarybyId });

//   const DeleteGalaryHandler = async (imageIds: number[]) => {
//     try {
//       await deleteGalaryMutation.mutateAsync(
//         {
//           add_id: 837!, // Ensure id is available
//           image_ids: imageIds,
//         },
//         {
//           onSuccess: (data) => {
//             notification.success({
//               message: "Success",
//               description: data?.message,
//             });
//             queryClient.refetchQueries({
//               queryKey: ["get-product-details"],
//             });
//           },
//         }
//       );
//     } catch (error: any) {
//       notification.error({
//         message: "Error",
//         description: errorMessage(error) || "An error occurred",
//       });
//     }
//   };

  //   const UploadGalleryMutation = useMutation({
  //     mutationFn: uploadAdsGallery,
  //     mutationKey: ["upload-ads-gallery"],
  //   });

  //   const UploadGalleryHandler = async () => {
  //     const formData = new FormData();

  //     // if (id) {
  //     formData.append("add_id", "837"); // Correctly append the file
  //     // }
  //     if (upload) {
  //       formData.append("add_image[]", upload); // Correctly append the file
  //     }

  //     try {
  //       await UploadGalleryMutation.mutateAsync(formData, {
  //         onSuccess: (data) => {
  //           notification.success({
  //             message: "Success",
  //             description: data?.message,
  //           });

  //           queryClient.refetchQueries({
  //             queryKey: ["get-product-details"],
  //           });
  //           setUpload(null);
  //         },
  //       });
  //     } catch (error: any) {
  //       notification.error({
  //         message: "Error",
  //         description: errorMessage(error) || "An error occurred",
  //       });

  //       setUpload(null);
  //     }
  //   };

  //   const UploadVideoMutation = useMutation({
  //     mutationFn: uploadAdsVideo,
  //     mutationKey: ["upload-ads-video"],
  //   });

  //   const UploadVideoHandler = async () => {
  //     const formData = new FormData();

  //     // if (id) {
  //     formData.append("add_id", "837"); // Correctly append the file
  //     // }
  //     if (uploadVideo) {
  //       formData.append("add_image[]", uploadVideo); // Correctly append the file
  //     }

  //     try {
  //       await UploadVideoMutation.mutateAsync(formData, {
  //         onSuccess: (data) => {
  //           notification.success({
  //             message: "Success",
  //             description: data?.message,
  //           });

  //           queryClient.refetchQueries({
  //             queryKey: ["get-product-details"],
  //           });
  //           setUploadVideo(null);
  //         },
  //       });
  //     } catch (error: any) {
  //       notification.error({
  //         message: "Error",
  //         description: errorMessage(error) || "An error occurred",
  //       });

  //       setUploadVideo(null);
  //     }
  //   };

  /* eslint-disable react-hooks/exhaustive-deps */
  //   useEffect(() => {
  //     if (upload) {
  //       UploadGalleryHandler();
  //     }
  //   }, [upload]);
  //   useEffect(() => {
  //     if (uploadVideo) {
  //       UploadVideoHandler();
  //     }
  //   }, [uploadVideo]);
  //   useEffect(() => {
  //     if (uploadFeature) {
  //       UploadGalleryHandler();
  //     }
  //   }, [uploadFeature]);

  const clearFile = () => {
    setUploads([]);
    setUploadVideos([]);
    setUploadFeature(null);
  };

  const createAdsMutation = useMutation({
    mutationFn: createAds,
  });

  const createAdsHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();
    const descriptionTags = [];

    if (values.Used) {
      descriptionTags.push("USED");
    }
    if (values.New) {
      descriptionTags.push("NEW");
    }
    if (values.PayOnDelivery) {
      descriptionTags.push("PAY ON DELIVERY");
    }
    formData.append("category_id", values?.category_id);
    formData.append("sub_category_id", values?.sub_category_id);
    formData.append("title", values?.title);
    formData.append("price", values?.price);
    formData.append("discount_price", values?.discount_price);
    // formData.append("description_tags[0]", checkedBox);
    descriptionTags.forEach((tag, index) => {
        formData.append(`description_tags[${index}]`, tag);
      });
    formData.append("description", values?.description);
    formData.append("state_id", values?.state_id);
    formData.append("technical_details", values?.technical_details);

    formData.append(
      "local_government_area_id",
      values?.local_government_area_id
    );
    formData.append("pickup_address", values.pickup_address);
    formData.append("pickup_lat", values.pickup_address);
    formData.append("pickup_lng", values.pickup_address);
    if (uploadFeature) {
      formData.append("add_featured_image", uploadFeature);
    }

    uploads.forEach((file, index: number) => {
      formData.append(`add_image[${index}]`, file);
    });

    uploadVideos.forEach((file, index: number) => {
        console.log(file.type); // Log the file type

      formData.append(`add_video[${index}]`, file);
    });

    try {
      await createAdsMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          resetForm();
          clearFile();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  const validationSchema = Yup.object().shape({
    category_id: Yup.string().required("required"),
    sub_category_id: Yup.string().required("required"),
    title: Yup.string().required("required"),
    price: Yup.string().required("required"),
    discount_price: Yup.string().required("required"),
    description: Yup.string().required("required"),
    state_id: Yup.string().required("required"),
    local_government_area_id: Yup.string().required("required"),
    pickup_address: Yup.string().required("required"),
    // state_id: Yup.string().required("required"),
    // state_id: Yup.string().required("required"),
  });
  const handleRemoveFeature = () => {
    setUploadFeature(null);
  };

  const handleRemoveUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index: number) => {
    setUploadVideos((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <section className="wrapper">
      {getProductDetailsQuery?.isLoading ? (
        <CustomSpin />
      ) : getProductDetailsQuery?.isError ? (
        <h1 className="error">{productDetailsErrorMessage}</h1>
      ) : (
        <Formik
          initialValues={{
            title: "",
            Used: false,
            New: false,
            PayOnDelivery: false,
            price: "",
            discount_price: "",
            category_id: "",
            sub_category_id: "",
            pickup_address: "",
            state_id: "",
            local_government_area_id: "",
            description: "",
            technical_details: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createAdsHandler(values, resetForm);
          }}
            validationSchema={validationSchema}
          enableReinitialize
        >
          {({ handleChange, setFieldValue, values }) => {
            return (
              <Form>
                <div className={styles.inputContainer}>
                  <h3>Upload Product Photos and Videos</h3>
                  <div className={styles.inputRow}>
                    <Upload
                      placeHolder="upload your feature image, max 1file"
                      name="featureImage"
                      // label="Upload a document to prove that you’re the owner of this business (CAC, Business letterhead etc.)"
                      onChange={(e) =>
                        handleFileChangeFeature(e, setFieldValue)
                      }
                    />
                    <Upload
                      placeHolder="upload your photos, max 9 files"
                      name="imageFile"
                      // label="Upload a document to prove that you’re the owner of this business (CAC, Business letterhead etc.)"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                    <Upload
                      placeHolder="upload your Videos, max 2 files"
                      name="videoFile"
                      onChange={(e) => handleVideoChange(e, setFieldValue)}
                    />
                  </div>
                  <h3>Uploaded Media</h3>

                  {uploadFeature && (
                    <div>
                      <h3>Feature Image</h3>
                      <img
                        src={URL.createObjectURL(uploadFeature)}
                        alt="Feature Preview"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <br />
                      <button onClick={handleRemoveFeature}>Cancel</button>
                    </div>
                  )}

                  {uploads?.length > 0 && <h3>Images</h3>}

                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {uploads?.map((file, index) => (
                      <div key={index} style={{ textAlign: "center" }}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <br />
                        <button onClick={() => handleRemoveUpload(index)}>
                          Cancel
                        </button>
                      </div>
                    ))}
                  </div>

                  {uploadVideos?.length > 0 && <h3>Videos</h3>}

                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {uploadVideos.map((file, index) => (
                      <div key={index} style={{ textAlign: "center" }}>
                        <video
                          src={URL.createObjectURL(file)}
                          controls
                          style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <br />
                        <button onClick={() => handleRemoveVideo(index)}>
                          Cancel
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* <div className={styles.imageContainer}>
                    {productDetailsData?.add_images?.map((image, index) => (
                      <div key={index} className={styles.imageWrapper}>
                        <img
                          src={image?.add_image}
                          alt={`Product Image ${index + 1}`}
                          className={styles.imageAds}
                          // width={'100%'}
                          // height={200}
                        />
                        <div
                          className={styles.favoriteIcon}
                          onClick={() => DeleteGalaryHandler([image?.id])} // Your delete logic can be handled here
                        >
                          <img width={30} src={favorite} alt="Favorite" />
                        </div>
                      </div>
                    ))}
                  </div> */}

                  <div className={styles.inputRow}>
                    <Input
                      name="title"
                      label="title"
                      placeholder="Ad title"
                      type="text"
                      onChange={handleChange}
                    />
                    <Input
                      name="price"
                      label="Price"
                      placeholder="price"
                      type="text"
                      onChange={handleChange}
                    />
                    <Input
                      name="discount_price"
                      label="Discount Price"
                      placeholder="Discount Price"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.inputRow}>
                    <SearchableSelect
                      name="category_id"
                      label="Category"
                      options={categoryOptions}
                      placeholder="Select Category"
                      onChange={(value: any) =>
                        handleCategoryChange(value, setFieldValue)
                      }
                    />
                    <SearchableSelect
                      name="sub_category_id"
                      label="Sub Category"
                      options={subCategoryOptions}
                      placeholder="Select Sub Category"
                    />

                    <Input
                      name="pickup_address"
                      label="Pickup address"
                      type="text"
                      placeholder="Pickup address"
                    />
                  </div>
                  <div className={styles.inputRow}>
                    <SearchableSelect
                      name="state_id"
                      label="State"
                      options={stateOptions}
                      placeholder="Select State"
                      onChange={(value: any) =>
                        handleStateChange(value, setFieldValue)
                      }
                    />
                    <br />

                    <SearchableSelect
                      name="local_government_area_id"
                      label="Lga"
                      options={lgaOptions}
                      placeholder="Select LGA"
                    />
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <Checkbox
                      label="USED"
                      name="Used"
                      isChecked={values.Used}
                    />
                    <Checkbox label="NEW" name="New" isChecked={values.New} />
                    <Checkbox
                      label="PAY ON DELIVERY"
                      name="PayOnDelivery"
                      isChecked={values.PayOnDelivery}
                    />
                  </div>
                  <Input
                    name="description"
                    label="Description"
                    type="textarea"
                    placeholder="Description"
                  />
                  <Input
                    name="technical_details"
                    label="Technical Details"
                    type="textarea"
                    placeholder="Technical Details"
                  />
                  <section className={styles.buttonGroup}>
                    <Button
                      variant="red"
                      type="submit"
                      disabled={false}
                      text="Cancel"
                      className="buttonStyle"
                    />
                    <Button
                      variant="green"
                      type="submit"
                      disabled={false}
                      text="Submit"
                      className="buttonStyle"
                    />
                  </section>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </section>
  );
};

export default EditAdz;
