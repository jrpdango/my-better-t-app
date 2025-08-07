"use client";

import { SiteCard } from "@/components/dashboard/site-card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Users } from "lucide-react";
import { mockSites } from "@/lib/mock-data";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

  const activeSites = mockSites.filter(
    (site) => site.status === "active"
  ).length;
  const totalSites = mockSites.length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-shortpoint-text-primary tracking-tight">
            Welcome back, {user?.firstName || "User"}
          </h1>
          <p className="text-shortpoint-text-subtle text-base leading-relaxed">
            Manage and organize your departmental sites across your organization
          </p>
        </div>
        <Button
          className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200 shrink-0"
          size="default"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Site
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-shortpoint-border-light p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-shortpoint-text-subtle">Total Sites</p>
              <p className="text-2xl font-semibold text-shortpoint-text-primary">
                {totalSites}
              </p>
            </div>
            <div className="w-8 h-8 bg-shortpoint-light rounded-lg flex items-center justify-center">
              <Building2 className="h-4 w-4 text-shortpoint-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-shortpoint-border-light p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-shortpoint-text-subtle">
                Active Sites
              </p>
              <p className="text-2xl font-semibold text-shortpoint-text-primary">
                {activeSites}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-shortpoint-border-light p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-shortpoint-text-subtle">Departments</p>
              <p className="text-2xl font-semibold text-shortpoint-text-primary">
                {new Set(mockSites.map((site) => site.department)).size}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Site Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-shortpoint-text-primary">
            All Sites
          </h2>
          <div className="text-sm text-shortpoint-text-subtle">
            {mockSites.length} sites total
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </div>

      {/* Empty State for when no sites exist */}
      {mockSites.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-shortpoint-text-subtle mx-auto mb-4" />
          <h3 className="text-lg font-medium text-shortpoint-text-primary mb-2">
            No sites yet
          </h3>
          <p className="text-shortpoint-text-subtle mb-6 max-w-md mx-auto">
            Get started by creating your first departmental site. Each site can
            be customized with its own navigation, pages, and themes.
          </p>
          <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Site
          </Button>
        </div>
      )}
    </div>
  );
}
