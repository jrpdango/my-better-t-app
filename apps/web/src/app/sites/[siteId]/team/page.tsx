"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";

interface TeamPageProps {
  params: Promise<{ siteId: string }>;
}

export default function TeamPage({ params }: TeamPageProps) {
  const { siteId } = use(params);

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-[#202224]">Site Team</h1>
          <p className="text-[#5774A8] text-sm">
            Manage team members and their access to this site
          </p>
        </div>

        {/* Team Management */}
        <div className="bg-white rounded-lg border border-[#eaeaea] p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#E7F5FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-medium text-[#202224] mb-2">
              Team Management
            </h3>
            <p className="text-[#5774A8] mb-4">
              Add and manage team members who can access and edit this site.
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
