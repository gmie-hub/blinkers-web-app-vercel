import styles from "./index.module.scss";
import { getUserNotificationById } from "../request";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/store";
import RouteIndicator from "../../customs/routeIndicator";
import CustomSpin from "../../customs/spin";
import { AxiosError } from "axios";

const ViewNotification = () => {
  const { id } = useParams();
  const [user] = useAtom(userAtom);

  const [getAllUserNotificationQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-notification"],
        queryFn: () => getUserNotificationById(user?.id, parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const notifyData = getAllUserNotificationQuery?.data?.data?.data[0];

  const notifyError = getAllUserNotificationQuery?.error as AxiosError;
  const notifyErrorMessage =
    notifyError?.message || "An error occurred. Please try again later.";

  return (
    <div className="wrapper">
      <h2> Notification</h2>
      <RouteIndicator showBack={true} />

      {getAllUserNotificationQuery?.isPending ? (
      <CustomSpin />
    ) : getAllUserNotificationQuery?.isError ? (
      <h1 className="error">{notifyErrorMessage}</h1>
    ) : (
      <>
        <div className={styles.card}>
          <h3>Title</h3>
          <p>{notifyData?.title}</p>

          <h3>Description</h3>
          <p>{notifyData?.description}</p>
        </div>
      </>
    )}

    </div>
  );
};

export default ViewNotification;
