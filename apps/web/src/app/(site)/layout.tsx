import { AuthWrapper } from "@/components/features/auth/auth-wrapper";
import { SiteLayout } from "@/components/layouts/site-layout";

export default function SiteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <SiteLayout>{children}</SiteLayout>
    </AuthWrapper>
  );
}
