import { UploadFile } from "antd";

interface BasicInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
interface SocialInfo {
  facebook: string;
  instagram: string;
  whatsapp: string;
  logo: UploadFile | any;
}
export interface Route {
  name: string;
  route: string;
  params: string;
  isRoot?: boolean;
}

interface RoutesPart {
  [x: string]: {
    route: string;
    name: string;
    params: string;
  };
}
