"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { mockSites, mockPages } from "@/lib/mock-data";

interface PageViewProps {
  params: Promise<{
    siteSlug: string;
    pageSlug: string;
  }>;
}

export default function PageView({ params }: PageViewProps) {
  const { siteSlug, pageSlug } = use(params);
  const site = mockSites.find((s) => s.slug === siteSlug);

  if (!site) {
    notFound();
  }

  const page = mockPages.find(
    (p) =>
      p.siteId === site.id && p.slug === pageSlug && p.status === "PUBLISHED"
  );

  if (!page) {
    notFound();
  }

  // Generate mock content based on the page and site
  const generateMockContent = (page: any, site: any) => {
    switch (page.slug) {
      case "employee-handbook":
        return (
          <div className="prose max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📖</div>
                <div>
                  <h3 className="text-lg font-medium text-blue-900">
                    Employee Handbook
                  </h3>
                  <p className="text-blue-700">
                    Your comprehensive guide to company policies and procedures
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              Welcome to our comprehensive employee handbook. This document
              serves as your guide to understanding our company culture,
              policies, and procedures that help create a positive and
              productive workplace for everyone.
            </p>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                📋 Table of Contents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <a
                    href="#welcome"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 mr-3">
                      1
                    </span>
                    Welcome Message
                  </a>
                  <a
                    href="#policies"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 mr-3">
                      2
                    </span>
                    Company Policies
                  </a>
                  <a
                    href="#benefits"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 mr-3">
                      3
                    </span>
                    Benefits & Compensation
                  </a>
                </div>
                <div className="space-y-3">
                  <a
                    href="#procedures"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 mr-3">
                      4
                    </span>
                    HR Procedures
                  </a>
                  <a
                    href="#contact"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 mr-3">
                      5
                    </span>
                    Contact Information
                  </a>
                  <a
                    href="#resources"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800 mr-3">
                      6
                    </span>
                    Additional Resources
                  </a>
                </div>
              </div>
            </div>

            <div id="welcome" className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-3xl mr-3">👋</span>
                Welcome Message
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Welcome to our team! We're excited to have you join our
                  organization. This handbook will help you understand our
                  values, expectations, and the resources available to support
                  your success. Our company culture is built on collaboration,
                  innovation, and respect for all team members.
                </p>
              </div>
            </div>

            <div id="policies" className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📋</span>
                Company Policies
              </h3>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                    Code of Conduct
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    All employees are expected to maintain the highest standards
                    of professional conduct, integrity, and respect for
                    colleagues, customers, and stakeholders. We believe in
                    creating an inclusive environment where everyone can thrive.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Treat all colleagues with respect and dignity</li>
                    <li>Maintain confidentiality of sensitive information</li>
                    <li>
                      Act with honesty and integrity in all business dealings
                    </li>
                    <li>
                      Report any unethical behavior through proper channels
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                    Anti-Discrimination Policy
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    We are committed to providing a workplace free from
                    discrimination and harassment based on race, gender, age,
                    religion, sexual orientation, disability, or any other
                    protected characteristic. All employees have the right to
                    work in an environment free from discrimination.
                  </p>
                </div>
              </div>
            </div>

            <div id="benefits" className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🎁</span>
                Benefits & Compensation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">
                    Health & Wellness
                  </h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Medical Insurance (100% premium covered)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Dental Insurance
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Vision Insurance
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Mental Health Support
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Wellness Programs
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-4">
                    Financial Benefits
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      401(k) with Company Match
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Life Insurance
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Disability Insurance
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Employee Stock Purchase Plan
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Flexible Spending Accounts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "benefits":
        return (
          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 mb-8">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">🎁</div>
                <div>
                  <h2 className="text-2xl font-bold text-green-900">
                    Comprehensive Benefits Package
                  </h2>
                  <p className="text-green-700">
                    Supporting your health, wellbeing, and financial security
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              Our comprehensive benefits package is designed to support your
              health, wellbeing, and financial security. We believe that when
              our employees thrive, our company thrives too.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-blue-200 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900">
                    Health Benefits
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-blue-800">
                      <strong>Medical Insurance:</strong> 100% premium covered
                      for employees and 80% for dependents
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-blue-800">
                      <strong>Dental Insurance:</strong> Comprehensive coverage
                      including preventive care
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-blue-800">
                      <strong>Vision Insurance:</strong> Annual eye exams and
                      eyewear allowance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-blue-800">
                      <strong>Mental Health Support:</strong> Counseling
                      services and mental wellness programs
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-green-900">
                    Financial Benefits
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-green-800">
                      <strong>401(k) Plan:</strong> 6% company match with
                      immediate vesting
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-green-800">
                      <strong>Life Insurance:</strong> 2x annual salary coverage
                      provided
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-green-800">
                      <strong>Disability Insurance:</strong> Short and long-term
                      coverage
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-green-800">
                      <strong>Employee Stock Purchase:</strong> 15% discount on
                      company stock
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-purple-200 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏖️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-purple-900">
                    Time Off & Flexibility
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-purple-800">
                      <strong>Unlimited PTO:</strong> Take the time you need to
                      recharge
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-purple-800">
                      <strong>Company Holidays:</strong> 12 paid holidays plus
                      floating days
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-purple-800">
                      <strong>Parental Leave:</strong> 12 weeks paid leave for
                      new parents
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-purple-800">
                      <strong>Sabbatical Program:</strong> Extended leave after
                      5 years of service
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-orange-200 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-900">
                    Professional Development
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-orange-800">
                      <strong>Learning Budget:</strong> $2,000 annual allowance
                      for courses and training
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-orange-800">
                      <strong>Conference Attendance:</strong> Support for
                      industry conferences and events
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-orange-800">
                      <strong>Certification Programs:</strong> Full
                      reimbursement for job-related certifications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-orange-800">
                      <strong>Mentorship:</strong> Internal mentoring and
                      coaching programs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "it-support":
        return (
          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8 mb-8">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">💻</div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-900">
                    IT Support Center
                  </h2>
                  <p className="text-purple-700">
                    Technical assistance and resources at your fingertips
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🚨</span>
                <h3 className="text-lg font-semibold text-red-900">
                  Emergency Support
                </h3>
              </div>
              <p className="text-red-800 mb-3">
                For urgent IT issues affecting critical business operations:
              </p>
              <div className="bg-white rounded-lg p-4 border border-red-300">
                <div className="text-xl font-bold text-red-900 mb-2">
                  📞 Emergency Hotline: 1-800-IT-HELP (1-800-484-3571)
                </div>
                <p className="text-red-700 text-sm">
                  Available 24/7 for critical system outages and security
                  incidents
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">🔧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Common Issues
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-medium text-gray-900">
                      Password Reset
                    </h4>
                    <p className="text-sm text-gray-600">
                      Use the self-service portal at{" "}
                      <span className="font-mono bg-gray-100 px-1 rounded">
                        portal.company.com
                      </span>{" "}
                      or contact IT directly
                    </p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-medium text-gray-900">
                      Software Installation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Submit requests through the IT portal for pre-approved
                      software packages
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-medium text-gray-900">
                      Hardware Issues
                    </h4>
                    <p className="text-sm text-gray-600">
                      Report hardware problems through the help desk ticketing
                      system
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4">
                    <h4 className="font-medium text-gray-900">
                      Network Connectivity
                    </h4>
                    <p className="text-sm text-gray-600">
                      Check the status page for known outages before reporting
                      issues
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">🔗</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Self-Service Resources
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      🏠 IT Portal
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Central hub for all IT services and requests
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      portal.company.com
                    </code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      📚 Knowledge Base
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Step-by-step guides and troubleshooting articles
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      kb.company.com
                    </code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      💾 Software Downloads
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Approved software and security updates
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      software.company.com
                    </code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      📊 System Status
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Real-time system health and outage information
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      status.company.com
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">📞</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Help Desk</h4>
                  <p className="text-sm text-gray-600">General IT support</p>
                  <p className="font-mono text-sm text-blue-600">x1234</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Network Issues
                  </h4>
                  <p className="text-sm text-gray-600">Connectivity problems</p>
                  <p className="font-mono text-sm text-blue-600">x1235</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Security Team
                  </h4>
                  <p className="text-sm text-gray-600">Security incidents</p>
                  <p className="font-mono text-sm text-blue-600">x1236</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="prose max-w-none">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {page.title}
              </h2>
              <p className="text-gray-600">
                Detailed information for the {site.department} department
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              This is the main content area for {page.title}. Here you would
              find detailed information related to this page's topic for the{" "}
              {site.department} department.
            </p>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📋 Page Overview
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                This page contains important information for the{" "}
                {site.department} department. Content is regularly updated to
                ensure accuracy and relevance for all team members.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    📚 Key Resources
                  </h4>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Department guidelines and procedures</li>
                    <li>• Team contact information</li>
                    <li>• Frequently asked questions</li>
                    <li>• Resource library and downloads</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3">
                    🎯 Quick Actions
                  </h4>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• Submit requests and forms</li>
                    <li>• Access department tools</li>
                    <li>• View announcements</li>
                    <li>• Contact team members</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link
            href={`/s/${siteSlug}`}
            className="flex items-center hover:text-gray-700 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="hover:underline">{site.name}</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{page.title}</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Updated {new Date(page.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
            <User className="h-4 w-4 mr-2" />
            <span>{site.department} Department</span>
          </div>
          <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
            <Clock className="h-4 w-4 mr-2" />
            <span>5 min read</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            📄 Published
          </span>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 shadow-sm">
        {generateMockContent(page, site)}
      </div>

      {/* Related Pages */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">📑</span>
          More from {site.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPages
            .filter(
              (p) =>
                p.siteId === site.id &&
                p.id !== page.id &&
                p.status === "PUBLISHED"
            )
            .map((relatedPage) => (
              <Link
                key={relatedPage.id}
                href={`/s/${siteSlug}/${relatedPage.slug}`}
                className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {relatedPage.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Explore more information about{" "}
                  {relatedPage.title.toLowerCase()} in our {site.department}{" "}
                  department.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Updated{" "}
                    {new Date(relatedPage.updatedAt).toLocaleDateString()}
                  </span>
                  <span className="text-blue-600 text-sm font-medium group-hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
        </div>

        {mockPages.filter(
          (p) =>
            p.siteId === site.id && p.id !== page.id && p.status === "PUBLISHED"
        ).length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📄</div>
            <p className="text-gray-600">
              No other pages available in this site yet.
            </p>
            <Link
              href={`/s/${siteSlug}`}
              className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
            >
              Return to {site.name} home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
