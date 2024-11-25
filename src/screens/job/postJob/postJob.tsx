import { Form, Formik, FormikValues } from 'formik';
import styles from './postJob.module.scss';
// import { Button, Card, Input, RouteIndicator, SearchableSelect, Select } from '../../../customs';
import { App, Switch } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
// import { CreateJob, getAllBusinessSearch, getJobDetails, UpdateJob } from '../../directory';
import * as Yup from 'yup';
import { routes } from '../../../routes';
import Card from '../../../customs/card/card';
import Input from '../../../customs/input/input';
import Select from '../../../customs/select/select';
import Button from '../../../customs/button/button';
import ModalContent from '../../../partials/successModal/modalContent';
// import Editor from '../../../customs/editor/editor';

export default function PostJobs() {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    console.log('Search Query:', value); // Access the search query value here
    setSearchValue(value);
  };

//   const [getAllBusinessQuery, getJobDetailsQuery] = useQueries({
//     queries: [
//       {
//         queryKey: ['get-all-business', searchValue],
//         queryFn: () => getAllBusinessSearch(searchValue),
//         retry: 0,
//         refetchOnWindowFocus: false,
//       },
//       {
//         queryKey: ['get-jobs-details'],
//         queryFn: () => getJobDetails(parseInt(id!)),
//         retry: 0,
//         refetchOnWindowFocus: false,
//         enabled: !!id,
//       },
//     ],
//   });

//   const JobDetailsData = getJobDetailsQuery?.data?.data;

//   const businessData = getAllBusinessQuery?.data?.data?.data || [];

  // const allBusinessOptions: { value: number; label: string }[] =
  //   businessData?.length > 0
  //     ? businessData.map((item: AllBusinessesDatum) => ({
  //         value: item?.id,
  //         label: item?.name,
  //       }))
  //     : [];

//   const allBusinessOptions: { value: number; label: string }[] = [
//     { value: 0, label: 'Select Business' }, // Default option
//     ...(businessData?.length > 0
//       ? businessData.map((item: AllBusinessesDatum) => ({
//           value: item?.id,
//           label: item?.name,
//         }))
//       : []),
//   ];
  

//   const createJobMutation = useMutation({
//     mutationFn: CreateJob,
//     mutationKey: ['create-jobs'],
//   });
//   const CreateJobHandler = async (values: FormikValues, resetForm: () => void) => {
//     const payload: Partial<JobDatum> = {
//       title: values?.title,
//       business_id: values?.business_id,
//       status: values?.status,
//       employment_type: values?.employment_type,
//       job_type: values?.job_type,
//       level: values?.level,
//       industry: values?.industry,
//       is_admin: true,
//       location: values?.location,
//       description: values?.description,
//       responsibilities: values?.responsibilities,
//       qualifications: values?.qualifications,
//       benefits: values?.benefits,
//       start_date: values?.start_date || '',
//       end_date: values?.end_date || '',
//       renumeration: values?.salary,
//     };

//     try {
//       await createJobMutation.mutateAsync(payload, {
//         onSuccess: (data) => {
//           // notification.success({
//           //   message: 'Success',
//           //   description: data?.message,
//           // });
//           queryClient.refetchQueries({
//             queryKey: ['get-all-jobs'],
//           });
//           setOpenSuccess(true);
//           // resetForm();
//           // navigate(routes?.jobs?.jobs);
//         },
//       });
//     } catch (error: any) {
//       notification.error({
//         message: 'Error',
//         description: 'An error occurred',
//       });
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     // business_id: Yup.string().required('Company is required'),
//     title: Yup.string().required('Job title is required'),
//     start_date: Yup.date().required('required'),
//     employment_type: Yup.string().required('Employment type is required'),
//     job_type: Yup.string().required('Job type is required'),
//     level: Yup.string().required('Job level is required'),
//     end_date: Yup.date().required('required').min(Yup.ref('start_date'), 'End Date cannot be before Start Date'),
//   });

  const employmentTypeData = [
    {
      name: 'full-time',
      value: 'full-time',
    },
    {
      name: 'part-time',
      value: 'part-time',
    },
    {
      name: 'contract',
      value: 'contract',
    },
    {
      name: 'other',
      value: 'other',
    },
  ];

  const employmentTypeOptions: any =
    employmentTypeData &&
    employmentTypeData?.length > 0 &&
    employmentTypeData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));

  const JobTypeData = [
    {
      name: 'on-site',
      value: 'on-site',
    },
    {
      name: 'hybrid',
      value: 'hybrid',
    },
    {
      name: 'remote',
      value: 'remote',
    },
    {
      name: 'other',
      value: 'other',
    },
  ];

  const JobTypeOptions: any =
    JobTypeData &&
    JobTypeData?.length > 0 &&
    JobTypeData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));

  const LevelData = [
    {
      name: 'intern',
      value: 'intern',
    },
    {
      name: 'beginner',
      value: 'beginner',
    },
    {
      name: 'junior',
      value: 'junior',
    },
    {
      name: 'mid-level',
      value: 'mid-level',
    },
    {
      name: 'senior',
      value: 'senior',
    },
  ];

  const LevelOptions: any =
    LevelData &&
    LevelData?.length > 0 &&
    LevelData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));

//   const handleSucessEdit = () => {
//     setEditSuccess(false);
//     navigate(routes?.jobs?.jobs);
//   };
  const handleSucessPost = () => {
    setOpenSuccess(false);
    navigate(routes?.job?.postJob);
  };

//   const editJobMutation = useMutation({
//     mutationFn: UpdateJob,
//     mutationKey: ['edit-jobs'],
//   });
//   const EditJobHandler = async (values: FormikValues, resetForm: () => void) => {
//     const payload: Partial<JobDatum> = {
//       id: parseInt(id!) ?? 0,
//       title: values?.title,
//       business_id: values?.business_id,
//       status: values?.accepting_applications === false ? '0' : '1',
//       employment_type: values?.employment_type,
//       job_type: values?.job_type,
//       level: values?.level,
//       industry: values?.industry,
//       is_admin: values?.business_id === 0 ? true : false,
//       location: values?.location,
//       description: values?.description,
//       responsibilities: values?.responsibilities,
//       qualifications: values?.qualifications,
//       benefits: values?.benefits,
//       start_date: values?.start_date,
//       end_date: values?.end_date,
//       renumeration: values?.salary,
//     };

//     try {
//       await editJobMutation.mutateAsync(payload, {
//         onSuccess: (data) => {
//           queryClient.refetchQueries({
//             queryKey: ['get-all-jobs'],
//           });
//           setEditSuccess(true);
//           // resetForm();
//           // navigate(routes?.jobs?.jobs);
//         },
//       });
//     } catch (error: any) {
//       notification.error({
//         message: 'Error',
//         description: 'An error occurred',
//       });
//     }
//   };

  return (
    <div className={styles.wrapper}>
      {/* <RouteIndicator showBack={true} /> */}

      <Card style={styles.card}>
        <div className={styles.postJob}>
          {id ? (
            <h2>Edit Job</h2>
          ) : (
            <>
              <h2>Post A Job</h2>
              <p className={styles.para}>Fill in the form to post a job</p>
            </>
          )}
        </div>
        <section>
          <Formik
            initialValues={{
            //   business_id: JobDetailsData?.business_id ,
            //   title: JobDetailsData?.title || '',
            //   employment_type: JobDetailsData?.employment_type || '',
            //   job_type: JobDetailsData?.job_type || '',
            //   level: JobDetailsData?.level || '',
            //   industry: JobDetailsData?.industry || '',
            //   location: JobDetailsData?.location || '',
            //   description: JobDetailsData?.description || '',
            //   responsibilities: JobDetailsData?.responsibilities || '',
            //   qualifications: JobDetailsData?.qualifications || '',
            //   benefits: JobDetailsData?.benefits || '',
            //   start_date: JobDetailsData?.start_date || '',
            //   end_date: JobDetailsData?.end_date || '',
            //   salary: JobDetailsData?.renumeration || '',
            //   accepting_applications: JobDetailsData?.status?.toString() === '1' ? true : false, // <-- Ensures boolean value
            }}
            onSubmit={(values, { resetForm }) => {
            //   id ? EditJobHandler(values, resetForm) : CreateJobHandler(values, resetForm);
            }}
            enableReinitialize={true}
            // validationSchema={validationSchema}
          >
            {({ handleChange, setFieldValue, values }) => {
              return (
                <Form>
                  <div className={styles.inputContainer}>
                    <Input
                      name="title"
                      label="Job Title"
                      placeholder="Customer Service"
                      type="text"
                    //   value={values.title}
                      onChange={handleChange}
                    />

                    <Input
                      name="location"
                      label="Location"
                      placeholder="Lagos. Nigeria"
                      type="text"
                    //   value={values.location}
                      onChange={handleChange}
                    />

                    {/* <SearchableSelect
                      name="business_id"
                      label="Company's Name"
                      options={[]}
                      placeholder="Select Company Name"
                      onSearchChange={handleSearchChange}
                    /> */}
                    <Input
                      name="industry"
                      label="industry"
                      placeholder="industry"
                      type="text"
                    //   value={values.industry}
                      onChange={handleChange}
                    />
                    <Input
                      name="start_date"
                      label="Start Date"
                      type="date"
                    //   value={values.start_date}
                      onChange={handleChange}
                    />
                    <Input
                      name="end_date"
                      label="End Date"
                      type="date"
                    //   value={values.end_date}
                      onChange={handleChange}
                    />

                    <Select
                      name="employment_type"
                      label="Employment Type"
                      placeholder=" Select Employment type"
                      options={employmentTypeOptions}
                      onChange={handleChange}
                    />

                    <Select
                      name="job_type"
                      label="Job Type"
                      placeholder="Select Job Type"
                      options={JobTypeOptions}
                      onChange={handleChange}
                    />

                    <Select
                      label="Job Level"
                      placeholder="Select Job Level"
                      name="level"
                      onChange={handleChange}
                      options={LevelOptions}
                    />

                    <Input
                      name="salary"
                      label="Salary"
                      type="text"
                      placeholder="input Salary"
                    //   value={values.salary}
                      onChange={handleChange}
                    />

                    <Input
                      name="description"
                      placeholder="This is a job for whoever has experience in customer service"
                      label="Job Description"
                      type="textarea"
                    />
                    {/* <Editor
                      name="description"
                      label="Job Description"
                      initialData={values.description}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setFieldValue('description', data);
                      }}
                    />
                    <Editor
                      name="responsibilities"
                      label="Key Responsibilities"
                      initialData={values.responsibilities}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setFieldValue('responsibilities', data);
                      }}
                    /> */}

                    {/* <Input
                      name="responsibilities"
                      placeholder="List out the key responsibilities"
                      label="Key Responsibilities"
                      type="textarea"
                    /> */}
                    {/* <Editor
                      name="qualifications"
                      label="Qualifications"
                      initialData={values.qualifications}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setFieldValue('qualifications', data);
                      }}
                    /> */}
{/* 
                    {/* <Input
                      name="qualifications"
                      placeholder="List out the qualifications"
                      label="Qualifications"
                      type="textarea"
                    /> */} 
                    {/* <Editor
                      name="benefits"
                      label="Benefits"
                      initialData={values.benefits}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setFieldValue('benefits', data);
                      }}
                    /> */}

                    {/* <Input name="benefits" placeholder="Benefits" label="Benefits" type="textarea" /> */}

                    <div className="switchWrapper">
                      Accepting Applications{' '}
                      <Switch
                        // checked={values.accepting_applications}
                        onChange={(checked) => setFieldValue('accepting_applications', checked)}
                      />
                    </div>

                    <section className={styles.buttonGroup}>
                      <Button
                        variant="greenOutline"
                        type="submit"
                        disabled={false}
                        text="Cancel"
                        className={styles.btn}
                        onClick={() => navigate(-1)}
                      />
                      <Button
                        variant="green"
                        type="submit"
                        // disabled={editJobMutation?.isPending || createJobMutation?.isPending}
                        
                        text={id ? 'Save Changes' : 'Post Job'}
                        className={styles.btn}
                        onClick={() => setOpenSuccess(true)}
                      />
                    </section>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </section>
      </Card>
      <ModalContent
        open={openSuccess}
        handleCancel={() => handleSucessPost()}
        handleClick={() => {
          handleSucessPost();
        }}
        heading={'Job Posted Successfully'}
      />
      {/* <ModalContent
        open={editSuccess}
        handleCancel={() => handleSucessEdit()}
        handleClick={() => {
          handleSucessEdit();
        }}
        text={'Job Updates Successfully'}
      /> */}
    </div>
  );
}
