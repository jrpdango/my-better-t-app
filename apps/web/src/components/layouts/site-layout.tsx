"use client";

import { ReactNode } from "react";
import { usePathname, useParams } from "next/navigation";
import { SiteSidebar } from "@/components/navigation/site-sidebar";
import { SiteViewingSidebar } from "@/components/navigation/site-viewing-sidebar";
import { SiteHeader } from "@/components/sites/site-header";
import { SiteNavigation } from "@/components/sites/site-navigation";
import { SiteViewingNavigation } from "@/components/sites/site-viewing-navigation";
import { mockSites } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface SiteLayoutProps {
  children: ReactNode;
  siteId?: string;
}

export function SiteLayout({ children, siteId }: SiteLayoutProps) {
  const pathname = usePathname();
  const params = useParams();

  // Check if we're in site viewing mode (/s/[siteSlug]) vs site management mode (/sites/[siteId])
  const isSiteViewing = pathname.startsWith("/s/");
  const isSiteManagement = pathname.startsWith("/sites/");

  // Get identifiers for different modes
  // Handle potential Promise params by checking if it's a Promise first
  const rawSiteSlug = params.siteSlug;
  const rawSiteId = params.siteId;

  const siteSlug = isSiteViewing
    ? typeof rawSiteSlug === "string"
      ? rawSiteSlug
      : null
    : null;
  const managementSiteId = isSiteManagement
    ? typeof rawSiteId === "string"
      ? rawSiteId
      : null
    : null;
  const actualSiteId = siteId || managementSiteId;

  // Find site by ID (management mode) or by slug (viewing mode)
  let site = null;
  if (isSiteManagement && actualSiteId) {
    site = mockSites.find((s) => s.id === actualSiteId);
  } else if (isSiteViewing && siteSlug) {
    site = mockSites.find((s) => s.slug === siteSlug);
  }

  // Show error only for management mode when site not found
  if (actualSiteId && !site && isSiteManagement) {
    return <div>Site not found (Management Mode) - ID: {actualSiteId}</div>;
  }

  // Show error for viewing mode when site not found
  if (siteSlug && !site && isSiteViewing) {
    return <div>Site not found (Viewing Mode) - Slug: {siteSlug}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Fixed Left Sidebar */}
        {isSiteViewing ? (
          <SiteViewingSidebar />
        ) : (
          actualSiteId && <SiteSidebar siteId={actualSiteId} />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - only show for site management, not site viewing */}
          {site && isSiteManagement && <SiteHeader site={site} />}

          {/* Site Navigation Bar - different for viewing vs management */}
          {actualSiteId && isSiteManagement && (
            <SiteNavigation siteId={actualSiteId} />
          )}
          {siteSlug && isSiteViewing && (
            <SiteViewingNavigation siteSlug={siteSlug} />
          )}

          {/* Content */}
          <main className={cn("flex-1", isSiteViewing ? "bg-gray-50" : "p-6")}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
