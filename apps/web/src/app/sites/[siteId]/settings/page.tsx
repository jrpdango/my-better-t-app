"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";

interface SettingsPageProps {
  params: Promise<{ siteId: string }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { siteId } = use(params);

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-[#202224]">
            Site Settings
          </h1>
          <p className="text-[#5774A8] text-sm">
            Configure your site's general settings and preferences
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg border border-[#eaeaea] p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#E7F5FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-lg font-medium text-[#202224] mb-2">
              Site Configuration
            </h3>
            <p className="text-[#5774A8] mb-4">
              Manage site-specific settings, domain configuration, and general
              preferences.
            </p>
            <div className="text-sm text-[#5774A8]">
              Feature coming soon in the full version
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
