import { message } from "antd";
import api from "../utils/apiClient";

export const getAllReviews = async (id: string, page?: number) => {
  const url = page
    ? `business/reviews?business_id=${id}&page=${page}`
    : `business/reviews?business_id=${id}`;

  return (await api.get(url))?.data as ReviewResponse;
};

// export const getAllJobs = async (page: number, search?: string | number) => {
//   return (await api.get(`jobs?page=${page}&search=${search}`))
//     ?.data as JobResponse;
// };
export const getAllJobs = async (page: number, search?: string | number) => {
  const url = search ? `jobs?page=${page}&search=${search}` : `jobs?page=${page}`;
  return (await api.get(url))?.data as JobResponse;
};
export const getAllState = async () => {
  return (await api.get(`states?per_page=${40}`))?.data as StateResponse;
};
export const getMyApplications = async (page: number,user_id:number) => {
  return (await api.get(`jobs/application?page=${page}&user_id=${user_id}`))?.data as JobResponse;
};


export const getLGAbyStateId = async (stateId: number) => {
  return (await api.get(`local-govt?state_id=${stateId}`))?.data as LGAResponse;
};

// export const getAllJobs = async (page: number, search?: string | number) => {
//   const url = search ? `jobs?page=${page}&search=${search}` : `jobs?page=${page}`;
//   return (await api.get(url))?.data as JobResponse;
// };

export const getJobDetails = async (id: number) => {
  return (await api.get(`jobs/${id}`))?.data as JobDetailsResponse;
};
export const getIndustries = async (page?: number) => {
  // Construct the URL dynamically based on whether page is provided
  const url = page ? `industries?page=${page}&per_page=100` : `industries?per_page=100`;

  return (await api.get(url))?.data as any;
};

export const getProductDetails = async (id: number) => {
  return (await api.get(`ads/${id}`))?.data as ProductDetailsResponse;
};

export const getSubCategory = async (id: number) => {
  return (await api.get(`categories/sub?category_id=${id}`))
    ?.data as CategoryResponse;
};
export const getAllCategory = async (search?: string | number) => {
  const url = search
    ? `categories?search=${search}&per_page=${100}`
    : `categories?per_page=${100}`;
  return (await api.get(url))?.data as CategoryResponse;
};

export const getTrendingAds = async () => {
  return (await api.get(`ads/trending`))?.data as any;
};
export const getRecommededAds = async () => {
  return (await api.get(`/recommendations?type=${"ads"}`))?.data as any;
};

export const getPromotedAds = async () => {
  return (await api.get(`/banners`))?.data as any;
};

export const getAllBusiness = async (
  search: number | string,
  page?: number
) => {
  let url = `/businesses?search=${search}`;

  if (page !== undefined) {
    url += `&page=${page}`;
  }

  return (await api.get(url))?.data as any;
};

export const getMyAdzByUserId = async (user_id:number) => {
  return (await api.get(`/ads?per_page=${30}&user_id=${user_id}`))?.data as any;
};
export const getAllMarket = async (page?: number, search?: string | number, state_id?:number,local_government_area_id?:number) => {
  let url = `/ads?per_page=${50}`;

  const queryParams: string[] = [];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  if (search !== undefined && search !== "") {
    queryParams.push(`search=${search}`);
  }
  if (state_id !== undefined && state_id !== 0) {
    queryParams.push(`state_id=${state_id}`);
  }
  if (local_government_area_id !== undefined && local_government_area_id !== 0) {
    queryParams.push(`local_government_area_id=${local_government_area_id}`);
  }
  


  
  // if(sub_category_id !==undefined && sub_category_id.length !== 0){
  //   queryParams.push(`sub_category_id=${sub_category_id}`);
  // }

  if (queryParams.length > 0) {
    url += `&${queryParams.join("&")}`;
  }

  return (await api.get(url))?.data as AllProductaResponse;
};

export const CreateJob = async (payload: Partial<JobDatum>) => {
  return (await api.post("jobs", payload, {}))?.data as any;
};

export const FollowBusiness = async (payload: Partial<FollowBusiness>) => {
  return (await api.post("business/followers/toggle", payload, {}))
    ?.data as any;
};

export const FollowSeller = async (payload: Partial<FollowBusiness>) => {
  return (await api.post("followers/handle-action", payload, {}))
    ?.data as any;
};


export const WriteReviewApi = async (payload: Partial<ReviewDatum>) => {
  return (await api.post("business/reviews", payload, {}))?.data as any;
};

export const createBusiness = async (payload: FormData) => {
  return (
    await api.post("/businesses", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data;
};

export const createAds = async (payload: FormData) => {
  return (
    await api.post("/ads", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data;
};

export const UpdateAds = async (payload: Partial<ProductDatum>) => {
  return (await api.patch(`ads/${payload.id}`, payload, {}))?.data as Response;
};


export const ClaimBusinessApi = async (payload: FormData) => {
  return (
    await api.post("/business/claims", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data;
};

export const ProfInfoApi = async (payload: FormData) => {
  return (
    await api.post("/applicants", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data;
};
export const uploadAdsGallery = async (payload: FormData) => {
  return (
    await api.post('ads/image', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  )?.data;
};
export const uploadAdsVideo = async (payload: FormData) => {
  return (
    await api.post('ads/video', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  )?.data;
};


export const  deleteAdsGalarybyId = async ({ add_id, image_ids }: { add_id: number | string; image_ids: number[] }) => {
  return (
    await api.delete(`ads/image`, {
      data: {
        add_id, // Sending business_id and ids in the body
        image_ids,
      },
    })
  )?.data as any;
};


export const getAdsByUserId = async (id: number) => {
  return (await api.get(`/ads?user_id=1299&per_page=50${id}`))
    ?.data as AllProductaResponse;
};

export const getApplicantsbyId = async (id: number) => {
  return (await api.get(`/users/profile?user_id=${id}`))
    ?.data as UserDataResponse;
};

export const getBusinessById = async (id: number) => {
  return (await api.get(`/businesses/${id}`))?.data as BusinessDetailsResponse;
};
export const getFollowersByUser_id = async (follower_id: number,user_id: number) => {
  return (await api.get(`followers?follower_id=${follower_id}&user_id=${user_id}`))
    ?.data as BusinessFollowersResponse;
};
export const getFollowersByBusiness_id = async (user_id: number,business_id: number) => {
  // return (await api.get(`business/followers?business_id=${business_id}`))
  return (await api.get(`business/followers?user_id=${user_id}&business_id=${business_id}`))

    ?.data as BusinessFollowersResponse;
};

export const FlagJobApi = async (payload: Partial<FlagJob>) => {
  return (await api.post("/jobs/flag/toggle", payload))?.data as Response;
};

export const ApplyForJobApi = async (payload: Partial<FlagJob>) => {
  return (await api.post("/jobs/application", payload))?.data as Response;
};
export const CreateBusinessHourApi = async (
  payload: Partial<BusinessHourDatum>
) => {
  return (await api.post("businesses/hours", payload, {}))?.data as Response;
};

export const uploadGallery = async (payload: FormData) => {
  return (
    await api.post("businesses/gallery", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data;
};

export const deleteGalarybyId = async ({
  business_id,
  ids,
}: {
  business_id: number | string;
  ids: number[];
}) => {
  return (
    await api.delete(`businesses/gallery`, {
      data: {
        business_id, // Sending business_id and ids in the body
        ids,
      },
    })
  )?.data as any;
};

export const employmentTypeData = [
  {
    name: "full-time",
    value: "full-time",
  },
  {
    name: "part-time",
    value: "part-time",
  },
  {
    name: "contract",
    value: "contract",
  },
  {
    name: "other",
    value: "other",
  },
];

export const LevelData = [
  {
    name: "intern",
    value: "intern",
  },
  {
    name: "beginner",
    value: "beginner",
  },
  {
    name: "junior",
    value: "junior",
  },
  {
    name: "mid-level",
    value: "mid-level",
  },
  {
    name: "senior",
    value: "senior",
  },
];
export const jobTypeData = [
  {
    name: "on-site",
    value: "on-site",
  },
  {
    name: "hybrid",
    value: "hybrid",
  },
  {
    name: "remote",
    value: "remote",
  },
  {
    name: "other",
    value: "other",
  },
];

export const handleCopyLink = (textToCopy: string) => {
  if (!textToCopy) {
    message.warning("No text to copy.");
    return;
  }
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      message.success("copied to clipboard!");
    })
    .catch(() => {
      message.error("Failed to copy . Please try again.");
    });
};


export const getJobBYBusinessId = async (id: number) => {
  return (await api.get(`jobs?business_id=${id}`))?.data as JobResponse;
};

export const deleteJob = async ({ id }: { id: number }) => {
  return (await api.delete(`jobs/${id}`))?.data as JobDatum;
};
export const UpdateJob = async (payload: Partial<JobDatum>) => {
  return (await api.patch(`jobs/${payload.id}`, payload, {}))?.data as Response;
};

export const getAllApplication = async (page: number,job_id:number) => {
  return (await api.get(`jobs/application?page=${page}&job_id=${job_id}`))?.data as any;
};
export const getApplicationDetails = async (id: number) => {
  return (await api.get(`jobs/application/${id}`))?.data as ApplicantResponse;
};

export const updateApplicationStatus = async (payload: ApplicationStatusPayload, id: number) => {
  const response = await api.patch(`jobs/application/${id}`, payload);
  return response.data;
};

export const deleteAds = async ({ id }: { id: number }) => {
  return (await api.delete(`ads/${id}`))?.data as ProductDatum;
};

export const changePassword = async (payload: Partial<ChangePassword>) => {
  return (await api.patch(`users/change-password`, payload, {}))?.data as Response;
};

export const deleteUser = async () => {
  return (await api.delete(`/users/delete`))?.data ;
};  