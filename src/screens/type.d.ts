interface JobDatum {
  title: string;
  business_id: number;
  status: string;
  employment_type: string;
  job_type: string;
  level: string;
  industry_id: string;
  is_admin: boolean;
  is_open: boolean;
  location: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  benefits: string;
  id: number;
  start_date: string;
  end_date: string;
  total_applicant: number;
  business: AllBusinessesDatum;
  renumeration: string;
  created_at: string;
  applicant: Applicant;
  total_flags: number;
  business: Business;
  total_feedbacks: number;
  related_jobs: RelatedJobData[];
  
}

interface RelatedJobData {
  benefits?: string;
  business_id: number;
  created_at: string;
  description?: string;
  employment_type: string;
  end_date: string;
  id: number;
  industry: string;
  is_admin: number;
  is_open: boolean;
  job_type: string;
  level: string;
  location: string;
  qualifications?: string;
  renumeration: string;
  responsibilities?: string;
  start_date: string;
  status: string;
  title: string;
  total_applicant: number;
  total_feedbacks: number;
  total_flags: number;
  updated_at: string;
}

interface JobResponse extends Response {
  data: JobData;
}
interface JobData {
  data: JobDatum[];
  total: number;
}

interface JobDetailsResponse extends Response {
  data: JobDatum;
}

interface ReviewDatum {
  business_id: string;
  user_id: number;
  rating: number;
  review: string;
  created_at: stringg;
  user?:UserData;
  from_user?:from_user;

}
interface from_user {
  name
}

interface AddToFav {
  add_id: string;
  status: number;
  id:number;
}

interface ContactUs {
  id: string,
  name: string,
  mobileNum:string,
  email: string,
  subject: string,
  message: string,
  reply: string,
  is_read: number,
  created_at: string,
  updated_at: string,
}

interface ReviewData {
  data: ReviewDatum[];
  total: number;
}
interface ReviewResponse extends Response {
  data: ReviewData;
}

interface AllBusinessesResponse extends Response {
  data: AllBusinessesData;
}

interface AllProductaResponse extends Response {
  data: AllProductData;
}

interface ProductDetailsResponse extends Response {
  data: ProductDatum;
}

interface BusinessDetailsResponse extends Response {
  data: AllBusinessesDatum;
}

interface FlagJob {
  job_id: string;
  applicant_id: stirng;
  action: string;
  reason: string;
}
interface FlagSeller{
  user_id: number,
  seller_id: number,
  action: string,
  reason: string
}
interface FollowBusinessDatum {
  business_id: number;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  follower_id?:number
}

interface BusinessFollowersResponse extends Response {
  data: BusinessFollowersData;
}
interface BusinessFollowersData {
  data: FollowBusinessDatum[];
}

interface FlagJob {
  job_id: string;
  applicant_id: stirng;
  message: string;
  user_id:number
}

interface AllBusinessesData {
  current_page: number;
  data: AllBusinessesDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

interface AllBusinessesDatum {
  id: number;
  name: string;
  slug: string;
  email: string;
  phone: null;
  bio: null;
  about: null;
  address: null;
  city: null;
  state: null;
  country: null;
  website: null;
  instagram: null;
  facebook: null;
  whatsapp: null;
  status: string;
  business_status: string;
  category_id: number;
  user_id: null | number;
  claimed_by: null | number;
  assigned_at: null | string;
  created_at: string;
  updated_at: string;
  is_open: boolean;
  average_rating: number;
  total_rating: number;
  category: Category;
  business_hours: hour[];
  gallery: gallery[];
  logo: string;
  total_followers: number;
  average_rating: number;
  instagram: string;
  related_businesses: any;
  total_ads:number ;

}

interface AllProductData {
  current_page: number;
  data: ProductDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
interface ProductDatum {
  favCreatedAt:string
  category:CategoryDatum
  business_id?: number | null;
  category_id: number;
  cost_price?: string | null;
  created_at: string;
  description: string;
  description_tags?: string[];
  discount_price?: string | null;
  from_date?: string | null;
  id: number ;
  isFavourite: boolean;
  is_admin_ad: number;
  local_government_area_id?: number | null;
  pickup_address: string;
  pickup_lat: string;
  pickup_lng: string;
  price: string | number;
  seller_email?: string | null;
  seller_info?: string | null;
  slug: string;
  state_id?: number | null;
  status: number;
  sub_category_id?: number | null;
  technical_details?: string | null;
  title: string;
  to_date?: string | null;
  updated_at: string;
  url?: string | null;
  user_id: number;
  local_govt: local_govt;
  state: state;
  add_images: add_imagesDatum[];
  related_ads: RelatedProduct[];
  user: UserData;
  views: number;
  averageRating: string;
  user_id: number;
  add_videos:add_imagesDatum[];
  cover_image_url:string;
  image_url:string;
  average_rating:string;
  total_rating:string;

}

interface RelatedProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discount_price: number;
  add_images: add_imagesDatum[];
  created_at: string;
  local_govt?: local_govt;
  state?: state;
  user_id:number
}

interface local_govt {
  id: number;
  local_government_area: string;
}
interface state {
  id: number;
  state_name: string;
}

interface add_imagesDatum {
  add_image: string;
  add_id: number;
  id: number;
  is_featured: number;
  image_url:string;
  add_video:string;
  
}

interface ProffessionDetails {
  specialization: string;
  cv_url: string;
  cover_letter_url: string;
  // employment_history: EmploymentHistory[];
  // education: Education[];
  // skill: string[];
  // links: LinkData[];
}

interface applicantDetailsResponse extends Response {
  data: ProffessionDetails;
}

interface Applicant {
  id: number;
  user_id: number;
  cv_url: string;
  cover_letter_url: string;
  specialization: string;
  education?: Education[];
  employment_history?: EmploymentHistory[];
  links?: Link[];
  created_at: string;
  updated_at: string;
  skills;
  user?: UserLogin;
  industries?:IndustriesData
}

// interface Education {
//   degree: string;
//   institution: string;
//   start_date: string;
//   end_date: string;
// }

// interface Link {
//   url: string;
//   type: string;
// }

interface UserData {
  id: number;
  name: string;
  slug: string | null;
  email: string;
  number: string;
  address: string;
  address_lat: string;
  address_long: string;
  apple_id: string | null;
  business: string | null;
  business_claim: string | null;
  claim_status: string | null;
  country_code: string;
  created_at: string;
  dob: string | null;
  date_of_birth?:string;
  email_token: string;
  email_token_status: number;
  email_unverified_until: string;
  email_verified_at: string | null;
  facebook_address: string | null;
  facebook_id: string | null;
  google_id: string | null;
  instagram_address: string | null;
  is_applicant: boolean;
  is_email_verified: string;
  is_login: string;
  is_password_changed: string;
  last_login: string;
  local_government_area_id: number | null;
  profile_image: string | null | any;
  register_method: string;
  remember_token: string | null;
  role: string;
  seller_created_at: string | null;
  social_login: string;
  state_id: number | null;
  status: string;
  store_bio: string | null;
  store_name: string | null;
  token: string;
  twitter_address: string | null;
  updated_at: string;
  website_address: string | null;
  applicant?: Applicant;
  total_ads:number ;
  industries:any;
  total_followers:number;
  total_ads:number;
  total_rating:number;
}

interface UserDataResponse extends Response {
  data: UserData;
  message: string;
}

interface Banner {
  brand_url: string;
  clicks: number;
  created_at: string;
  discount?: string | null;
  end_date: string;
  id: number;
  image: string;
  image_full: string;
  order: number;
  seller_info: string;
  start_date: string;
  title: string;
  updated_at: string;
}

interface PromotedAdsResponse {
  current_page: number;
  data: Banner[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface CategoryResponse extends Response {
  data: CategoryData;
}

interface CategoryData {
  current_page: number;
  data: CategoryDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

interface CategoryDatum {
  id: number;
  slug: string;
  title: string;
  image: string;
  resize_image: string;
  created_at: string;
  updated_at: string;
}
interface StateDatum {
  created_at: string;
  id: number;
  state_name: string;
  updated_at: string;
}
interface StateData {
  data: StateDatum[];
  total: number;
}

interface StateResponse extends Response {
  data: StateData;
}
interface LGADatum {
  id: 10;
  state_id: 1;
  local_government_area: string;
  created_at: string;
  updated_at: string;
  state: StateDatum;
}
interface LGAData {
  data: LGADatum[];
  total: number;
}


interface LGAResponse extends Response {
  data: LGAData;
}

interface Payload {
  skills?: SkillsData[];
  jobLink?: LinkData[];
  Education?: Education[];
  EmpHistory?: EmploymentHistory[];
  coverLetter?: any;
}

interface FollowBusiness {
  business_id: number;
  user_id: number;
  action: string;
}

interface gallery {
  business_id: number;
  created_at: string;
  id;
  number;
  type: string;
  url: string;
}

interface BusinessHourDatum {
  business_id?: number;
  hours?: hour[];
}

interface BusinessStatResponse extends Response {
  data: BusinessHourDatum;
}
interface hour {
  day: string;
  open_time: string;
  close_time;
  string;
}

interface ApplicantResponse {
  message: string;
  status: boolean;
  data: JobApplicationData;
  
}
interface ApplicDetailsResponse {
  message: string;
  status: boolean;
  data: JobApplication;
  
}



interface JobApplicationData {
  current_page: number;
  data: JobApplication[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  applicant:Applicant,
 
}

interface JobApplication {
  id: number;
  job_id: number;
  applicant_id: number;
  business_id: number;
  status: string;
  message: string;
  created_at: string;
  updated_at: string;
  applicant: Applicant;
  job:JobDatum
  business:AllBusinessesDatum
  related_jobs:JobDatum[]
}

interface ApplicationStatusPayload {
  status: string; 
  message? :string
}
interface JobItem {
  id: number;
  title: string;
  job_type: string;
  status: string;
  total_applicant: number;
  start_date: string;
}

interface IndustriesDatum {
  name: string;
  id: number;
  created_at:string;
  updated_at:string;
}

interface ChangePassword {
  current_password:string
  password: string;
  confirm_password:string;
}
interface ReplyReviewPayload {
  status?: string;
  owner_comment?: string;
}