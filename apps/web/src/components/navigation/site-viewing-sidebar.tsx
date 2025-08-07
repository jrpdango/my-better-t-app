"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FileText, Menu, X, ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSites, mockPages, mockNavigation } from "@/lib/mock-data";

export function SiteViewingSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const siteSlug = params.siteSlug as string;

  const site = mockSites.find((s) => s.slug === siteSlug);
  const sitePages = mockPages.filter(
    (page) => page.siteId === site?.id && page.status === "PUBLISHED"
  );
  const siteNavigation = mockNavigation.find((nav) => nav.siteId === site?.id);

  if (!site) return null;

  // Create navigation items from pages and site navigation
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      href: `/s/${site.slug}`,
      icon: Home,
    },
    ...sitePages.map((page) => ({
      id: page.id,
      label: page.title,
      href: `/s/${site.slug}/${page.slug}`,
      icon: FileText,
    })),
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
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
        {!isCollapsed && (
          <div className="p-4 border-b border-[#eaeaea]">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-[#E7F5FF] rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-[#3161D1]" />
              </div>
              <div>
                <h2 className="font-medium text-[#202224] text-xs font-inter leading-[14px]">
                  {site.name}
                </h2>
                <p className="text-xs text-[#5774A8] font-inter leading-[14px]">
                  {site.department} Department
                </p>
              </div>
            </div>
            <div className="text-xs text-[#5774A8] font-inter leading-[14px]">
              📍 Public Site View
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-0">
          <div className="text-xs font-medium text-[#5774A8] uppercase tracking-wider mb-3 font-inter leading-[14px]">
            Site Navigation
          </div>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.id} href={item.href}>
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

          {/* Additional Site Info */}
          {!isCollapsed && sitePages.length > 0 && (
            <div className="pt-4 mt-4 border-t border-[#eaeaea]">
              <div className="text-xs font-medium text-[#5774A8] uppercase tracking-wider mb-3 font-inter leading-[14px]">
                Site Info
              </div>
              <div className="bg-[#f5f6fa] rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs font-inter leading-[14px]">
                  <span className="text-[#5774A8]">Total Pages:</span>
                  <span className="font-medium text-[#202224]">
                    {sitePages.length}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-inter leading-[14px]">
                  <span className="text-[#5774A8]">Last Updated:</span>
                  <span className="font-medium text-[#202224]">
                    {new Date(site.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-inter leading-[14px]">
                  <span className="text-[#5774A8]">Status:</span>
                  <span
                    className={cn(
                      "font-medium",
                      site.status === "active"
                        ? "text-green-600"
                        : "text-[#5774A8]"
                    )}
                  >
                    {site.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      {isCollapsed && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md border"
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
