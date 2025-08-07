-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'NORMAL');

-- CreateEnum
CREATE TYPE "public"."PageStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."LicenseType" AS ENUM ('BASIC', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "public"."SiteUserRole" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "public"."companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "industry" TEXT,
    "website" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'NORMAL',
    "tenant_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sites" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "tenant_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB,
    "status" "public"."PageStatus" NOT NULL DEFAULT 'DRAFT',
    "site_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."page_versions" (
    "id" TEXT NOT NULL,
    "page_id" TEXT NOT NULL,
    "version_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB,
    "status" "public"."PageStatus" NOT NULL DEFAULT 'DRAFT',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_current" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "page_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."navigation" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "structure" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."assets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "site_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."themes" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "primary_color" TEXT NOT NULL,
    "secondary_color" TEXT NOT NULL,
    "custom_css" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tenant_licenses" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "license_type" "public"."LicenseType" NOT NULL,
    "max_sites" INTEGER NOT NULL,
    "max_users" INTEGER NOT NULL,
    "max_storage_gb" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."site_users" (
    "site_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "public"."SiteUserRole" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_users_pkey" PRIMARY KEY ("site_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "public"."companies"("slug");

-- CreateIndex
CREATE INDEX "companies_name_idx" ON "public"."companies"("name");

-- CreateIndex
CREATE INDEX "companies_industry_idx" ON "public"."companies"("industry");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "public"."tenants"("slug");

-- CreateIndex
CREATE INDEX "tenants_company_id_idx" ON "public"."tenants"("company_id");

-- CreateIndex
CREATE INDEX "tenants_name_idx" ON "public"."tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "public"."users"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_tenant_id_idx" ON "public"."users"("tenant_id");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "public"."users"("role");

-- CreateIndex
CREATE INDEX "users_tenant_id_role_idx" ON "public"."users"("tenant_id", "role");

-- CreateIndex
CREATE INDEX "sites_tenant_id_idx" ON "public"."sites"("tenant_id");

-- CreateIndex
CREATE INDEX "sites_created_by_idx" ON "public"."sites"("created_by");

-- CreateIndex
CREATE INDEX "sites_name_idx" ON "public"."sites"("name");

-- CreateIndex
CREATE INDEX "sites_tenant_id_name_idx" ON "public"."sites"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "sites_tenant_id_slug_key" ON "public"."sites"("tenant_id", "slug");

-- CreateIndex
CREATE INDEX "pages_site_id_idx" ON "public"."pages"("site_id");

-- CreateIndex
CREATE INDEX "pages_tenant_id_idx" ON "public"."pages"("tenant_id");

-- CreateIndex
CREATE INDEX "pages_status_idx" ON "public"."pages"("status");

-- CreateIndex
CREATE INDEX "pages_created_by_idx" ON "public"."pages"("created_by");

-- CreateIndex
CREATE INDEX "pages_site_id_status_idx" ON "public"."pages"("site_id", "status");

-- CreateIndex
CREATE INDEX "pages_tenant_id_status_idx" ON "public"."pages"("tenant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "pages_site_id_slug_key" ON "public"."pages"("site_id", "slug");

-- CreateIndex
CREATE INDEX "page_versions_page_id_idx" ON "public"."page_versions"("page_id");

-- CreateIndex
CREATE INDEX "page_versions_is_current_idx" ON "public"."page_versions"("is_current");

-- CreateIndex
CREATE INDEX "page_versions_page_id_is_current_idx" ON "public"."page_versions"("page_id", "is_current");

-- CreateIndex
CREATE UNIQUE INDEX "page_versions_page_id_version_number_key" ON "public"."page_versions"("page_id", "version_number");

-- CreateIndex
CREATE UNIQUE INDEX "navigation_site_id_key" ON "public"."navigation"("site_id");

-- CreateIndex
CREATE INDEX "navigation_tenant_id_idx" ON "public"."navigation"("tenant_id");

-- CreateIndex
CREATE INDEX "assets_site_id_idx" ON "public"."assets"("site_id");

-- CreateIndex
CREATE INDEX "assets_tenant_id_idx" ON "public"."assets"("tenant_id");

-- CreateIndex
CREATE INDEX "assets_file_type_idx" ON "public"."assets"("file_type");

-- CreateIndex
CREATE INDEX "assets_uploaded_by_idx" ON "public"."assets"("uploaded_by");

-- CreateIndex
CREATE INDEX "assets_site_id_file_type_idx" ON "public"."assets"("site_id", "file_type");

-- CreateIndex
CREATE INDEX "assets_tenant_id_file_type_idx" ON "public"."assets"("tenant_id", "file_type");

-- CreateIndex
CREATE UNIQUE INDEX "themes_site_id_key" ON "public"."themes"("site_id");

-- CreateIndex
CREATE INDEX "themes_tenant_id_idx" ON "public"."themes"("tenant_id");

-- CreateIndex
CREATE INDEX "tenant_licenses_tenant_id_idx" ON "public"."tenant_licenses"("tenant_id");

-- CreateIndex
CREATE INDEX "tenant_licenses_is_active_idx" ON "public"."tenant_licenses"("is_active");

-- CreateIndex
CREATE INDEX "tenant_licenses_license_type_idx" ON "public"."tenant_licenses"("license_type");

-- CreateIndex
CREATE INDEX "tenant_licenses_tenant_id_is_active_idx" ON "public"."tenant_licenses"("tenant_id", "is_active");

-- AddForeignKey
ALTER TABLE "public"."tenants" ADD CONSTRAINT "tenants_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sites" ADD CONSTRAINT "sites_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sites" ADD CONSTRAINT "sites_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."page_versions" ADD CONSTRAINT "page_versions_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."page_versions" ADD CONSTRAINT "page_versions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."navigation" ADD CONSTRAINT "navigation_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."navigation" ADD CONSTRAINT "navigation_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."assets" ADD CONSTRAINT "assets_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."assets" ADD CONSTRAINT "assets_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."assets" ADD CONSTRAINT "assets_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."themes" ADD CONSTRAINT "themes_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."themes" ADD CONSTRAINT "themes_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tenant_licenses" ADD CONSTRAINT "tenant_licenses_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."site_users" ADD CONSTRAINT "site_users_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."site_users" ADD CONSTRAINT "site_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
