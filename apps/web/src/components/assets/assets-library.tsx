"use client";

import { useState } from "react";
import { Asset } from "@/lib/mock-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  Image,
  FileText,
  Download,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AssetsLibraryProps {
  assets: Asset[];
  siteId: string;
}

type ViewMode = "grid" | "list";
type FilterType = "all" | "images" | "documents" | "other";

const filterTypes = [
  { value: "all", label: "All Files" },
  { value: "images", label: "Images" },
  { value: "documents", label: "Documents" },
  { value: "other", label: "Other" },
];

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) {
    return Image;
  }
  return FileText;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileCategory = (fileType: string): FilterType => {
  if (fileType.startsWith("image/")) return "images";
  if (fileType.includes("pdf") || fileType.includes("document"))
    return "documents";
  return "other";
};

export function AssetsLibrary({ assets, siteId }: AssetsLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || getFileCategory(asset.fileType) === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleUpload = () => {
    // In a real app, this would trigger file upload
    console.log("Upload files");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-shortpoint-text-placeholder" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {filterTypes.find((f) => f.value === filterType)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {filterTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.value}
                      onClick={() => setFilterType(type.value as FilterType)}
                    >
                      {type.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <div className="flex border border-shortpoint-border-light rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-r-none",
                    viewMode === "grid" &&
                      "bg-shortpoint-light text-shortpoint-primary"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "rounded-l-none border-l",
                    viewMode === "list" &&
                      "bg-shortpoint-light text-shortpoint-primary"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleUpload}
                className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Display */}
      <Card>
        <CardContent className="p-6">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-shortpoint-text-subtle">
                {searchTerm || filterType !== "all"
                  ? "No files found matching your criteria."
                  : "No files uploaded yet. Start by uploading your first file."}
              </p>
              {!searchTerm && filterType === "all" && (
                <Button
                  onClick={handleUpload}
                  className="mt-4 bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredAssets.map((asset) => {
                const FileIcon = getFileIcon(asset.fileType);
                return (
                  <div
                    key={asset.id}
                    className="group relative border border-shortpoint-border-light rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* File Preview */}
                    <div className="flex flex-col items-center space-y-2">
                      {asset.previewUrl ? (
                        <img
                          src={asset.previewUrl}
                          alt={asset.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <FileIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-sm font-medium text-shortpoint-text-primary truncate w-full">
                          {asset.name}
                        </p>
                        <p className="text-xs text-shortpoint-text-subtle">
                          {formatFileSize(asset.fileSize)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAssets.map((asset) => {
                const FileIcon = getFileIcon(asset.fileType);
                return (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 border border-shortpoint-border-light rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileIcon className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-shortpoint-text-primary">
                          {asset.name}
                        </p>
                        <p className="text-sm text-shortpoint-text-subtle">
                          {formatFileSize(asset.fileSize)} • {asset.fileType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
