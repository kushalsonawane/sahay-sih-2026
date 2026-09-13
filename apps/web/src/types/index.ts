export * from '@sahay/shared';

export interface FilterOptions {
  searchQuery: string;
  riskLevel: string;
  caseStage: string;
  district: string;
  trend: string;
  alertType?: string;
  severity?: string;
  status?: string;
  interventionType?: string;
  priority?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
