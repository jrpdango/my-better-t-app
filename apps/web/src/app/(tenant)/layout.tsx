import { AuthWrapper } from "@/components/features/auth/auth-wrapper";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthWrapper>
  );
}
