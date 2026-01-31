import { IssueStatus } from "./enum/IssueStatusEnum";
import { IssueType } from "./enum/IssueTypeEnum";

export interface IssueResponseModel {
    id : string,
    key : string,
    issuetype :  IssueType,
    issuestatus : IssueStatus,
    title : string
}
 