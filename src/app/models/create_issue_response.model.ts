export interface IssueResponse {
  id: string;                 // GUID
  key: string | null;         // nullable
  type: number;               // enum as number
  title: string;
  status: number;             // enum as number
  assigneeName: string;
}
