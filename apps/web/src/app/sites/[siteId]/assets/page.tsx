"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";
import { AssetsLibrary } from "@/components/assets/assets-library";
import { mockAssets } from "@/lib/mock-data";

interface AssetsPageProps {
  params: Promise<{ siteId: string }>;
}

export default function AssetsPage({ params }: AssetsPageProps) {
  const { siteId } = use(params);
  const siteAssets = mockAssets.filter((asset) => asset.siteId === siteId);

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-shortpoint-text-primary">
            Assets Library
          </h1>
          <p className="text-shortpoint-text-subtle text-sm">
            Manage images, documents, and other files for your site
          </p>
        </div>

        {/* Assets Library */}
        <AssetsLibrary assets={siteAssets} siteId={siteId} />
      </div>
    </SiteLayout>
  );
}
