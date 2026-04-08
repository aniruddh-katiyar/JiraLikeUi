export interface Activity {
  entityType: string;
  entityId: string;
  action: string;
  oldValue: string | null;
  newValue: string | null;
  performedBy: string;
  performByName : string;
  createdAt: string; // ISO string
}
