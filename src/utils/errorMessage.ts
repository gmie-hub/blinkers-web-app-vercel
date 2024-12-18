export const errorMessage = (error: any) => {

  return (
    error?.response?.data?.error ||
    error?.response?.data?.error[0] ||
    error?.response?.data?.message ||
    error?.response?.data?.Message ||
    error?.Message ||
    error?.response?.data?.title ||
    error?.message 
  );
};
