"use client";

import Link from "next/link";
import type { Site } from "@/types/api";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Users, ExternalLink } from "lucide-react";

interface SiteCardProps {
  site: Site;
}

const departmentColors = {
  HR: "from-blue-400 to-blue-600",
  Finance: "from-green-400 to-green-600",
  IT: "from-purple-400 to-purple-600",
  Development: "from-orange-400 to-orange-600",
  Sales: "from-red-400 to-red-600",
  Marketing: "from-pink-400 to-pink-600",
};

const departmentIcons = {
  HR: "👥",
  Finance: "💰",
  IT: "💻",
  Development: "⚡",
  Sales: "📈",
  Marketing: "🎯",
};

export function SiteCard({ site }: SiteCardProps) {
  const colorClass =
    departmentColors[site.department as keyof typeof departmentColors] ||
    "from-gray-400 to-gray-600";

  const departmentIcon =
    departmentIcons[site.department as keyof typeof departmentIcons] || "🌐";

  const siteUrl = `https://${site.slug}.yourcompany.com`;

  // Format last activity date
  const lastActivity = new Date(site.lastActivity);
  const now = new Date();
  const diffHours = Math.floor(
    (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60)
  );
  const timeAgo =
    diffHours < 24 ? `${diffHours}h ago` : `${Math.floor(diffHours / 24)}d ago`;

  return (
    <Link href={`/sites/${site.id}`}>
      <Card className="group hover:shadow-xl hover:shadow-shortpoint-light/25 transition-all duration-300 bg-white border border-shortpoint-border-light overflow-hidden cursor-pointer h-full">
        <CardContent className="p-0 h-[320px] flex flex-col">
          {/* Header Section with Status */}
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between mb-3">
              <div
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
                  site.status === "active"
                    ? "border-transparent bg-green-500 text-white"
                    : "border-transparent bg-gray-100 text-gray-700"
                )}
              >
                {site.status === "active" ? "Active" : "Inactive"}
              </div>
              <ExternalLink className="h-4 w-4 text-shortpoint-text-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Visual Section */}
          <div className="flex-1 mx-4 mb-4 rounded-lg overflow-hidden">
            <div
              className={cn(
                "w-full h-full bg-gradient-to-br flex items-center justify-center relative",
                colorClass
              )}
            >
              <div className="text-5xl">{departmentIcon}</div>
              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 pt-0">
            {/* Site Name */}
            <h3 className="font-semibold text-lg text-shortpoint-text-primary mb-2 line-clamp-1">
              {site.name}
            </h3>

            {/* Description */}
            <p className="text-shortpoint-text-subtle text-sm mb-3 line-clamp-2 leading-relaxed">
              {site.description}
            </p>

            {/* Site URL */}
            <div className="flex items-center text-shortpoint-primary text-sm font-medium mb-3">
              <span className="truncate">{siteUrl}</span>
            </div>

            {/* Footer with activity info */}
            <div className="flex items-center justify-between text-xs text-shortpoint-text-subtle">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Updated {timeAgo}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{site.department}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
