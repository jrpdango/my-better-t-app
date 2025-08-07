import {
  PrismaClient,
  UserRole,
  PageStatus,
  LicenseType,
  SiteUserRole,
} from "../generated";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

// Read companies data
const companiesData = JSON.parse(
  readFileSync(join(__dirname, "companies.json"), "utf-8")
);

// Mock user data for Clerk integration
const mockUsers = [
  {
    clerkId: "user_shortpoint_admin",
    email: "admin@shortpoint.com",
    role: UserRole.ADMIN,
  },
  {
    clerkId: "user_shortpoint_normal",
    email: "user@shortpoint.com",
    role: UserRole.NORMAL,
  },
  {
    clerkId: "user_acme_admin",
    email: "admin@acme.com",
    role: UserRole.ADMIN,
  },
  {
    clerkId: "user_acme_normal",
    email: "user@acme.com",
    role: UserRole.NORMAL,
  },
];

// Mock site templates for different departments
const siteTemplates = [
  {
    name: "Human Resources",
    slug: "hr",
    description: "HR policies, benefits, and employee resources",
    department: "HR",
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Financial procedures, budgets, and expense reports",
    department: "Finance",
  },
  {
    name: "IT Department",
    slug: "it",
    description: "IT support, software guides, and technical documentation",
    department: "IT",
  },
  {
    name: "Development",
    slug: "dev",
    description:
      "Development processes, coding standards, and project documentation",
    department: "Development",
  },
  {
    name: "Sales",
    slug: "sales",
    description: "Sales processes, customer resources, and marketing materials",
    department: "Sales",
  },
  {
    name: "Marketing",
    slug: "marketing",
    description: "Brand guidelines, campaign resources, and content templates",
    department: "Marketing",
  },
];

// Mock page content templates
const pageTemplates = [
  {
    title: "Welcome",
    slug: "welcome",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Welcome to Our Department" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is the main landing page for our department. Here you can find important information, policies, and resources.",
            },
          ],
        },
      ],
    },
    status: PageStatus.PUBLISHED,
  },
  {
    title: "Policies & Procedures",
    slug: "policies",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Policies & Procedures" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Important policies and procedures for our department operations.",
            },
          ],
        },
      ],
    },
    status: PageStatus.PUBLISHED,
  },
  {
    title: "Resources",
    slug: "resources",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Department Resources" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Access important documents, forms, and tools.",
            },
          ],
        },
      ],
    },
    status: PageStatus.DRAFT,
  },
];

// Navigation structure template
const navigationTemplate = [
  {
    id: "nav-home",
    label: "Home",
    href: "/welcome",
    order: 1,
  },
  {
    id: "nav-policies",
    label: "Policies",
    href: "/policies",
    order: 2,
    children: [
      {
        id: "nav-policies-general",
        label: "General Policies",
        href: "/policies",
        order: 1,
      },
    ],
  },
  {
    id: "nav-resources",
    label: "Resources",
    href: "/resources",
    order: 3,
  },
];

// Theme color palettes for different departments
const themeColors = [
  { primary: "#3161D1", secondary: "#5774A8" }, // Blue - IT/Tech
  { primary: "#059669", secondary: "#065F46" }, // Green - Finance
  { primary: "#DC2626", secondary: "#991B1B" }, // Red - HR
  { primary: "#7C3AED", secondary: "#5B21B6" }, // Purple - Marketing
  { primary: "#EA580C", secondary: "#C2410C" }, // Orange - Sales
  { primary: "#0891B2", secondary: "#0E7490" }, // Cyan - Development
];

// Mock assets
const mockAssets = [
  {
    name: "department-logo.png",
    filePath: "/uploads/department-logo.png",
    fileType: "image/png",
    fileSize: 45678,
  },
  {
    name: "employee-handbook.pdf",
    filePath: "/uploads/employee-handbook.pdf",
    fileType: "application/pdf",
    fileSize: 2345678,
  },
  {
    name: "training-video.mp4",
    filePath: "/uploads/training-video.mp4",
    fileType: "video/mp4",
    fileSize: 15678900,
  },
];

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean existing data (in reverse order due to foreign key constraints)
  await prisma.siteUser.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.navigation.deleteMany();
  await prisma.pageVersion.deleteMany();
  await prisma.page.deleteMany();
  await prisma.site.deleteMany();
  await prisma.tenantLicense.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.company.deleteMany();

  console.log("🧹 Cleaned existing data");

  // Create companies
  const companies = await Promise.all(
    companiesData.map(async (companyData: any) => {
      const company = await prisma.company.create({
        data: {
          name: companyData.name,
          slug: companyData.slug,
          industry: companyData.industry,
          website: companyData.website,
        },
      });
      console.log(`✅ Created company: ${company.name}`);
      return company;
    })
  );

  // Create tenants (one per company)
  const tenants = await Promise.all(
    companies.map(async (company) => {
      const tenant = await prisma.tenant.create({
        data: {
          name: `${company.name} Tenant`,
          slug: `${company.slug}-tenant`,
          companyId: company.id,
        },
      });
      console.log(`✅ Created tenant: ${tenant.name}`);
      return tenant;
    })
  );

  // Create tenant licenses
  await Promise.all(
    tenants.map(async (tenant, index) => {
      const licenseTypes = [
        LicenseType.BASIC,
        LicenseType.PREMIUM,
        LicenseType.ENTERPRISE,
      ];
      const licenseType = licenseTypes[index % licenseTypes.length];

      const limits = {
        [LicenseType.BASIC]: { maxSites: 5, maxUsers: 25, maxStorageGb: 10 },
        [LicenseType.PREMIUM]: {
          maxSites: 20,
          maxUsers: 100,
          maxStorageGb: 50,
        },
        [LicenseType.ENTERPRISE]: {
          maxSites: 100,
          maxUsers: 500,
          maxStorageGb: 200,
        },
      };

      await prisma.tenantLicense.create({
        data: {
          tenantId: tenant.id,
          licenseType,
          maxSites: limits[licenseType].maxSites,
          maxUsers: limits[licenseType].maxUsers,
          maxStorageGb: limits[licenseType].maxStorageGb,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          isActive: true,
        },
      });
      console.log(`✅ Created license for tenant: ${tenant.name}`);
    })
  );

  // Create users
  const users = [];
  for (
    let tenantIndex = 0;
    tenantIndex < Math.min(tenants.length, 2);
    tenantIndex++
  ) {
    const tenant = tenants[tenantIndex];

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        clerkId: mockUsers[tenantIndex * 2].clerkId,
        email: mockUsers[tenantIndex * 2].email,
        role: mockUsers[tenantIndex * 2].role,
        tenantId: tenant.id,
      },
    });
    users.push(adminUser);

    // Create normal user
    const normalUser = await prisma.user.create({
      data: {
        clerkId: mockUsers[tenantIndex * 2 + 1].clerkId,
        email: mockUsers[tenantIndex * 2 + 1].email,
        role: mockUsers[tenantIndex * 2 + 1].role,
        tenantId: tenant.id,
      },
    });
    users.push(normalUser);

    console.log(`✅ Created users for tenant: ${tenant.name}`);
  }

  // Create sites, pages, and related data for each tenant
  for (
    let tenantIndex = 0;
    tenantIndex < Math.min(tenants.length, 2);
    tenantIndex++
  ) {
    const tenant = tenants[tenantIndex];
    const adminUser = users[tenantIndex * 2];

    // Create 3-4 sites per tenant
    const sitesToCreate = siteTemplates.slice(0, tenantIndex === 0 ? 4 : 3);

    for (let siteIndex = 0; siteIndex < sitesToCreate.length; siteIndex++) {
      const siteTemplate = sitesToCreate[siteIndex];

      // Create site
      const site = await prisma.site.create({
        data: {
          name: siteTemplate.name,
          slug: siteTemplate.slug,
          description: siteTemplate.description,
          tenantId: tenant.id,
          createdBy: adminUser.id,
        },
      });

      // Create site navigation
      await prisma.navigation.create({
        data: {
          siteId: site.id,
          tenantId: tenant.id,
          structure: navigationTemplate,
        },
      });

      // Create site theme
      const colorScheme = themeColors[siteIndex % themeColors.length];
      await prisma.theme.create({
        data: {
          siteId: site.id,
          tenantId: tenant.id,
          primaryColor: colorScheme.primary,
          secondaryColor: colorScheme.secondary,
          customCss: "",
        },
      });

      // Create pages for the site
      for (const pageTemplate of pageTemplates) {
        const page = await prisma.page.create({
          data: {
            title: pageTemplate.title,
            slug: pageTemplate.slug,
            content: pageTemplate.content,
            status: pageTemplate.status,
            siteId: site.id,
            tenantId: tenant.id,
            createdBy: adminUser.id,
          },
        });

        // Create initial page version
        await prisma.pageVersion.create({
          data: {
            pageId: page.id,
            versionNumber: 1,
            title: pageTemplate.title,
            content: pageTemplate.content,
            status: pageTemplate.status,
            createdBy: adminUser.id,
            isCurrent: true,
          },
        });
      }

      // Create assets for the site
      for (const assetTemplate of mockAssets) {
        await prisma.asset.create({
          data: {
            name: assetTemplate.name,
            filePath: assetTemplate.filePath,
            fileType: assetTemplate.fileType,
            fileSize: assetTemplate.fileSize,
            siteId: site.id,
            tenantId: tenant.id,
            uploadedBy: adminUser.id,
          },
        });
      }

      // Add users to site
      await prisma.siteUser.create({
        data: {
          siteId: site.id,
          userId: adminUser.id,
          role: SiteUserRole.ADMIN,
        },
      });

      // Add normal user if exists
      if (users[tenantIndex * 2 + 1]) {
        await prisma.siteUser.create({
          data: {
            siteId: site.id,
            userId: users[tenantIndex * 2 + 1].id,
            role: SiteUserRole.MEMBER,
          },
        });
      }

      console.log(`✅ Created site: ${site.name} for tenant: ${tenant.name}`);
    }
  }

  console.log("🎉 Database seeding completed successfully!");
  console.log(`
📊 Seeded data summary:
- ${companies.length} companies (including ShortPoint)
- ${tenants.length} tenants
- ${users.length} users
- Sites with pages, navigation, themes, assets, and permissions
- Realistic multi-tenant data structure
  `);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
