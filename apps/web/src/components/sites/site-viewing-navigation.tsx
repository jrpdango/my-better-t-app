"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockPages, mockSites } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface SiteViewingNavigationProps {
  siteSlug: string;
}

export function SiteViewingNavigation({
  siteSlug,
}: SiteViewingNavigationProps) {
  const pathname = usePathname();
  const site = mockSites.find((s) => s.slug === siteSlug);

  if (!site) return null;

  // Get all published pages for this site
  const sitePages = mockPages.filter(
    (page) => page.siteId === site.id && page.status === "PUBLISHED"
  );

  // Navigation items - Home + all published pages
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      href: `/s/${siteSlug}`,
    },
    ...sitePages.map((page) => ({
      id: page.id,
      label: page.title,
      href: `/s/${siteSlug}/${page.slug}`,
    })),
  ];

  return (
    <nav className="bg-white border-b border-[#eaeaea] px-6 py-3">
      <div className="flex items-center space-x-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "px-3 py-2 text-xs font-medium leading-[14px] font-inter transition-colors",
                isActive
                  ? "bg-[#E7F5FF] text-[#3161D1]"
                  : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Secondary navigation info */}
      <div className="mt-3 flex items-center justify-between border-t border-[#eaeaea] pt-3">
        <div className="flex items-center space-x-4 text-xs text-[#5774A8] font-inter leading-[14px]">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {site.department} Department
          </span>
          <span>•</span>
          <span>{sitePages.length} pages</span>
          <span>•</span>
          <span>
            Last updated {new Date(site.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-inter leading-[14px]",
              site.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            )}
          >
            {site.status === "active" ? "Live" : "Inactive"}
          </span>
        </div>
      </div>
    </nav>
  );
}
