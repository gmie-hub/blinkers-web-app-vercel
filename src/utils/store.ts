import { atomWithStorage } from "jotai/utils";
import { routeParts } from "../routes";
import { CoverLetter, Education, EmploymentHistory, LinkData, Route, RoutesPart, SkillsData, SocialInfo } from "./type";


const EducationInfo = JSON.parse(localStorage.getItem("education-info") ?? "[]");
const EmpHistoryInfo = JSON.parse(localStorage.getItem("employment-History") ?? "[]");
const CoverLetterInfo = JSON.parse(localStorage.getItem("cover-letter") ?? "{}");
const skillData = JSON.parse(localStorage.getItem("skill-data") ?? "[]");
const LinkDataInfo = JSON.parse(localStorage.getItem("link-data") ?? "[]");


const socialInfo = JSON.parse(localStorage.getItem("social-info") ?? "{}");
const routes = JSON.parse(localStorage.getItem("routes") ?? "[]");
const routesParts = JSON.parse(
  localStorage.getItem("route-part") ?? JSON.stringify(routeParts)
);


export const EducationInfoAtom = atomWithStorage<Education[]>(
  "education-info", 
  EducationInfo 
);

export const EmploymentHistoryInfoAtom = atomWithStorage<EmploymentHistory[] >(
  "employment-History", 
  EmpHistoryInfo 
);

export const CoverLetterInfoAtom = atomWithStorage<CoverLetter>(
  "cover-letter", 
  CoverLetterInfo 
);
export const SkilsInfoAtom = atomWithStorage<SkillsData[]>(
  "skill-data", 
  skillData 
);

export const LinkInfoAtom = atomWithStorage<LinkData[]>(
  "link-data", 
  LinkDataInfo 
);




export const socialInfoAtom = atomWithStorage<SocialInfo>(
  "social-info",
  socialInfo
);
export const routesArrayAtom = atomWithStorage<Route[]>("routes", routes);
export const routesPartsAtom = atomWithStorage<RoutesPart>(
  "route-part",
  routesParts
);

export interface ExtendedUser {
  OrganizationId: string;
  UserRole: string;
  Email: string;
  OrgName: string;
  UserId: string;
}

export interface UserData {
  data: UserLogin;
  message: string;
}

export interface UserLogin {
  address?: string;
  address_lat?: string;
  address_long?: string;
  apple_id?: string;
  business_claim?: string;
  claim_status?: string;
  country_code: string;
  created_at: string;
  dob?: string;
  email: string;
  email_token: string;
  email_token_status: number;
  email_unverified_until?: string;
  email_verified_at?: string;
  facebook_address?: string;
  facebook_id?: string;
  google_id?: string;
  id: number;
  instagram_address?: string;
  isManageInterestSaved: boolean;
  is_applicant: boolean;
  is_email_verified: string;
  is_login: string;
  is_password_changed: string;
  last_login?: string;
  local_government_area_id?: string;
  name: string;
  number: string;
  profile_image?: string;
  register_method: string;
  remember_token?: string;
  role: string;
  security_token: string;
  seller_created_at?: string;
  slug?: string;
  social_login: string;
  state_id?: string;
  status: string;
  store_bio?: string;
  store_name?: string;
  token: string;
  twitter_address?: string;
  updated_at: string;
  website_address?: string;
  applicantId?:number;
}

export const userAtom = atomWithStorage<UserData | undefined | null>(
  "blinkers-web&site#",
  JSON.parse(localStorage.getItem("blinkers-web&site#")!) ?? undefined
);
