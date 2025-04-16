import styles from "./index.module.scss";
import { getUserNotificationById,  } from "../request";
import {  useQueries,  } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/store";
import RouteIndicator from "../../customs/routeIndicator";

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

  

  return (
    <div className="wrapper">
      <h2> Notification</h2>
      <RouteIndicator showBack={true}/>


      <div className={styles.card}>
        <h3>Title</h3>
        <p>{notifyData?.title}</p>
        <h3>Description</h3>
        <p>{notifyData?.description}</p>

   
      </div>
  
    </div>
  );
};

export default ViewNotification;
