"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { SiteCard } from "@/components/dashboard/site-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockSites } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-shortpoint-text-primary">
              Site Collections
            </h1>
            <p className="text-shortpoint-text-subtle text-sm">
              Manage and organize your departmental sites
            </p>
          </div>
          <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Site
          </Button>
        </div>

        {/* Site Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
