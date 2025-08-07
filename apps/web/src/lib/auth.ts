import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Server-side authentication utilities
 */

/**
 * Get the current authenticated user or redirect to sign-in
 */
export async function getAuthUser() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

/**
 * Get the current user session or redirect to sign-in
 */
export async function getAuthSession() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return { userId };
}

/**
 * Check if user is authenticated without redirecting
 */
export async function isAuthenticated() {
  const { userId } = await auth();
  return !!userId;
}

/**
 * Get user's tenant ID from their email domain or metadata
 * This follows the multi-tenant architecture pattern
 */
export async function getUserTenantId(userId: string) {
  try {
    const user = await clerkClient().users.getUser(userId);

    // First, check if tenant ID is stored in user metadata
    if (user.publicMetadata?.tenantId) {
      return user.publicMetadata.tenantId as string;
    }

    // Fallback: extract tenant from email domain
    const email = user.primaryEmailAddress?.emailAddress;
    if (email) {
      const domain = email.split("@")[1];
      // For ShortPoint company (as per folder structure requirements)
      if (domain === "shortpoint.com") {
        return "shortpoint-tenant-id";
      }
      // For other domains, you could implement domain-to-tenant mapping
      return `tenant-${domain.replace(".", "-")}`;
    }

    throw new Error("Unable to determine tenant for user");
  } catch (error) {
    console.error("Error getting user tenant:", error);
    throw error;
  }
}

/**
 * Assign tenant to user (typically done during onboarding)
 */
export async function assignUserTenant(userId: string, tenantId: string) {
  try {
    await clerkClient().users.updateUserMetadata(userId, {
      publicMetadata: {
        tenantId,
      },
    });
  } catch (error) {
    console.error("Error assigning tenant to user:", error);
    throw error;
  }
}
