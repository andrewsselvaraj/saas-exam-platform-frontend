/**
 * GET /api/orgs/{orgId}/tree (catalog-service HierarchyController): an organisation's classes, subjects and
 * chapters with question counts. Deleted rows are left out; statuses are 'A' active or 'I' inactive.
 */
export interface OrgTree {
  id: string;
  name: string;
  status: string;
  classes: ClassNode[];
}

export interface ClassNode {
  id: string;
  name: string;
  status: string;
  subjects: SubjectNode[];
}

export interface SubjectNode {
  id: string;
  name: string;
  status: string;
  /** All of the subject's questions, with or without a chapter. */
  questionCount: number;
  /** Questions not filed under any chapter. */
  unfiledQuestionCount: number;
  chapters: ChapterNode[];
}

export interface ChapterNode {
  id: string;
  name: string;
  status: string;
  questionCount: number;
}
