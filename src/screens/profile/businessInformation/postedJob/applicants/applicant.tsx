// import styles from './index.module.scss';
import { PaginationProps, Spin, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { useQueries } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { formatDateOnly } from '../../../../../utils/formatTime';
import StatusBadge from '../../../../../partials/statusBadge/statusBadge';
import Button from '../../../../../customs/button/button';
import { getAllApplication } from '../../../../request';
import RouteIndicator from '../../../../../customs/routeIndicator';

const Applicants = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  // const handleNavigateToViewApplicantDetails = useCallback(() => {
  //   navigate(`/jobs/view-applicant/${id}`);
  // }, [navigate]);

  const handleNavigateToViewApplicantDetails = useCallback(
    (id: number) => {
      // navigate(`/jobs/view-job-details`);

      navigate(`/jobs/view-applicant/${id}`);
    },
    [navigate],
  );

  const columns: ColumnsType<JobDatum> = [
    {
      title: 'Name of  Applicants',
      dataIndex: 'applicant_id',
      key: 'applicant_id',
      render: (_, record) => record?.applicant?.user?.name,
    },
    {
      title: 'Date Applied',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => formatDateOnly(record?.created_at),
    },
    {
      title: 'Status',
      dataIndex: 'status',  
      key: 'status',
      render: (_, { status }) => (
        <StatusBadge
          status={status === '0' ? 'InActive' : status === '1' ? 'Pending' : status === '2' ? 'Approved' : 'Rejected'}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          type="button"
          variant="white"
          text="View More"
        //   className={styles.actionBtn}
          onClick={() => {
            handleNavigateToViewApplicantDetails(record?.id);
          }}
        />
      ),
    },
  ];

  const [getAllApplicantQuery] = useQueries({
    queries: [
      {
        queryKey: ['get-all-job-applicants',id],
        // queryFn: () => getjobApplicationbyJobId(parseInt(id!)),
        queryFn: ()=>getAllApplication(currentPage,parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });
  const Applicants = getAllApplicantQuery?.data?.data?.data;
  // const Applicants = Array.isArray(getAllApplicantQuery?.data?.data) ? getAllApplicantQuery.data.data : [];

  const jobApplicantsError = getAllApplicantQuery?.error as AxiosError;
  const jobApplicantsErrorMessage = jobApplicantsError?.message || 'An error occurred. Please try again later.';

  return (
    <div className='wrapper'>
      {/* <Card style={styles.card}> */}
      {/* <div>
          <h3>Jobs</h3>

          <div>
            <Button onClick={()=>{handleNavigateToPostAJob()}} type="button" icon={<AddIcon />} text="Post A Job" className={styles.buttonStyle} />
          </div>
        </div> */}

      {/* <div> */}
      <RouteIndicator showBack/>

      {getAllApplicantQuery?.isLoading ? (
        <Spin />
      ) : getAllApplicantQuery?.isError ? (
        <h1 className="error">{jobApplicantsErrorMessage}</h1>
      ) : (
        <Table
          columns={columns}
          dataSource={Applicants}
          pagination={{
            current: currentPage,
            total: getAllApplicantQuery?.data?.data?.total,
            onChange: onChange,
            position: ['bottomCenter'],
            pageSize:20 
          }}
          scroll={{ x: 'max-content' }}
          locale={{
            // emptyText: <EmptyTableState headerText="No Job Applicant Added Yet" bodyText="" />,
            
          }}
        />
      )}
    </div>
  );
};

export default Applicants;
