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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-shortpoint-text-primary">
            Tenant Configuration
          </h1>
          <p className="text-shortpoint-text-subtle text-sm">
            Manage your organization settings and preferences
          </p>
        </div>

        {/* Configuration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-shortpoint-text-primary">
                Basic Information
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tenant-name">Tenant Name</Label>
                <Input
                  id="tenant-name"
                  defaultValue={mockTenant.name}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tenant-slug">Tenant Slug</Label>
                <Input
                  id="tenant-slug"
                  defaultValue={mockTenant.slug}
                  className="mt-1"
                />
              </div>
              <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-shortpoint-text-primary">
                Security Settings
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="domain">Allowed Domain</Label>
                <Input id="domain" defaultValue="acme.com" className="mt-1" />
              </div>
              <div>
                <Label>Two-Factor Authentication</Label>
                <div className="mt-1">
                  <Button variant="outline" size="sm">
                    Configure 2FA
                  </Button>
                </div>
              </div>
              <Button className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white">
                Update Security
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
