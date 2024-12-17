import { Form, Formik, FormikValues } from 'formik';
import styles from './postJob.module.scss';
import {  App, Switch } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { routes } from '../../../routes';
import Card from '../../../customs/card/card';
import Input from '../../../customs/input/input';
import Select from '../../../customs/select/select';
import Button from '../../../customs/button/button';
import ModalContent from '../../../partials/successModal/modalContent';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { CreateJob, employmentTypeData, getAllBusiness, JobTypeData, LevelData } from '../../request';
import Editor from '../../../customs/editor/editor';
import RouteIndicator from '../../../customs/routeIndicator';
import { userAtom } from '../../../utils/store';
import { useAtomValue } from 'jotai';

export default function PostJobs() {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const user = useAtomValue(userAtom);

  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const { id } = useParams();

 

  // const [getAllBusinessQuery,] = useQueries({
  //   queries: [
      // {
      //   queryKey: ['get-all-business',],
      //   queryFn: () => getAllBusiness,
      //   retry: 0,
      //   refetchOnWindowFocus: false,
      // },
      // {
      //   queryKey: ['get-jobs-details'],
      //   queryFn: () => getJobDetails(parseInt(id!)),
      //   retry: 0,
      //   refetchOnWindowFocus: false,
      //   enabled: !!id,
      // },
  //   ],
  // });

  // const JobDetailsData = getJobDetailsQuery?.data?.data;
// 


  const createJobMutation = useMutation({
    mutationFn: CreateJob,
    mutationKey: ['create-jobs'],
  });
  const CreateJobHandler = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<JobDatum> = {
      title: values?.title,
      // business_id: values?.business_id,
      business_id: user?.business?.id,
      status: values?.status,
      employment_type: values?.employment_type,
      job_type: values?.job_type,
      level: values?.level,
      industry: values?.industry,
      is_admin: true,
      location: values?.location,
      description: values?.description,
      responsibilities: values?.responsibilities,
      qualifications: values?.qualifications,
      benefits: values?.benefits,
      start_date: values?.start_date || '',
      end_date: values?.end_date || '',
      renumeration: values?.salary,
    };

    try {
      await createJobMutation.mutateAsync(payload, {
        onSuccess: () => {
          // notification.success({
          //   message: 'Success',
          //   description: data?.message,
          // });
          queryClient.refetchQueries({
            queryKey: ['get-all-jobs'],
          });
          resetForm()
          setOpenSuccess(true);
          // resetForm();
          navigate(routes?.job.job);
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: 'An error occurred',
      });
    }
  };

  const today = new Date();
today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object().shape({
    // business_id: Yup.string().required('Company is required'),
    title: Yup.string().required('Job title is required'),
    // start_date: Yup.date().required('required'),
    start_date: Yup.date()
    .required('Start date is required')
    .min(today, 'Start date cannot be in the past'),
    employment_type: Yup.string().required('Employment type is required'),
    job_type: Yup.string().required('Job type is required'),
    level: Yup.string().required('Job level is required'),
    end_date: Yup.date().required('required').min(Yup.ref('start_date'), 'End Date cannot be before Start Date'),
  });



  const employmentTypeOptions: any =
    employmentTypeData &&
    employmentTypeData?.length > 0 &&
    employmentTypeData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));


  const JobTypeOptions: any =
    JobTypeData &&
    JobTypeData?.length > 0 &&
    JobTypeData?.map((item: any, index: number) => (
      <option value={item?.value} key={index}>
        {item?.name}
      </option>
    ));



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
    navigate(routes?.job?.job);
  };



  return (
    <div className={styles.wrapper}>
      <RouteIndicator showBack={true} />

  
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
              business_id: '',
              title:  '',
              employment_type: '',
              job_type:  '',
              level: '',
              industry:'',
              location: '',
              description: '',
              responsibilities: '',
              qualifications:  '',
              benefits: '',
              start_date: '',
              end_date:  '',
              salary:'',
              accepting_applications: false, // <-- Ensures boolean value
            }}
            onSubmit={(values,{resetForm}) => {
            CreateJobHandler(values, resetForm);
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
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
                      options={allBusinessOptions}
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

                
                    <Editor
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
                      initialData={values?.responsibilities}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setFieldValue('responsibilities', data);
                      }}
                    />
        
                
                    <Editor
                      name="qualifications"
                      label="Qualifications"
                      initialData={values?.qualifications}
                      onChange={(_, editor) => {
                        const data = editor?.getData();
                        setFieldValue('qualifications', data);
                      }}
                    />

                    <Editor
                      name="benefits"
                      label="Benefits"
                      initialData={values.benefits}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setFieldValue('benefits', data);
                      }}
                    />


                    <div className="switchWrapper">
                      Accepting Applications{' '}
                      <Switch
                        checked={values.accepting_applications}
                        onChange={(checked) => setFieldValue('accepting_applications', checked)}
                      />
                    </div>

                    <section className={styles.buttonGroup}>
                 
                      <Button
                        variant="green"
                        type="submit"
                        disabled={ createJobMutation?.isPending}
                        
                        text={ 'Post Job'}
                        className={styles.btn}
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
