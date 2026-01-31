export interface CreateIssueRequest {
  type: number;                 // enum value
  title: string;
  description: string;
  parentIssueId?: string | null; // optional + nullable
  priority: number;             // enum value
}
