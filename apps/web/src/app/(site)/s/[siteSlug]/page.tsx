"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { mockSites, mockPages } from "@/lib/mock-data";

interface SitePageProps {
  params: Promise<{
    siteSlug: string;
  }>;
}

export default function SitePage({ params }: SitePageProps) {
  const { siteSlug } = use(params);
  const site = mockSites.find((s) => s.slug === siteSlug);

  if (!site) {
    notFound();
  }

  // Get all published pages for this site
  const sitePages = mockPages.filter(
    (page) => page.siteId === site.id && page.status === "PUBLISHED"
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to {site.name}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{site.description}</p>
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            📍 {site.department} Department
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              📋
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Department Guidelines
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Team Directory
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Resource Library
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              🆕
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Updates
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Policy updates available
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              New team member added
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Training materials updated
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              📞
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Info
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              {site.department}@company.com
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Ext: {Math.floor(Math.random() * 1000) + 1000}
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Office: Building{" "}
              {String.fromCharCode(65 + Math.floor(Math.random() * 5))}
            </p>
          </div>
        </div>
      </div>

      {/* Department-Specific Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {site.department} Department Overview
        </h2>

        {site.department === "HR" && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to the Human Resources portal. Here you'll find everything
              you need to know about company policies, benefits, employee
              development, and workplace culture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  📋 Employee Resources
                </h4>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Employee Handbook</li>
                  <li>• Benefits Information</li>
                  <li>• Time-off Policies</li>
                  <li>• Professional Development</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">
                  🎯 Quick Actions
                </h4>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Submit Time-off Request</li>
                  <li>• Update Personal Information</li>
                  <li>• Access Payroll Information</li>
                  <li>• Report HR Issues</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {site.department === "IT" && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to the IT Department portal. Find technical support,
              software resources, and system documentation to help with all your
              technology needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 mb-3">
                  💻 Support Resources
                </h4>
                <ul className="space-y-2 text-purple-800 text-sm">
                  <li>• Help Desk Portal</li>
                  <li>• Software Downloads</li>
                  <li>• Password Reset</li>
                  <li>• System Status Page</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-6">
                <h4 className="font-semibold text-red-900 mb-3">
                  🚨 Emergency Contacts
                </h4>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• IT Helpdesk: x1234</li>
                  <li>• Network Issues: x1235</li>
                  <li>• Security Team: x1236</li>
                  <li>• After Hours: x1237</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {site.department === "Finance" && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to the Finance Department portal. Access financial
              procedures, expense reporting tools, and budget information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">
                  💰 Financial Tools
                </h4>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Expense Reports</li>
                  <li>• Budget Tracking</li>
                  <li>• Purchase Orders</li>
                  <li>• Financial Policies</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  📊 Reports & Analytics
                </h4>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Monthly Reports</li>
                  <li>• Department Budgets</li>
                  <li>• Cost Analysis</li>
                  <li>• Financial Calendar</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {(site.department === "Development" ||
          site.department === "Sales" ||
          site.department === "Marketing") && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to the {site.department} Department portal. Access team
              resources, project information, and departmental tools.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                📚 Department Resources
              </h4>
              <p className="text-gray-600">
                This section contains important resources and information
                specific to the {site.department} department. Team members can
                find procedures, guidelines, and collaborative tools here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Available Pages */}
      {sitePages.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            📄 Available Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sitePages.map((page) => (
              <a
                key={page.id}
                href={`/s/${siteSlug}/${page.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {page.title}
                  </h4>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    Published
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Click to view detailed information about{" "}
                  {page.title.toLowerCase()}.
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
