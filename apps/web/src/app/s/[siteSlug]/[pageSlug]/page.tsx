"use client";

import { use } from "react";
import { mockSites, mockPages } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Download,
  Share2,
  BookOpen,
  FileText,
  Users,
  DollarSign,
  Shield,
  Heart,
} from "lucide-react";

interface MockPageProps {
  params: Promise<{ siteSlug: string; pageSlug: string }>;
}

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

// Mock page content based on department and common page types
const getPageContent = (siteSlug: string, pageSlug: string) => {
  const contentMap: { [key: string]: { [key: string]: any } } = {
    hr: {
      "employee-handbook": {
        title: "Employee Handbook",
        subtitle: "Your complete guide to working at Acme Corporation",
        sections: [
          {
            title: "Welcome to Acme Corporation",
            content:
              "We're excited to have you as part of our team. This handbook will guide you through our company culture, policies, and procedures to help you succeed in your role.",
            icon: <Heart className="h-6 w-6" />,
          },
          {
            title: "Company Values",
            content:
              "Our core values of integrity, innovation, collaboration, and excellence guide everything we do. We believe in creating an inclusive environment where everyone can thrive.",
            icon: <Users className="h-6 w-6" />,
          },
          {
            title: "Code of Conduct",
            content:
              "We maintain the highest standards of professional behavior. All employees are expected to treat colleagues, customers, and partners with respect and professionalism.",
            icon: <Shield className="h-6 w-6" />,
          },
          {
            title: "Communication Guidelines",
            content:
              "Clear and respectful communication is essential. Use appropriate channels for different types of communication and maintain confidentiality when required.",
            icon: <FileText className="h-6 w-6" />,
          },
        ],
      },
      benefits: {
        title: "Benefits Overview",
        subtitle: "Comprehensive benefits package designed for your well-being",
        sections: [
          {
            title: "Health Insurance",
            content:
              "Full medical, dental, and vision coverage with multiple plan options. Company pays 80% of premiums for employees and 60% for dependents.",
            icon: <Heart className="h-6 w-6" />,
          },
          {
            title: "Retirement Plans",
            content:
              "401(k) plan with company matching up to 6% of your salary. Immediate vesting with professional investment guidance available.",
            icon: <DollarSign className="h-6 w-6" />,
          },
          {
            title: "Time Off",
            content:
              "Generous PTO policy starting at 15 days annually, plus 10 paid holidays. Additional vacation time awarded based on tenure.",
            icon: <Clock className="h-6 w-6" />,
          },
          {
            title: "Professional Development",
            content:
              "Annual training budget of $2,000 per employee for courses, conferences, and certifications. Internal mentorship programs available.",
            icon: <BookOpen className="h-6 w-6" />,
          },
        ],
      },
    },
    finance: {
      "expense-policy": {
        title: "Expense Reimbursement Policy",
        subtitle: "Guidelines for business expense reporting and reimbursement",
        sections: [
          {
            title: "Eligible Expenses",
            content:
              "Business travel, meals with clients, training and conferences, office supplies, and software subscriptions directly related to your role.",
            icon: <DollarSign className="h-6 w-6" />,
          },
          {
            title: "Documentation Requirements",
            content:
              "All expenses must include original receipts, business purpose, and attendees (for meals). Submit within 30 days of expense date.",
            icon: <FileText className="h-6 w-6" />,
          },
          {
            title: "Approval Process",
            content:
              "Expenses under $500 require manager approval. Expenses over $500 require department head approval. Travel over $1,000 needs advance approval.",
            icon: <Users className="h-6 w-6" />,
          },
          {
            title: "Reimbursement Timeline",
            content:
              "Approved expenses are reimbursed in the next payroll cycle. Direct deposit to your primary bank account on file with HR.",
            icon: <Clock className="h-6 w-6" />,
          },
        ],
      },
    },
    it: {
      "security-guidelines": {
        title: "Information Security Guidelines",
        subtitle: "Protecting our data and systems",
        sections: [
          {
            title: "Password Requirements",
            content:
              "Use strong, unique passwords for all accounts. Enable two-factor authentication where available. Never share credentials or write them down.",
            icon: <Shield className="h-6 w-6" />,
          },
          {
            title: "Email Security",
            content:
              "Be cautious with attachments and links from unknown senders. Report suspicious emails to the IT security team immediately.",
            icon: <FileText className="h-6 w-6" />,
          },
          {
            title: "Data Handling",
            content:
              "Classify data appropriately and handle according to company policies. Use encrypted storage for sensitive information and follow data retention guidelines.",
            icon: <DollarSign className="h-6 w-6" />,
          },
          {
            title: "Incident Reporting",
            content:
              "Report any security incidents or suspected breaches immediately to the IT security team. Quick response is critical for minimizing impact.",
            icon: <Users className="h-6 w-6" />,
          },
        ],
      },
    },
  };

  return (
    contentMap[siteSlug]?.[pageSlug] || {
      title: "Page Content",
      subtitle: "This is a sample page for demonstration purposes",
      sections: [
        {
          title: "Sample Section",
          content:
            "This is sample content for the page. In a real implementation, this would contain the actual page content from your CMS or database.",
          icon: <FileText className="h-6 w-6" />,
        },
      ],
    }
  );
};

export default function MockPageView({ params }: MockPageProps) {
  const { siteSlug, pageSlug } = use(params);
  const site = mockSites.find((s) => s.slug === siteSlug);

  if (!site) {
    notFound();
  }

  const colors = departmentColors[siteSlug as keyof typeof departmentColors];
  const pageContent = getPageContent(siteSlug, pageSlug);

  if (!colors) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href={`/s/${siteSlug}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to {site.name}
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section
        className={`bg-gradient-to-r ${colors.primary} text-white py-16`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{pageContent.title}</h1>
            <p className="text-lg opacity-90">{pageContent.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Info */}
        <div className="flex items-center justify-between mb-8 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Published by {site.name} Team
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Last updated {new Date(site.lastActivity).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {pageContent.sections.map((section: any, index: number) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${colors.accent} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <div className={colors.text}>{section.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need More Information?
              </h3>
              <p className="text-gray-600 mb-6">
                Contact the {site.name} team for additional questions or
                clarifications.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  className={`bg-gradient-to-r ${colors.primary} text-white`}
                >
                  Contact Team
                </Button>
                <Button variant="outline">Browse More Resources</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
