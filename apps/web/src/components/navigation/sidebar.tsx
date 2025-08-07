"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Building2,
  Settings,
  CreditCard,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarUserProfile } from "@/components/features/auth/sidebar-user-profile";

const navigationItems = [
  {
    id: "sites",
    label: "Sites",
    href: "/dashboard",
    icon: Building2,
  },
  {
    id: "tenant-config",
    label: "Tenant Configuration",
    href: "/dashboard/tenant-config",
    icon: Settings,
  },
  {
    id: "licensing",
    label: "Licensing Configuration",
    href: "/dashboard/licensing",
    icon: CreditCard,
  },
  {
    id: "support",
    label: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

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
          "fixed lg:relative z-50 h-screen bg-white border-r border-shortpoint-border-light transition-all duration-300 flex flex-col",
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-16"
            : "w-[230px]"
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-shortpoint-border-light">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/shortpoint-logo.svg"
                alt="ShortPoint"
                width={128}
                height={22}
                className="h-6 w-auto"
                priority
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={cn(
                    "group flex items-center space-x-3 px-3 py-2.5 text-xs font-medium transition-all duration-200 relative",
                    isActive
                      ? "bg-shortpoint-light text-shortpoint-primary"
                      : "text-shortpoint-secondary hover:bg-shortpoint-light/50 hover:text-shortpoint-primary"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate leading-tight">{item.label}</span>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-shortpoint-primary rounded-r-sm"></div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t border-shortpoint-border-light">
          <div className="p-4">
            <SidebarUserProfile isCollapsed={isCollapsed} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-shortpoint-border-light">
          {!isCollapsed && (
            <div className="text-xs text-shortpoint-text-subtle">
              <p className="font-medium">ShortPoint Standalone</p>
              <p>v1.0.0</p>
            </div>
          )}
        </div>
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
