"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/loader";

interface AuthWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Wrapper component that ensures user is authenticated before rendering children
 */
export function AuthWrapper({
  children,
  fallback,
  redirectTo = "/sign-in",
}: AuthWrapperProps) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push(redirectTo);
    }
  }, [isLoaded, userId, router, redirectTo]);

  if (!isLoaded) {
    return fallback || <Loader />;
  }

  if (!userId) {
    return fallback || <Loader />;
  }

  return <>{children}</>;
}

/**
 * Hook to check if user is authenticated
 */
export function useRequireAuth() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  return {
    isAuthenticated: !!userId,
    isLoading: !isLoaded,
    user,
  };
}

/**
 * Component that only renders children if user is authenticated
 */
export function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return null;
  }

  return <>{children}</>;
}
