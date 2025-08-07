"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockSites, mockPages } from "@/lib/mock-data";

interface SitePageProps {
  params: Promise<{ siteId: string }>;
}

export default function SitePage({ params }: SitePageProps) {
  const { siteId } = use(params);
  const site = mockSites.find((s) => s.id === siteId);
  const sitePages = mockPages.filter((p) => p.siteId === siteId);

  if (!site) {
    return <div>Site not found</div>;
  }

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-lg font-semibold text-shortpoint-text-primary">
            Welcome to {site.name}
          </h1>
          <p className="text-shortpoint-text-subtle text-sm">
            {site.description}
          </p>
        </div>

        {/* Site Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-shortpoint-text-primary">
                Pages
              </h3>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-shortpoint-primary">
                {sitePages.length}
              </div>
              <p className="text-sm text-shortpoint-text-subtle">
                Total pages created
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-shortpoint-text-primary">
                Status
              </h3>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {site.status}
              </div>
              <p className="text-sm text-shortpoint-text-subtle">
                Site is currently active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-shortpoint-text-primary">
                Last Updated
              </h3>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-shortpoint-primary">
                {new Date(site.lastActivity).toLocaleDateString()}
              </div>
              <p className="text-sm text-shortpoint-text-subtle">
                Last activity recorded
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-shortpoint-text-primary">
              Recent Activity
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-shortpoint-text-subtle">
              No recent activity to display.
            </p>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
