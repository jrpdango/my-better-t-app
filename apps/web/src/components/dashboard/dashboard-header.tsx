"use client";

import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockUser } from "@/lib/mock-data";

export function DashboardHeader() {
  return (
    <header className="h-16 bg-white border-b border-shortpoint-border-light flex items-center justify-between px-6 shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-shortpoint-text-placeholder" />
          <Input
            placeholder="Search sites, pages, or content..."
            className="pl-10 h-9 border-shortpoint-border-light bg-shortpoint-main-bg/50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 p-0 hover:bg-shortpoint-light/50"
        >
          <Bell className="h-4 w-4 text-shortpoint-text-subtle" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-3 h-9 px-3 hover:bg-shortpoint-light/50 transition-colors"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-shortpoint-primary to-shortpoint-secondary rounded-full flex items-center justify-center shadow-sm">
                <User className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium text-shortpoint-text-primary">
                  {mockUser.name}
                </div>
                <div className="text-xs text-shortpoint-text-subtle capitalize">
                  {mockUser.role.toLowerCase()}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 shadow-lg border-shortpoint-border-light"
          >
            <DropdownMenuLabel className="pb-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-shortpoint-text-subtle">
                  {mockUser.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              Team Management
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              Billing & Subscription
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm text-red-600 focus:text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
