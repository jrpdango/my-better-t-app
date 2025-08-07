// Mock data for ShortPoint Standalone application

export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "NORMAL";
  tenantId: string;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  name: string;
  slug: string;
  description: string;
  tenantId: string;
  createdBy: string;
  department: string;
  status: "active" | "inactive";
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: any;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  siteId: string;
  tenantId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
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
  previewUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
  order: number;
}

export interface SiteNavigation {
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

// Mock data
export const mockTenant: Tenant = {
  id: "tenant-1",
  name: "Acme Corporation",
  slug: "acme-corp",
  companyId: "company-1",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

export const mockUser: User = {
  id: "user-1",
  email: "admin@acme.com",
  name: "John Smith",
  role: "ADMIN",
  tenantId: "tenant-1",
  createdAt: "2024-01-01T00:00:00Z",
};

export const mockSites: Site[] = [
  {
    id: "site-1",
    name: "Human Resources",
    slug: "hr",
    description: "HR policies, benefits, and employee resources",
    tenantId: "tenant-1",
    createdBy: "user-1",
    department: "HR",
    status: "active",
    lastActivity: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "site-2",
    name: "Finance",
    slug: "finance",
    description: "Financial procedures, budgets, and expense reports",
    tenantId: "tenant-1",
    createdBy: "user-1",
    department: "Finance",
    status: "active",
    lastActivity: "2024-01-14T15:45:00Z",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "site-3",
    name: "IT Department",
    slug: "it",
    description: "IT support, software guides, and technical documentation",
    tenantId: "tenant-1",
    createdBy: "user-1",
    department: "IT",
    status: "active",
    lastActivity: "2024-01-16T08:15:00Z",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-16T08:15:00Z",
  },
  {
    id: "site-4",
    name: "Development",
    slug: "dev",
    description:
      "Development processes, coding standards, and project documentation",
    tenantId: "tenant-1",
    createdBy: "user-1",
    department: "Development",
    status: "active",
    lastActivity: "2024-01-16T12:00:00Z",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-16T12:00:00Z",
  },
  {
    id: "site-5",
    name: "Sales",
    slug: "sales",
    description: "Sales processes, customer resources, and marketing materials",
    tenantId: "tenant-1",
    createdBy: "user-1",
    department: "Sales",
    status: "active",
    lastActivity: "2024-01-13T17:20:00Z",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-13T17:20:00Z",
  },
  {
    id: "site-6",
    name: "Marketing",
    slug: "marketing",
    description: "Brand guidelines, campaign resources, and content templates",
    tenantId: "tenant-1",
    createdBy: "user-1",
    department: "Marketing",
    status: "inactive",
    lastActivity: "2024-01-10T14:30:00Z",
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
];

export const mockPages: Page[] = [
  {
    id: "page-1",
    title: "Employee Handbook",
    slug: "employee-handbook",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Welcome to our company handbook..." },
          ],
        },
      ],
    },
    status: "PUBLISHED",
    siteId: "site-1",
    tenantId: "tenant-1",
    createdBy: "user-1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "page-2",
    title: "Benefits Overview",
    slug: "benefits",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Our comprehensive benefits package includes...",
            },
          ],
        },
      ],
    },
    status: "PUBLISHED",
    siteId: "site-1",
    tenantId: "tenant-1",
    createdBy: "user-1",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "page-3",
    title: "IT Support",
    slug: "it-support",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "For technical assistance, please..." },
          ],
        },
      ],
    },
    status: "DRAFT",
    siteId: "site-3",
    tenantId: "tenant-1",
    createdBy: "user-1",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-16T08:15:00Z",
  },
];

export const mockAssets: Asset[] = [
  {
    id: "asset-1",
    name: "company-logo.png",
    filePath: "/assets/company-logo.png",
    fileType: "image/png",
    fileSize: 45678,
    siteId: "site-1",
    tenantId: "tenant-1",
    uploadedBy: "user-1",
    createdAt: "2024-01-01T00:00:00Z",
    previewUrl: "/assets/company-logo.png",
  },
  {
    id: "asset-2",
    name: "employee-handbook.pdf",
    filePath: "/assets/employee-handbook.pdf",
    fileType: "application/pdf",
    fileSize: 2345678,
    siteId: "site-1",
    tenantId: "tenant-1",
    uploadedBy: "user-1",
    createdAt: "2024-01-02T00:00:00Z",
  },
];

export const mockNavigation: SiteNavigation[] = [
  {
    id: "nav-1",
    siteId: "site-1",
    tenantId: "tenant-1",
    structure: [
      {
        id: "nav-item-1",
        label: "Home",
        href: "/sites/site-1",
        order: 1,
      },
      {
        id: "nav-item-2",
        label: "Policies",
        href: "/sites/site-1/policies",
        order: 2,
        children: [
          {
            id: "nav-item-2-1",
            label: "Employee Handbook",
            href: "/sites/site-1/pages/page-1",
            order: 1,
          },
          {
            id: "nav-item-2-2",
            label: "Benefits",
            href: "/sites/site-1/pages/page-2",
            order: 2,
          },
        ],
      },
      {
        id: "nav-item-3",
        label: "Resources",
        href: "/sites/site-1/resources",
        order: 3,
      },
    ],
    updatedAt: "2024-01-15T10:30:00Z",
  },
];

export const mockThemes: Theme[] = [
  {
    id: "theme-1",
    siteId: "site-1",
    tenantId: "tenant-1",
    primaryColor: "#3161D1",
    secondaryColor: "#5774a8",
    customCss: "",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];
