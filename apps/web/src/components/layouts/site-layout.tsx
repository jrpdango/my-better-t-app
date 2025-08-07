"use client";

import { ReactNode } from "react";
import { SiteSidebar } from "@/components/navigation/site-sidebar";
import { SiteHeader } from "@/components/sites/site-header";
import { SiteNavigation } from "@/components/sites/site-navigation";
import { mockSites } from "@/lib/mock-data";

interface SiteLayoutProps {
  children: ReactNode;
  siteId: string;
}

export function SiteLayout({ children, siteId }: SiteLayoutProps) {
  const site = mockSites.find((s) => s.id === siteId);

  if (!site) {
    return <div>Site not found</div>;
  }

  return (
    <div className="min-h-screen bg-shortpoint-main-bg">
      <div className="flex">
        {/* Fixed Left Sidebar */}
        <SiteSidebar siteId={siteId} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <SiteHeader site={site} />

          {/* Site Navigation Bar */}
          <SiteNavigation siteId={siteId} />

          {/* Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
