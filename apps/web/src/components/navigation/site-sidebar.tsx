"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Navigation,
  FileText,
  Image,
  Users,
  Palette,
  Settings,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSites } from "@/lib/mock-data";

interface SiteSidebarProps {
  siteId: string;
}

const navigationItems = [
  {
    id: "navigation",
    label: "Navigation",
    href: "/navigation",
    icon: Navigation,
  },
  {
    id: "pages",
    label: "Pages",
    href: "/pages",
    icon: FileText,
  },
  {
    id: "assets",
    label: "Assets Library",
    href: "/assets",
    icon: Image,
  },
  {
    id: "team",
    label: "Site Team",
    href: "/team",
    icon: Users,
  },
  {
    id: "theme",
    label: "Theme",
    href: "/theme",
    icon: Palette,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function SiteSidebar({ siteId }: SiteSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const site = mockSites.find((s) => s.id === siteId);

  return (
    <>
      {/* Mobile Overlay */}
      {isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative z-50 h-screen bg-white border-r border-shortpoint-border-light transition-all duration-300",
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-16"
            : "w-[230px]"
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-shortpoint-border-light">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4 text-shortpoint-text-subtle" />
                <span className="text-sm text-shortpoint-text-subtle">
                  Back to Dashboard
                </span>
              </Link>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Site Info */}
        {!isCollapsed && site && (
          <div className="p-4 border-b border-shortpoint-border-light">
            <h2 className="font-semibold text-shortpoint-text-primary">
              {site.name}
            </h2>
            <p className="text-xs text-shortpoint-text-subtle">
              {site.department}
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const fullHref = `/sites/${siteId}${item.href}`;
            const isActive = pathname === fullHref;
            const Icon = item.icon;

            return (
              <Link key={item.id} href={fullHref}>
                <div
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-shortpoint-light text-shortpoint-primary"
                      : "text-shortpoint-secondary hover:bg-shortpoint-light/50 hover:text-shortpoint-primary"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </>
  );
}
