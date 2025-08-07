"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockTenant } from "@/lib/mock-data";

export default function TenantConfigPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-shortpoint-text-primary tracking-tight">
            Tenant Configuration
          </h1>
          <p className="text-shortpoint-text-subtle text-base leading-relaxed">
            Manage your organization settings and preferences
          </p>
        </div>

        {/* Configuration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="border-shortpoint-border-light shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <h3 className="text-lg font-semibold text-shortpoint-text-primary">
                Basic Information
              </h3>
              <p className="text-sm text-shortpoint-text-subtle">
                Update your organization's basic details
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tenant-name"
                  className="text-sm font-medium text-shortpoint-text-primary"
                >
                  Tenant Name
                </Label>
                <Input
                  id="tenant-name"
                  defaultValue={mockTenant.name}
                  className="border-shortpoint-border-light focus:border-shortpoint-primary"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="tenant-slug"
                  className="text-sm font-medium text-shortpoint-text-primary"
                >
                  Tenant Slug
                </Label>
                <Input
                  id="tenant-slug"
                  defaultValue={mockTenant.slug}
                  className="border-shortpoint-border-light focus:border-shortpoint-primary"
                />
              </div>
              <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white w-full">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-shortpoint-border-light shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <h3 className="text-lg font-semibold text-shortpoint-text-primary">
                Security Settings
              </h3>
              <p className="text-sm text-shortpoint-text-subtle">
                Configure security and access controls
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="domain"
                  className="text-sm font-medium text-shortpoint-text-primary"
                >
                  Allowed Domain
                </Label>
                <Input
                  id="domain"
                  defaultValue="acme.com"
                  className="border-shortpoint-border-light focus:border-shortpoint-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-shortpoint-text-primary">
                  Two-Factor Authentication
                </Label>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-shortpoint-border-light hover:bg-shortpoint-light/50"
                  >
                    Configure 2FA
                  </Button>
                </div>
              </div>
              <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white w-full">
                Update Security
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
