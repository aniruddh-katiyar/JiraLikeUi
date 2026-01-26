
export interface ProjectResponseModel {
  id: string;      
  name: string;
  key: string;
  status: 'Active' | 'Inactive';
  createdBy : string;
  createdDate : Date,
createdbyUserName : string
}
