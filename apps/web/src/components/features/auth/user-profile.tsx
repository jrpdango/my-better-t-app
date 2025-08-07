"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.fullName || user.firstName || "User"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user.primaryEmailAddress?.emailAddress}
        </p>
      </div>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
            userButtonPopoverCard: "p-4",
            userButtonPopoverActions: "flex flex-col gap-2",
          },
        }}
        userProfileMode="navigation"
        userProfileUrl="/user-profile"
      />
    </div>
  );
}

export function UserProfileMenu() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <img
            className="h-8 w-8 rounded-full"
            src={user.imageUrl}
            alt={user.fullName || "User"}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.fullName || user.firstName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
