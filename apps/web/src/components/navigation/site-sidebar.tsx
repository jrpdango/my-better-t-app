"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Navigation,
  FileText,
  Image as ImageIcon,
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
    icon: ImageIcon,
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
          "fixed lg:relative z-50 h-screen bg-white border-r border-[#eaeaea] transition-all duration-300",
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-16"
            : "w-[230px]"
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#eaeaea]">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/shortpoint-logo.svg"
                alt="ShortPoint"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
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

        {/* Back to Dashboard Link */}
        {!isCollapsed && (
          <div className="px-4 py-2 border-b border-[#eaeaea]">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-xs text-[#5774A8] hover:text-[#3161D1] transition-colors font-inter leading-[14px]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        )}

        {/* Site Info */}
        {!isCollapsed && site && (
          <div className="p-4 border-b border-[#eaeaea]">
            <h2 className="font-medium text-[#202224] text-xs font-inter leading-[14px]">
              {site.name}
            </h2>
            <p className="text-xs text-[#5774A8] font-inter leading-[14px]">
              {site.department} Department • Management View
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-0">
          <div className="text-xs font-medium text-[#5774A8] uppercase tracking-wider mb-3 font-inter leading-[14px]">
            Site Management
          </div>
          {navigationItems.map((item) => {
            const fullHref = `/sites/${siteId}${item.href}`;
            const isActive = pathname === fullHref;
            const Icon = item.icon;

            return (
              <Link key={item.id} href={fullHref}>
                <div
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 text-xs font-medium font-inter leading-[14px] transition-colors",
                    isActive
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
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
