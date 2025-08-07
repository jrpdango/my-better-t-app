"use client";

import Link from "next/link";
import type { Site } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

  return (
    <Link href={`/sites/${site.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 overflow-hidden cursor-pointer">
        <CardContent className="p-0 h-[250px] flex flex-col">
          {/* Image Section */}
          <div className="flex-1 w-full overflow-hidden">
            <div
              className={cn(
                "w-full h-full bg-gradient-to-br flex items-center justify-center",
                colorClass
              )}
            >
              <div className="text-6xl">{departmentIcon}</div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 text-center">
            {/* Site Name */}
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {site.name}
            </h3>

            {/* Site URL */}
            <p className="text-blue-600 text-sm font-medium">{siteUrl}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
