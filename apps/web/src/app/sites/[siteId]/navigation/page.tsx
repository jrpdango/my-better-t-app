"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";
import { NavigationEditor } from "@/components/navigation/navigation-editor";
import { mockNavigation } from "@/lib/mock-data";

interface NavigationPageProps {
  params: Promise<{ siteId: string }>;
}

export default function NavigationPage({ params }: NavigationPageProps) {
  const { siteId } = use(params);
  const navigation = mockNavigation.find((nav) => nav.siteId === siteId);

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-shortpoint-text-primary">
            Navigation Editor
          </h1>
          <p className="text-shortpoint-text-subtle text-sm">
            Configure the navigation structure for your site
          </p>
        </div>

        {/* Navigation Editor */}
        <NavigationEditor navigation={navigation} siteId={siteId} />
      </div>
    </SiteLayout>
  );
}
