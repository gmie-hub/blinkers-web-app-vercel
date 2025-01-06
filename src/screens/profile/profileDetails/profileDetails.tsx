import styles from "./styles.module.scss";
import CallIcon from "../../../assets/callclaim.svg";
import { deleteUser, getApplicantsbyId } from "../../request";
import { useMutation, useQueries } from "@tanstack/react-query";
import { userAtom } from "../../../utils/store";
import { useAtomValue } from "jotai";
import { AxiosError } from "axios";
import CustomSpin from "../../../customs/spin";
import ChangePassword from "./changePassword";
import YourProfile from "./yourProfile";
import Button from "../../../customs/button/button";
import { App } from "antd";
import { errorMessage } from "../../../utils/errorMessage";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const user = useAtomValue(userAtom);
  const { notification } = App.useApp();
  const navigate = useNavigate()

  const [getProfileQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-profile"],
        queryFn: () => getApplicantsbyId(user?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
      },
    ],
  });

  const profileData = getProfileQuery?.data?.data;
  const profileDetailsError = getProfileQuery?.error as AxiosError;
  const profileDetailsErrorMessage =
    profileDetailsError?.message ||
    "An error occurred. Please try again later.";

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Deleted successfully",
      });
      navigate('/login')
    },
  });

  const DeleteUserHandler = async () => {
    try {
      // Call mutateAsync without the onSuccess callback, because it's already defined in useMutation
      await deleteUserMutation.mutateAsync();

    } catch (error: any) {
      // Handle error if the mutation fails
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  return (
    <div>
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
              <p className={styles.smalcard}>{profileData?.email || "email"}</p>
              <p className={styles.smalcard}>
                {profileData?.number || "phone number"}
              </p>

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
            <YourProfile profileData={profileData} />
          </div>
          <div className={styles.rightColumn}>
            <ChangePassword />
            <Button onClick={DeleteUserHandler} type="button" text="Delete Account" variant="redOutline" />
          </div>
        </div>
      )}
    
    </div>
  );
};
export default ProfileDetails;
