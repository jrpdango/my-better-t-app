// API Response Types

export interface User {
  id: string;
  email: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  industry?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  company?: Company;
  _count?: {
    sites: number;
    users: number;
  };
}

export interface Site {
  id: string;
  name: string;
  slug: string;
  description: string;
  tenantId: string;
  createdBy: string;
  department: string; // Added by API transformation
  status: string; // Added by API transformation
  lastActivity: string; // Maps to updatedAt
  createdAt: string;
  updatedAt: string;
  creator?: User;
  _count?: {
    pages: number;
    assets: number;
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content?: any;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  siteId: string;
  tenantId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: User;
}

export interface Asset {
  id: string;
  name: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  siteId: string;
  tenantId: string;
  uploadedBy: string;
  createdAt: string;
  uploader?: User;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
  order: number;
}

export interface Navigation {
  id: string;
  siteId: string;
  tenantId: string;
  structure: NavigationItem[];
  updatedAt: string;
}

export interface Theme {
  id: string;
  siteId: string;
  tenantId: string;
  primaryColor: string;
  secondaryColor: string;
  customCss?: string;
  updatedAt: string;
}

// API Response wrapper types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}

export interface SitesResponse {
  sites: Site[];
  total: number;
}

export interface PagesResponse {
  pages: Page[];
  total: number;
}

export interface AssetsResponse {
  assets: Asset[];
  total: number;
}

export interface TenantsResponse {
  tenants: Tenant[];
  total: number;
}

export interface TenantResponse {
  tenant: Tenant;
}

export interface NavigationResponse {
  navigation: Navigation | null;
  message?: string;
}

export interface ThemeResponse {
  theme: Theme | null;
  message?: string;
}
