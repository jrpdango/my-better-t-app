"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Building2,
  Users,
  Globe,
  Shield,
  Bell,
  Save,
  Edit,
} from "lucide-react";

export default function TenantConfigPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-shortpoint-text-primary tracking-tight">
            Tenant Configuration
          </h1>
          <p className="text-shortpoint-text-subtle text-base leading-relaxed">
            Manage your organization's global settings and preferences
          </p>
        </div>
        <Button
          className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200 shrink-0"
          size="default"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Info */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-shortpoint-primary" />
            <h3 className="text-lg font-medium text-shortpoint-text-primary">
              Organization Information
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue="ShortPoint Corporation" />
            </div>
            <div>
              <Label htmlFor="org-domain">Primary Domain</Label>
              <Input id="org-domain" defaultValue="shortpoint.com" />
            </div>
            <div>
              <Label htmlFor="org-description">Description</Label>
              <Input
                id="org-description"
                defaultValue="Modern intranet solutions for businesses"
              />
            </div>
          </div>
        </Card>

        {/* User Management */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-shortpoint-primary" />
            <h3 className="text-lg font-medium text-shortpoint-text-primary">
              User Management
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-semibold text-shortpoint-primary">
                  24
                </p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Admin Users</p>
                <p className="text-2xl font-semibold text-shortpoint-primary">
                  3
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-shortpoint-primary" />
            <h3 className="text-lg font-medium text-shortpoint-text-primary">
              Security Settings
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-shortpoint-text-subtle">
                  Required for all users
                </p>
              </div>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Session Timeout</p>
                <p className="text-xs text-shortpoint-text-subtle">
                  Auto logout after inactivity
                </p>
              </div>
              <Badge variant="secondary">8 hours</Badge>
            </div>
          </div>
        </Card>

        {/* Global Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-shortpoint-primary" />
            <h3 className="text-lg font-medium text-shortpoint-text-primary">
              Global Settings
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="timezone">Default Timezone</Label>
              <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
            </div>
            <div>
              <Label htmlFor="language">Default Language</Label>
              <Input id="language" defaultValue="English (US)" />
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-shortpoint-primary" />
          <h3 className="text-lg font-medium text-shortpoint-text-primary">
            Notification Settings
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 border border-shortpoint-border-light rounded-lg">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-shortpoint-text-subtle">
                System updates and alerts
              </p>
            </div>
            <Badge variant="default">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-shortpoint-border-light rounded-lg">
            <div>
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-shortpoint-text-subtle">
                Real-time updates
              </p>
            </div>
            <Badge variant="secondary">Disabled</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border border-shortpoint-border-light rounded-lg">
            <div>
              <p className="text-sm font-medium">SMS Alerts</p>
              <p className="text-xs text-shortpoint-text-subtle">
                Critical notifications only
              </p>
            </div>
            <Badge variant="default">Enabled</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
