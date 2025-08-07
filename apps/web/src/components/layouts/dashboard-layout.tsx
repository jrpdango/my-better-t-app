"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/navigation/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-shortpoint-main-bg">
      <div className="flex">
        {/* Fixed Left Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <DashboardHeader />

          {/* Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
