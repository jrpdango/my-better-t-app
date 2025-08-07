"use client";

import { useState } from "react";
import Link from "next/link";
import { Page } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Edit,
  Trash2,
  Copy,
  MoreVertical,
  Search,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface PagesTableProps {
  pages: Page[];
  siteId: string;
}

type SortField = "title" | "status" | "createdAt" | "updatedAt";
type SortDirection = "asc" | "desc";

const statusColors = {
  PUBLISHED: "bg-green-100 text-green-800",
  DRAFT: "bg-yellow-100 text-yellow-800",
  ARCHIVED: "bg-gray-100 text-gray-800",
};

export function PagesTable({ pages, siteId }: PagesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPages = [...filteredPages].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "createdAt" || sortField === "updatedAt") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Search and Filters */}
        <div className="p-4 border-b border-shortpoint-border-light">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-shortpoint-text-placeholder" />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("title")}
                    className="h-auto p-0 font-semibold text-shortpoint-text-primary"
                  >
                    Page Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("status")}
                    className="h-auto p-0 font-semibold text-shortpoint-text-primary"
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("createdAt")}
                    className="h-auto p-0 font-semibold text-shortpoint-text-primary"
                  >
                    Created Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-left p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("updatedAt")}
                    className="h-auto p-0 font-semibold text-shortpoint-text-primary"
                  >
                    Modified Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="text-right p-4">
                  <span className="font-semibold text-shortpoint-text-primary">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPages.map((page, index) => (
                <tr
                  key={page.id}
                  className={cn(
                    "border-b border-shortpoint-border-light hover:bg-gray-50",
                    index === sortedPages.length - 1 && "border-b-0"
                  )}
                >
                  <td className="p-4">
                    <Link
                      href={`/sites/${siteId}/pages/${page.id}`}
                      className="font-medium text-shortpoint-text-primary hover:text-shortpoint-primary"
                    >
                      {page.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        statusColors[page.status]
                      )}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="p-4 text-shortpoint-text-neutral text-sm">
                    {formatDate(page.createdAt)}
                  </td>
                  <td className="p-4 text-shortpoint-text-neutral text-sm">
                    {formatDate(page.updatedAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/sites/${siteId}/pages/${page.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}

              {sortedPages.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-shortpoint-text-subtle"
                  >
                    {searchTerm
                      ? "No pages found matching your search."
                      : "No pages created yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
