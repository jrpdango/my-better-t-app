"use client";

import Link from "next/link";
import { Site } from "@/lib/mock-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Users,
  Calendar,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SiteCardProps {
  site: Site;
}

const departmentColors = {
  HR: "bg-blue-500",
  Finance: "bg-green-500",
  IT: "bg-purple-500",
  Development: "bg-orange-500",
  Sales: "bg-red-500",
  Marketing: "bg-pink-500",
};

export function SiteCard({ site }: SiteCardProps) {
  const colorClass =
    departmentColors[site.department as keyof typeof departmentColors] ||
    "bg-gray-500";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                colorClass
              )}
            >
              <span className="text-white font-semibold text-sm">
                {site.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-shortpoint-text-primary">
                {site.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    site.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  {site.status}
                </span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Site
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-shortpoint-text-subtle mb-4">
          {site.description}
        </p>

        <div className="space-y-2 text-xs text-shortpoint-text-neutral">
          <div className="flex items-center justify-between">
            <span>Last Activity:</span>
            <span>{formatDate(site.lastActivity)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Created:</span>
            <span>{formatDate(site.createdAt)}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-shortpoint-border-light">
          <Link href={`/sites/${site.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full group-hover:bg-shortpoint-primary group-hover:text-white group-hover:border-shortpoint-primary transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure Site
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
