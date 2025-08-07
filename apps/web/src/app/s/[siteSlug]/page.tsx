"use client";

import { use } from "react";
import { mockSites, mockPages, mockNavigation, Site } from "@/lib/mock-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Download,
  Calendar,
  Users,
  FileText,
  Clock,
} from "lucide-react";

interface MockSitePageProps {
  params: Promise<{ siteSlug: string }>;
}

// Department-specific configurations
const departmentConfig = {
  hr: {
    hero: {
      title: "Human Resources",
      subtitle: "Supporting our people, building our future",
      description:
        "Access employee resources, policies, benefits information, and support services.",
    },
    features: [
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Employee Handbook",
        description: "Complete guide to company policies and procedures",
        action: "Read Handbook",
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Benefits Overview",
        description: "Comprehensive information about our benefits package",
        action: "View Benefits",
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Time Off Requests",
        description: "Submit and track your vacation and sick leave requests",
        action: "Request Time Off",
      },
    ],
    quickLinks: [
      "Employee Portal",
      "Benefits Enrollment",
      "Performance Reviews",
      "Training Resources",
    ],
  },
  finance: {
    hero: {
      title: "Finance Department",
      subtitle: "Financial excellence through transparency",
      description:
        "Access financial procedures, expense reports, budget information, and financial resources.",
    },
    features: [
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Expense Reports",
        description: "Submit and track your business expense reports",
        action: "Submit Expenses",
      },
      {
        icon: <Download className="h-6 w-6" />,
        title: "Financial Forms",
        description: "Download financial forms and templates",
        action: "Download Forms",
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Budget Planning",
        description: "Department budget guidelines and planning resources",
        action: "View Budgets",
      },
    ],
    quickLinks: [
      "Expense Portal",
      "Budget Dashboard",
      "Financial Reports",
      "Vendor Payments",
    ],
  },
  it: {
    hero: {
      title: "IT Department",
      subtitle: "Technology solutions for everyone",
      description:
        "Get technical support, software guides, system updates, and IT resources.",
    },
    features: [
      {
        icon: <Phone className="h-6 w-6" />,
        title: "IT Support",
        description: "Get help with technical issues and support requests",
        action: "Get Support",
      },
      {
        icon: <Download className="h-6 w-6" />,
        title: "Software Downloads",
        description: "Access approved software and applications",
        action: "Browse Software",
      },
      {
        icon: <FileText className="h-6 w-6" />,
        title: "IT Policies",
        description: "Security policies and IT usage guidelines",
        action: "Read Policies",
      },
    ],
    quickLinks: [
      "Help Desk",
      "Software Center",
      "Security Guidelines",
      "Hardware Requests",
    ],
  },
  dev: {
    hero: {
      title: "Development Team",
      subtitle: "Building tomorrow's solutions today",
      description:
        "Development processes, coding standards, project documentation, and resources.",
    },
    features: [
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Coding Standards",
        description: "Development guidelines and best practices",
        action: "View Standards",
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Project Wiki",
        description: "Project documentation and technical resources",
        action: "Browse Wiki",
      },
      {
        icon: <Download className="h-6 w-6" />,
        title: "Development Tools",
        description: "Access development tools and environments",
        action: "Get Tools",
      },
    ],
    quickLinks: [
      "Project Board",
      "Code Repository",
      "API Documentation",
      "Development Setup",
    ],
  },
  sales: {
    hero: {
      title: "Sales Department",
      subtitle: "Driving growth through relationships",
      description:
        "Sales processes, customer resources, marketing materials, and sales tools.",
    },
    features: [
      {
        icon: <Users className="h-6 w-6" />,
        title: "Customer Portal",
        description: "Access customer information and sales materials",
        action: "View Customers",
      },
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Sales Playbook",
        description: "Sales processes and best practices guide",
        action: "Read Playbook",
      },
      {
        icon: <Download className="h-6 w-6" />,
        title: "Marketing Materials",
        description: "Downloadable brochures and presentation templates",
        action: "Download Materials",
      },
    ],
    quickLinks: [
      "CRM System",
      "Sales Reports",
      "Lead Pipeline",
      "Product Catalog",
    ],
  },
  marketing: {
    hero: {
      title: "Marketing Department",
      subtitle: "Amplifying our brand story",
      description:
        "Brand guidelines, campaign resources, content templates, and marketing tools.",
    },
    features: [
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Brand Guidelines",
        description: "Official brand standards and usage guidelines",
        action: "View Guidelines",
      },
      {
        icon: <Download className="h-6 w-6" />,
        title: "Asset Library",
        description: "Logos, images, and marketing materials",
        action: "Browse Assets",
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Campaign Calendar",
        description: "Marketing campaigns and important dates",
        action: "View Calendar",
      },
    ],
    quickLinks: [
      "Brand Portal",
      "Campaign Dashboard",
      "Content Library",
      "Social Media Kit",
    ],
  },
};

// Department color schemes
const departmentColors = {
  hr: {
    primary: "from-blue-500 to-blue-700",
    accent: "bg-blue-100",
    text: "text-blue-900",
  },
  finance: {
    primary: "from-green-500 to-green-700",
    accent: "bg-green-100",
    text: "text-green-900",
  },
  it: {
    primary: "from-purple-500 to-purple-700",
    accent: "bg-purple-100",
    text: "text-purple-900",
  },
  dev: {
    primary: "from-orange-500 to-orange-700",
    accent: "bg-orange-100",
    text: "text-orange-900",
  },
  sales: {
    primary: "from-red-500 to-red-700",
    accent: "bg-red-100",
    text: "text-red-900",
  },
  marketing: {
    primary: "from-pink-500 to-pink-700",
    accent: "bg-pink-100",
    text: "text-pink-900",
  },
};

export default function MockSitePage({ params }: MockSitePageProps) {
  const { siteSlug } = use(params);
  const site = mockSites.find((s) => s.slug === siteSlug);

  if (!site) {
    notFound();
  }

  const config = departmentConfig[siteSlug as keyof typeof departmentConfig];
  const colors = departmentColors[siteSlug as keyof typeof departmentColors];

  if (!config || !colors) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${colors.primary} rounded-lg`}
              ></div>
              <h1 className="text-xl font-semibold text-gray-900">
                {config.hero.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated {new Date(site.lastActivity).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <a href="#" className="text-blue-600 font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Resources
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Policies
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className={`bg-gradient-to-r ${colors.primary} text-white py-20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">{config.hero.title}</h2>
            <p className="text-xl mb-6 opacity-90">{config.hero.subtitle}</p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              {config.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Grid */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Key Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${colors.accent} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <div className={colors.text}>{feature.icon}</div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button variant="outline" className="w-full">
                    {feature.action}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.quickLinks.map((link, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <p className="font-medium text-gray-900">{link}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Need Help?
          </h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center`}
                  >
                    <Phone className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center`}
                  >
                    <Mail className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{siteSlug}@company.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center`}
                  >
                    <MapPin className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Building A, Floor 3</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 {site.name} - Acme Corporation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
