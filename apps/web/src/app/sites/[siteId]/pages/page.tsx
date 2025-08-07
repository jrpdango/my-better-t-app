"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";
import { PagesTable } from "@/components/pages/pages-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockPages } from "@/lib/mock-data";

interface PagesPageProps {
  params: Promise<{ siteId: string }>;
}

export default function PagesPage({ params }: PagesPageProps) {
  const { siteId } = use(params);
  const sitePages = mockPages.filter((p) => p.siteId === siteId);

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-shortpoint-text-primary">
              Pages
            </h1>
            <p className="text-shortpoint-text-subtle text-sm">
              Manage all pages for this site
            </p>
          </div>
          <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Page
          </Button>
        </div>

        {/* Pages Table */}
        <PagesTable pages={sitePages} siteId={siteId} />
      </div>
    </SiteLayout>
  );
}
