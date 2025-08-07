"use client";

import { use } from "react";
import { SiteLayout } from "@/components/layouts/site-layout";
import { ThemeEditor } from "@/components/theme/theme-editor";
import { mockThemes } from "@/lib/mock-data";

interface ThemePageProps {
  params: Promise<{ siteId: string }>;
}

export default function ThemePage({ params }: ThemePageProps) {
  const { siteId } = use(params);
  const theme = mockThemes.find((t) => t.siteId === siteId);

  return (
    <SiteLayout siteId={siteId}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-shortpoint-text-primary">
            Theme Customization
          </h1>
          <p className="text-shortpoint-text-subtle text-sm">
            Customize the visual appearance of your site
          </p>
        </div>

        {/* Theme Editor */}
        <ThemeEditor theme={theme} siteId={siteId} />
      </div>
    </SiteLayout>
  );
}
