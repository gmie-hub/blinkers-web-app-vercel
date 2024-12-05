import { message } from "antd";
import api from "../utils/apiClient";

export const getAllJobs = async (page: number, search?: string | number) => {
  // return (await api.get(`jobs?page=${page}&/search=${search}`))?.data as JobResponse;
  return (await api.get(`jobs?page=${page}&search=${search}`))
    ?.data as JobResponse;
};

export const getJobDetails = async (id: number) => {
  return (await api.get(`jobs/${id}`))?.data as JobDetailsResponse;
};

export const getProductDetails = async (id: number) => {
  return (await api.get(`ads/${id}`))?.data as ProductDetailsResponse;
};

export const getAllCategory = async () => {
  return (await api.get('categories'))?.data as CategoryResponse;
};

export const getTrendingAds = async () => {
  return (await api.get(`ads/trending`))?.data as any;
};
export const getRecommededAds = async () => {
  return (await api.get(`/recommended?type=${'ads'}`))?.data as any;
};


export const getPromotedAds = async () => {
  return (await api.get(`/banners`))?.data as any;
};



export const getAllBusinessSearch = async (search?: string) => {
  return (await api.get(`/businesses?search=${search}`))?.data as AllBusinessesResponse;
};

export const getAllMarket = async (page: number,search?: string | number) => {
  return (await api.get(`/ads?page=${page}&search=${search}`))?.data as AllProductaResponse;
};

export const CreateJob = async (payload: Partial<JobDatum>) => {
  return (await api.post('jobs', payload, {}))?.data as any;
};


export const createBusiness = async (payload: FormData) => {
  return (
    await api.post('/businesses', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  )?.data;
};

export const ProfInfoApi = async (payload: FormData) => {
  return (
    await api.post('/applicants', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  )?.data;
};

export const UpdateProfInfoApi = async (payload: FormData) => {
  return (
    await api.patch('/applicants/5', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  )?.data;
};

export const getApplicantsbyId = async (id: number) => {
  return (await api.get(`/users/profile?user_id=${id}`))?.data as UserDataResponse;
};




export const FlagJobApi = async (payload: Partial<FlagJob>) => {
  return (await api.post("/jobs/flag/toggle", payload))?.data as Response;
};

export const ApplyForJobApi = async (payload: Partial<FlagJob>) => {
  return (await api.post("/jobs/application", payload))?.data as Response;
};


export const employmentTypeData = [
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

export const LevelData = [
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
export   const JobTypeData = [
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

export const handleCopyLink = (textToCopy:string) => {
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
}
