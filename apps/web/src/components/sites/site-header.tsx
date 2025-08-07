"use client";

import { Button } from "@/components/ui/button";
import { Edit, Save, Eye, MoreHorizontal } from "lucide-react";
import { Site } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SiteHeaderProps {
  site: Site;
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-shortpoint-border-light flex items-center justify-between px-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-shortpoint-text-subtle">
          {site.name}
        </span>
        <span className="text-shortpoint-text-placeholder">></span>
        <span className="text-sm font-medium text-shortpoint-text-primary">
          Dashboard
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        
        <Button 
          size="sm"
          className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Publish
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export Site</DropdownMenuItem>
            <DropdownMenuItem>Import Content</DropdownMenuItem>
            <DropdownMenuItem>Site Analytics</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
