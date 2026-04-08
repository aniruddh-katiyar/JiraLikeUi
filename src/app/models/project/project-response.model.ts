import { ProjectStatus } from "../enum/projectstatusEnum";

export interface ProjectResponseModel {
  id: string;      
  name: string;
  key: string;
  status: ProjectStatus;
  createdBy : string;
  createdDate : Date,
createdbyUserName : string
}
