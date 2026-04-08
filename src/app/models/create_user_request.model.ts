export interface CreateIssueRequest {
  title: string;
  description?: string;
  type: number;
  priority: number;
  parentIssueId?: string | null;

  assigneeId?: string | null;   // ✅ FIXED
  status?: number;
  storypoints?: number;
  dueDate?: string | null;
}