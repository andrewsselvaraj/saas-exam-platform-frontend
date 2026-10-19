/** One row of GET /api/orgs (catalog-service OrganizationResponse). */
export interface Organization {
  id: string;
  name: string;
  email: string;
  /** 'A' active, 'I' inactive ('D' deleted rows are not listed). */
  status: string;
  updatedBy: string;
  /** ISO local date-time, e.g. 2026-10-20T09:15:00. */
  updatedOn: string;
}
