"use client";

import Link from "next/link";
import { mockNavigation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface SiteNavigationProps {
  siteId: string;
}

export function SiteNavigation({ siteId }: SiteNavigationProps) {
  const navigation = mockNavigation.find((nav) => nav.siteId === siteId);

  if (!navigation) {
    return (
      <nav className="bg-white border-b border-shortpoint-border-light px-6 py-3">
        <div className="text-sm text-shortpoint-text-subtle">
          No navigation configured
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-shortpoint-border-light px-6 py-3">
      <div className="flex items-center space-x-6">
        {navigation.structure.map((item) => (
          <div key={item.id} className="relative group">
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-shortpoint-primary",
                "text-shortpoint-text-neutral hover:text-shortpoint-primary"
              )}
            >
              {item.label}
            </Link>

            {/* Dropdown for children */}
            {item.children && item.children.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-shortpoint-border-light rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-shortpoint-text-neutral hover:bg-shortpoint-light hover:text-shortpoint-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
