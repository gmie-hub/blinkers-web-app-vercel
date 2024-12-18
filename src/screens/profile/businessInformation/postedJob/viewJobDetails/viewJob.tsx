import styles from './viewJob.module.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Card from "../../../../../customs/card/card";
import { getJobDetails } from '../../../../request';
import RouteIndicator from '../../../../../customs/routeIndicator';
import Button from '../../../../../customs/button/button';
import { formatDateOnly } from '../../../../../utils/formatTime';
import StatusBadge from '../../../../../partials/statusBadge/statusBadge';
import ReusableModal from '../../../../../partials/deleteModal/deleteModal';
import ModalContent from '../../../../../partials/successModal/modalContent';
import JobDetailsElements from './jobDetails/jobDetails';
import DescriptionElement from './descriptionElement/descriptionElement';

interface ViewJobDeatilsProps {
  title?: string;
  name?: JSX.Element | string;
  icon?: JSX.Element;
}
/* eslint-disable no-empty-pattern */
export default function ViewJobDeatils({}: ViewJobDeatilsProps) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSucessful] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/jobs/edit-job/2`);
  };

  const handleDelete = () => {
    setIsDeleteModal(false);
    setIsDeleteSucessful(true);
  };


  const [getJobDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ['get-jobs-details'],
        queryFn: () => getJobDetails(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });
  const JobDetailsData = getJobDetailsQuery?.data?.data;

  const getStatus = () => {
    let status;

    switch (JobDetailsData?.status) {
      case '0':
        status = 'InActive';
        break;
      case '1':
        status = 'Active';
        break;
      case '2':
        status = 'Close';
        break;
      default:
        status = 'Banned';
    }

    return status;
  };



  return (
    <div className={styles.wrapper}>
      <RouteIndicator showBack={true} />

      <Card style={styles.card}>
        <div className={styles.spaceBetween}>
          <h2>Job Details</h2>
          <div className={styles.tabsWrapper}>
            
              <Button
                type="button"
                // icon={<EditIcon />}
                text="Edit Jobs"
                className={styles.buttonStyle}
                onClick={handleEdit}
              />
              <Button
                type="button"
                variant="redOutline"
                // icon={<DeleteIcon />}
                text="Delete Jobs"
                className={styles.buttonStyle}
                onClick={() => setIsDeleteModal(true)}
              />
           
          </div>
        </div>
        <div>
          <div className={styles.subCard}>
            <JobDetailsElements title={'Job Title'} name={JobDetailsData?.title || ''} />
            <JobDetailsElements title={'Company Name'} name={JobDetailsData?.business?.name} />
            <JobDetailsElements title={'Location'} name={JobDetailsData?.location} />

            <JobDetailsElements title={'Job Type'} name={JobDetailsData?.job_type} />
            <JobDetailsElements title={'Job Level'} name={JobDetailsData?.level} />
            <JobDetailsElements title={'Work Arrangement'} name={'JobDetailsData?.job_type'} />

            <JobDetailsElements title={'Salary'} name={'JobDetailsData?.salary'} />
            <JobDetailsElements title={'No Of Applicants'} name={JobDetailsData?.total_applicant?.toString()} />
            <JobDetailsElements title={'Date Posted'} name={formatDateOnly(JobDetailsData?.start_date || '')} />

            <JobDetailsElements title={'Status'} name={<StatusBadge status={getStatus()} />} />
          </div>
          <div className={styles.wrapper1}>
            <DescriptionElement
              title="Job Description"
              showPoints={false}
              description={[JobDetailsData?.description || '']}
            />

            <DescriptionElement title="Key Responsibilities" description={[JobDetailsData?.responsibilities || '']} />
            <DescriptionElement title="Qualifications" description={[JobDetailsData?.qualifications || '']} />

            <DescriptionElement title="Benefits" description={[JobDetailsData?.benefits || '']} />
            <br />
          </div>
          {/* </Card> */}
          {/* <DeleteModalContent
        open={isDeleteModal}
        handleCancel={() => setIsDeleteModal(false)}
        handleClick={handleDelete}
      /> */}

          <ReusableModal
            open={isDeleteModal}
            handleCancel={() => setIsDeleteModal(false)}
            handleConfirm={handleDelete}
            title="Are You Sure You Want to Delete This Job?"
            description="All details about this job will be deleted along with the user applications."
            confirmText="Yes, Delete Job"
            cancelText="No, Go Back"
          />

          <ModalContent
            open={isDeleteSuccessful}
            handleCancel={() => setIsDeleteSucessful(false)}
            handleClick={() => {
              setIsDeleteSucessful(false);
            }}
            text={'Job Updated Successfully'}
          />
        </div>{' '}
      </Card>
    </div>
  );
}
/* eslint-disable no-empty-pattern */

