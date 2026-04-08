// issue-detail.model.ts
import { IssuePriority } from "./enum/IssuePriorityEnum";
import { IssueStatus } from "./enum/IssueStatusEnum";
import { IssueType } from "./enum/IssueTypeEnum";

export interface IssueComment {
  id: string;
  author: string;
  message: string;
  createdAt: Date;
}

export interface SubIssue {
  id: string;
  key: string;
  title: string;
  status: IssueStatus;
}

export interface IssueDetailModel {
  id: string;
  key: string;
  issuetype: IssueType;
  issuestatus: IssueStatus;
  title: string;
  parentIssueId?: string | null;
  description: string;

  reporter: string;
  assignee: string | null;

  priority: IssuePriority;

  createdDate: Date;
  updatedDate: Date;

  estimatedTime: string;   // e.g. "5h"
  loggedTime: string;      // e.g. "2h"

  comments: IssueComment[];
  subIssues: SubIssue[];

  storyPoints?: number;
  dueDate?: string; 
}
